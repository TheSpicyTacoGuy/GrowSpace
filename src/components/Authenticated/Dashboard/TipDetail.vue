<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import useTipsForum from "@composables/useTipsForum.js";
import { useSettings } from "@composables/useSettings.js"; // Add this import

const route = useRoute();
const router = useRouter();
const tipId = route.params.id;
const { userRole } = useSettings(); // Get user role from settings

// Use the composable (call it as a function!)
const {
  tips,
  comments,
  fetchComments,
  likeTip,
  canLike,
  editingTipId,
  editTipContent,
  startEditTip,
  saveEditTip,
  cancelEditTip,
  deleteTip: originalDeleteTip,
  formatDate,
  auth,
  newComment,
  submitComment,
  editingCommentId,
  editCommentContent,
  startEditComment,
  saveEditComment,
  cancelEditComment,
  deleteComment,
  canLikeComment,
  likeComment,
} = useTipsForum();

// Wrapper function to add redirect
const deleteTip = async (tip) => {
  await originalDeleteTip(tip);
  router.push("/dashboard/tips");
};

// Local state for the current tip
const tip = ref(null);

// Fetch the tip and its comments on mount or when tipId changes
const fetchTip = () => {
  tip.value = tips.value.find((t) => t.id === tipId) || null;
  fetchComments(tipId);
};
onMounted(fetchTip);
watch([tips, () => route.params.id], fetchTip);
</script>

<template>
  <div class="container py-4">
    <button class="btn btn-link mb-3" @click="router.back()">
      <i class="bi bi-arrow-left"></i> Back to Tips
    </button>
    <div v-if="tip" class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-person-circle me-2 fs-4 text-success"></i>
          <span class="fw-bold">{{ tip.author || "Anonymous" }}</span>
          <span
            v-if="tip.authorRole === 'admin'"
            class="badge bg-danger ms-2"
            title="Admin"
          >
            <i class="bi bi-shield-lock-fill me-1"></i>Admin
          </span>
          <span class="ms-2 small text-muted">{{
            formatDate(tip.createdAt)
          }}</span>
        </div>
        <div v-if="editingTipId === tip.id">
          <textarea
            v-model="editTipContent"
            class="form-control mb-2"
            rows="2"
          ></textarea>
          <button class="btn btn-success btn-sm me-1" @click="saveEditTip(tip)">
            <i class="bi bi-check"></i> Save
          </button>
          <button class="btn btn-secondary btn-sm" @click="cancelEditTip">
            <i class="bi bi-x"></i> Cancel
          </button>
        </div>
        <div v-else>
          <h5 class="mb-3">{{ tip.content }}</h5>
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
            <span
              v-if="
                userRole === 'admin' || tip.authorId === auth.currentUser?.uid
              "
            >
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
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h6>Comments</h6>
      <div
        v-if="!comments[tipId] || comments[tipId].length === 0"
        class="text-muted"
      >
        No comments yet.
      </div>
      <div
        v-for="comment in comments[tipId] || []"
        :key="comment.id"
        class="mb-2 border-bottom pb-2"
      >
        <div v-if="editingCommentId === comment.id">
          <input
            v-model="editCommentContent"
            class="form-control form-control-sm mb-1"
            required
          />
          <button
            class="btn btn-success btn-xs me-1"
            @click="saveEditComment(tipId, comment)"
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
          <div class="d-flex align-items-center">
            <span class="fw-bold me-2">{{
              comment.author || "Anonymous"
            }}</span>
            <span
              v-if="comment.authorRole === 'admin'"
              class="badge bg-danger ms-2"
              title="Admin"
            >
              <i class="bi bi-shield-lock-fill me-1"></i>Admin
            </span>
            <span class="text-muted small ms-2">{{
              formatDate(comment.createdAt)
            }}</span>
            <span
              v-if="
                userRole === 'admin' ||
                comment.authorId === auth.currentUser?.uid
              "
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
                @click="deleteComment(tipId, comment)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </span>
          </div>
          <div>{{ comment.content }}</div>
          <button
            class="btn btn-outline-primary btn-xs py-0 px-2"
            style="border: none"
            @click="likeComment(tipId, comment)"
            :disabled="!canLikeComment(comment)"
            :title="
              !canLikeComment(comment)
                ? 'You cannot like this comment'
                : 'Like this comment'
            "
          >
            <i
              :class="[
                (comment.likedBy || []).includes(auth.currentUser?.uid)
                  ? 'bi-hand-thumbs-up-fill text-primary'
                  : 'bi-hand-thumbs-up',
              ]"
            ></i>
            <span class="ms-1">{{ comment.likes || 0 }}</span>
          </button>
        </div>
      </div>
      <!-- Add Comment Form -->
      <form @submit.prevent="submitComment(tipId)" class="d-flex mt-2">
        <label :for="'commentInput_' + tipId" class="visually-hidden">
          Add a comment
        </label>
        <input
          :id="'commentInput_' + tipId"
          name="comment"
          v-model="newComment[tipId]"
          class="form-control form-control-sm me-2"
          placeholder="Add a comment..."
          required
          aria-label="Add a comment"
        />
        <button
          class="btn btn-success btn-sm"
          :disabled="!newComment[tipId]?.trim()"
          aria-label="Submit comment"
          type="submit"
        >
          <i class="bi bi-send"></i>
        </button>
      </form>
    </div>
  </div>
</template>
