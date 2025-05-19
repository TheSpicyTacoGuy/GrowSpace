<template>
  <div class="container py-4">
    <TipsHeader />
    <form
      @submit.prevent="submitTip"
      class="mb-4 card card-body shadow-sm border-0"
    >
      <div class="mb-3">
        <label for="tip" class="form-label">Share a tip:</label>
        <textarea
          id="tip"
          v-model="newTip"
          class="form-control"
          rows="2"
          required
          aria-label="Share a tip"
        ></textarea>
      </div>
      <button
        class="btn btn-success w-100 d-block d-sm-inline-block mt-2 mt-sm-0"
        :disabled="!newTip.trim()"
      >
        <i class="bi bi-send me-1"></i>Post Tip
      </button>
    </form>
    <div v-if="tips.length === 0" class="alert alert-info">
      No tips yet. Be the first to share!
    </div>
    <div class="row g-3 g-md-4">
      <div
        v-for="tip in tipsSorted"
        :key="tip.id"
        class="col-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4"
        :class="{
          'col-12 col-md-6 col-lg-4': tipsSorted.length > 1,
          'col-12 col-md-6 col-lg-3': tipsSorted.length > 2,
        }"
        :style="{
          maxWidth: tipsSorted.length > 1 ? '100%' : 'none',
        }"
      >
        <div class="card h-100 shadow border-0 tip-card p-2 p-sm-3 hover-card">
          <div class="card-body d-flex flex-column">
            <div v-if="editingTipId === tip.id">
              <textarea
                :id="'editTip_' + tip.id"
                name="editTipContent"
                v-model="editTipContent"
                class="form-control mb-2"
                rows="2"
              ></textarea>
              <div class="d-flex flex-column flex-sm-row gap-2">
                <button
                  class="btn btn-success btn-sm"
                  @click="saveEditTip(tip)"
                  type="button"
                >
                  <i class="bi bi-check"></i> Save
                </button>
                <button
                  class="btn btn-secondary btn-sm"
                  @click="cancelEditTip"
                  type="button"
                >
                  <i class="bi bi-x"></i> Cancel
                </button>
              </div>
            </div>
            <div v-else>
              <div class="d-flex align-items-center mb-1 flex-wrap">
                <div class="d-flex align-items-center flex-nowrap me-2">
                  <i class="bi bi-person-circle me-1 fs-5 text-success"></i>
                  <span class="fw-bold text-truncate" style="max-width: 150px">
                    {{ tip.author || "Anonymous" }}
                  </span>
                  <span
                    v-if="tip.authorRole === 'admin'"
                    class="badge bg-danger badge-sm ms-1 d-inline-flex align-items-center"
                    title="Admin"
                    style="white-space: nowrap"
                  >
                    <i class="bi bi-shield-lock-fill me-1"></i>
                    <span class="d-inline">Admin</span>
                  </span>
                </div>
              </div>
              <div class="mb-2 tip-content">
                <router-link
                  :to="{ name: 'tip-detail', params: { id: tip.id } }"
                  class="text-decoration-none text-body"
                >
                  {{
                    tip.content.length > 120
                      ? tip.content.slice(0, 120) + "…"
                      : tip.content
                  }}
                </router-link>

                <button
                  class="btn btn-link text-decoration-none"
                  @click="
                    $router.push({ name: 'tip-detail', params: { id: tip.id } })
                  "
                >
                  Read more <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
            <div
              class="mt-auto d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-end gap-2"
            >
              <div>
                <button
                  class="btn btn-outline-primary btn-sm mb-1 mb-sm-0"
                  @click="likeTip(tip)"
                  :disabled="!canLike(tip)"
                  :title="
                    !canLike(tip) ? 'You cannot like this tip' : 'Like this tip'
                  "
                >
                  <i
                    :class="[
                      (tip.likedBy || []).includes(auth.currentUser?.uid)
                        ? 'bi-hand-thumbs-up-fill text-primary'
                        : 'bi-hand-thumbs-up',
                    ]"
                  ></i>
                  <span class="ms-1">{{ tip.likes || 0 }}</span>
                </button>
                <span class="ms-2 small text-muted d-block d-sm-inline">{{
                  formatDate(tip.createdAt)
                }}</span>
              </div>
              <div
                v-if="
                  userRole === 'admin' || tip.authorId === auth.currentUser?.uid
                "
                class="d-flex gap-2"
              >
                <button
                  class="btn btn-outline-warning btn-sm"
                  @click="startEditTip(tip)"
                  title="Edit"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteTip(tip)"
                  title="Delete"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <!-- Comments Section -->
            <div class="mt-3 border-top pt-2">
              <div
                v-for="comment in comments[tip.id] || []"
                :key="comment.id"
                class="mb-2"
              >
                <div v-if="editingCommentId === comment.id">
                  <input
                    :id="'editComment_' + comment.id"
                    name="editCommentContent"
                    v-model="editCommentContent"
                    class="form-control form-control-sm mb-1"
                    required
                  />
                  <button
                    class="btn btn-success btn-xs me-1"
                    @click="saveEditComment(tip.id, comment)"
                    type="button"
                  >
                    <i class="bi bi-check"></i> Save
                  </button>
                  <button
                    class="btn btn-secondary btn-xs"
                    @click="cancelEditComment"
                    type="button"
                  >
                    <i class="bi bi-x"></i> Cancel
                  </button>
                </div>
                <div v-else>
                  <div class="d-flex align-items-center flex-wrap">
                    <div class="d-flex align-items-center flex-nowrap me-2">
                      <span
                        class="fw-bold text-truncate"
                        style="max-width: 150px"
                      >
                        {{ comment.author || "Anonymous" }}
                      </span>
                      <span
                        v-if="comment.authorRole === 'admin'"
                        class="badge bg-danger badge-sm ms-1 d-inline-flex align-items-center"
                        title="Admin"
                        style="white-space: nowrap"
                      >
                        <i class="bi bi-shield-lock-fill d-inline"></i>
                      </span>
                    </div>
                    <span class="text-muted small me-auto">{{
                      formatDate(comment.createdAt)
                    }}</span>
                    <span
                      v-if="
                        userRole === 'admin' ||
                        comment.authorId === auth.currentUser?.uid
                      "
                      class="ms-0 ms-sm-auto mt-1 mt-sm-0"
                    >
                      <button
                        class="btn btn-outline-warning btn-xs me-1 border-0"
                        @click="startEditComment(comment)"
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger btn-xs border-0"
                        @click="deleteComment(tip.id, comment)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="me-2">{{ comment.content }}</span>
                    <button
                      class="btn btn-outline-primary text-primary btn-xs py-0 px-2"
                      style="border: none"
                      @click="likeComment(tip.id, comment)"
                      :disabled="!canLikeComment(comment)"
                      :title="
                        !canLikeComment(comment)
                          ? 'You cannot like this comment'
                          : 'Like this comment'
                      "
                    >
                      <i
                        :class="[
                          (comment.likedBy || []).includes(
                            auth.currentUser?.uid
                          )
                            ? 'bi-hand-thumbs-up-fill text-primary'
                            : 'bi-hand-thumbs-up text-primary',
                        ]"
                      ></i>
                      <span class="ms-1">{{ comment.likes || 0 }}</span>
                    </button>
                  </div>

                  <hr />
                </div>
              </div>
              <!-- Comment Form -->
              <form @submit.prevent="submitComment(tip.id)" class="d-flex mt-2">
                <label :for="'commentInput_' + tip.id" class="visually-hidden"
                  >Add a comment</label
                >
                <input
                  :id="'commentInput_' + tip.id"
                  name="comment"
                  v-model="newComment[tip.id]"
                  class="form-control form-control-sm me-2"
                  placeholder="Add a comment..."
                  required
                  aria-label="Add a comment"
                />
                <button
                  class="btn btn-success btn-sm"
                  :disabled="!newComment[tip.id]?.trim()"
                  aria-label="Submit comment"
                  type="submit"
                >
                  <i class="bi bi-send"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useTipsForum from "@composables/useTipsForum";
import { useSettings } from "@composables/useSettings.js";
import TipsHeader from "./TipsComponents/TipsHeader.vue";

const { userRole } = useSettings();
const {
  tips,
  tipsSorted,
  newTip,
  editingTipId,
  editTipContent,
  submitTip,
  likeTip,
  canLike,
  startEditTip,
  saveEditTip,
  cancelEditTip,
  deleteTip,
  formatDate,
  auth,
  comments,
  newComment,
  submitComment,
  likeComment,
  canLikeComment,
  editingCommentId,
  editCommentContent,
  startEditComment,
  saveEditComment,
  cancelEditComment,
  deleteComment,
} = useTipsForum();
</script>
