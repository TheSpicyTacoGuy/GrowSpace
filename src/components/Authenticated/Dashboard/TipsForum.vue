<template>
  <div class="container py-4">
    <TipsHeader />
    <form @submit.prevent="submitTip" class="mb-4 card card-body shadow-sm">
      <div class="mb-3">
        <label for="tip" class="form-label">Share a tip:</label>
        <textarea
          id="tip"
          v-model="newTip"
          class="form-control"
          rows="2"
          required
        ></textarea>
      </div>
      <button class="btn btn-success" :disabled="!newTip.trim()">
        <i class="bi bi-send me-1"></i>Post Tip
      </button>
    </form>
    <div v-if="tips.length === 0" class="alert alert-info">
      No tips yet. Be the first to share!
    </div>
    <div class="row g-3">
      <div
        v-for="tip in tipsSorted"
        :key="tip.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <div v-if="editingTipId === tip.id">
              <textarea
                v-model="editTipContent"
                class="form-control mb-2"
                rows="2"
              ></textarea>
              <button
                class="btn btn-success btn-sm me-1"
                @click="saveEditTip(tip)"
              >
                <i class="bi bi-check"></i> Save
              </button>
              <button class="btn btn-secondary btn-sm" @click="cancelEditTip">
                <i class="bi bi-x"></i> Cancel
              </button>
            </div>
            <div v-else>
              <div class="fw-bold mb-1 text-success">
                <i class="bi bi-person-circle me-1"></i
                >{{ tip.author || "Anonymous" }}
              </div>
              <div class="mb-2" style="min-height: 2.5em">
                {{ tip.content }}
              </div>
            </div>
            <div class="mt-auto d-flex justify-content-between align-items-end">
              <div>
                <button
                  class="btn btn-outline-primary btn-sm"
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
                <span class="ms-2 small text-muted">{{
                  formatDate(tip.createdAt)
                }}</span>
              </div>
              <div v-if="tip.authorId === auth.currentUser?.uid">
                <button
                  class="btn btn-outline-warning btn-sm me-1"
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
                    v-model="editCommentContent"
                    class="form-control form-control-sm mb-1"
                    required
                  />
                  <button
                    class="btn btn-success btn-xs me-1"
                    @click="saveEditComment(tip.id, comment)"
                  >
                    <i class="bi bi-check"></i> Save
                  </button>
                  <button
                    class="btn btn-secondary btn-xs"
                    @click="cancelEditComment"
                  >
                    <i class="bi bi-x"></i> Cancel
                  </button>
                </div>
                <div v-else>
                  <div class="d-flex align-items-center">
                    <span class="fw-bold me-2">{{
                      comment.author || "Anonymous"
                    }}</span>
                    <span class="text-muted small">{{
                      formatDate(comment.createdAt)
                    }}</span>
                    <span
                      v-if="comment.authorId === auth.currentUser?.uid"
                      class="ms-auto"
                    >
                      <button
                        class="btn btn-outline-warning btn-xs me-1"
                        @click="startEditComment(comment)"
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger btn-xs"
                        @click="deleteComment(tip.id, comment)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="me-2">{{ comment.content }}</span>
                    <button
                      class="btn btn-outline-primary btn-xs py-0 px-2"
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
                            : 'bi-hand-thumbs-up',
                        ]"
                      ></i>
                      <span class="ms-1">{{ comment.likes || 0 }}</span>
                    </button>
                  </div>
                </div>
              </div>
              <!-- Comment Form -->
              <form @submit.prevent="submitComment(tip.id)" class="d-flex mt-2">
                <input
                  v-model="newComment[tip.id]"
                  class="form-control form-control-sm me-2"
                  placeholder="Add a comment..."
                  required
                />
                <button
                  class="btn btn-success btn-sm"
                  :disabled="!newComment[tip.id]?.trim()"
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
// filepath: src/components/Authenticated/Dashboard/TipsForum.vue
import useTipsForum from "@composables/useTipsForum";
import TipsHeader from "./TipsComponents/TipsHeader.vue";

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
