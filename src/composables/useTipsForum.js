import { ref, computed, onMounted } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "@js/auth/firebase.js";
import { showToast } from "@js/toast.js";
import { useSettings } from "@composables/useSettings.js";

const tips = ref([]);
const newTip = ref("");
const editingTipId = ref(null);
const editTipContent = ref("");
let userRole = ref(null);

// Comments state
const comments = ref({});
const newComment = ref({});
const editingCommentId = ref(null);
const editCommentContent = ref("");

const MAX_COMMENTS_PER_TIP = 10;

// Fetch tips from Firestore
const fetchTips = async () => {
  const tipsCol = collection(db, "tips");
  const q = query(tipsCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  tips.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  await fetchAllComments(tips.value);
};

// Fetch comments for a tip
const fetchComments = async (tipId) => {
  const commentsCol = collection(db, "tips", tipId, "comments");
  const q = query(commentsCol, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  comments.value[tipId] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch comments for all tips after fetching tips
const fetchAllComments = async (tipsArr) => {
  for (const tip of tipsArr) {
    await fetchComments(tip.id);
  }
};

// Submit a new tip
const submitTip = async () => {
  if (!newTip.value.trim()) return;
  
  // Directly fetch the user role
  let role = "user";
  if (auth.currentUser) {
    try {
      const userRef = doc(db, "userData", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        role = userSnap.data().role || "user";
      }
    } catch (err) {
      console.error("Error fetching user role:", err);
    }
  }
  
  await addDoc(collection(db, "tips"), {
    content: newTip.value,
    author: auth.currentUser?.displayName || auth.currentUser?.email || "Anonymous",
    authorId: auth.currentUser?.uid || null,
    authorRole: role, // Use the directly fetched role
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: [],
  });
  showToast("Tip posted!", "success");
  newTip.value = "";
  fetchTips();
};

// Submit a comment
const submitComment = async (tipId) => {
  // Limit the number of comments per tip
  if ((comments.value[tipId]?.length || 0) >= MAX_COMMENTS_PER_TIP) {
    showToast(`Maximum of ${MAX_COMMENTS_PER_TIP} comments per tip reached.`, "danger");
    return;
  }
  
  const content = newComment.value[tipId];
  if (!content || !content.trim()) return;
  
  // Directly fetch the user role
  let role = "user";
  if (auth.currentUser) {
    try {
      const userRef = doc(db, "userData", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        role = userSnap.data().role || "user";
      }
    } catch (err) {
      console.error("Error fetching user role:", err);
    }
  }
  
  await addDoc(collection(db, "tips", tipId, "comments"), {
    content,
    author: auth.currentUser?.displayName || auth.currentUser?.email || "Anonymous",
    authorId: auth.currentUser?.uid || null,
    authorRole: role, // Use the directly fetched role
    createdAt: serverTimestamp(),
    likes: 0,
    likedBy: [],
  });
  showToast("Comment posted!", "success");
  newComment.value[tipId] = "";
  await fetchComments(tipId);
};

// Toggle like/unlike
const likeTip = async (tip) => {
  const userId = auth.currentUser?.uid;
  if (!userId || tip.authorId === userId) return;
  const tipRef = doc(db, "tips", tip.id);
  const hasLiked = (tip.likedBy || []).includes(userId);

  if (hasLiked) {
    await updateDoc(tipRef, {
      likes: (tip.likes || 1) - 1,
      likedBy: arrayRemove(userId),
    });
    showToast("Like removed.", "info");
  } else {
    await updateDoc(tipRef, {
      likes: (tip.likes || 0) + 1,
      likedBy: arrayUnion(userId),
    });
    showToast("Tip liked!", "success");
  }
  fetchTips();
};

// Like/unlike a comment
const likeComment = async (tipId, comment) => {
  const userId = auth.currentUser?.uid;
  if (!userId || comment.authorId === userId) return;
  const commentRef = doc(db, "tips", tipId, "comments", comment.id);
  const hasLiked = (comment.likedBy || []).includes(userId);

  if (hasLiked) {
    await updateDoc(commentRef, {
      likes: (comment.likes || 1) - 1,
      likedBy: arrayRemove(userId),
    });
    showToast("Like removed from comment.", "info");
  } else {
    await updateDoc(commentRef, {
      likes: (comment.likes || 0) + 1,
      likedBy: arrayUnion(userId),
    });
    showToast("Comment liked!", "success");
  }
  await fetchComments(tipId);
};

const canLikeComment = (comment) => {
  const userId = auth.currentUser?.uid;
  return userId && comment.authorId !== userId;
};

// Start editing
const startEditTip = (tip) => {
  editingTipId.value = tip.id;
  editTipContent.value = tip.content;
};

// Save edit
const saveEditTip = async (tip) => {
  if (!editTipContent.value.trim()) return;
  const tipRef = doc(db, "tips", tip.id);
  await updateDoc(tipRef, { content: editTipContent.value });
  editingTipId.value = null;
  editTipContent.value = "";
  showToast("Tip updated!", "success");
  fetchTips();
};

// Cancel edit
const cancelEditTip = () => {
  editingTipId.value = null;
  editTipContent.value = "";
};

// Start editing a comment
const startEditComment = (comment) => {
  editingCommentId.value = comment.id;
  editCommentContent.value = comment.content;
};

// Save edited comment
const saveEditComment = async (tipId, comment) => {
  if (!editCommentContent.value.trim()) return;
  const commentRef = doc(db, "tips", tipId, "comments", comment.id);
  await updateDoc(commentRef, { content: editCommentContent.value });
  editingCommentId.value = null;
  editCommentContent.value = "";
  showToast("Comment updated!", "success");
  await fetchComments(tipId);
};

// Cancel editing
const cancelEditComment = () => {
  editingCommentId.value = null;
  editCommentContent.value = "";
};

// Delete a tip
const deleteTip = async (tip) => {
  if (confirm("Are you sure you want to delete this tip?")) {
    // 1. Delete all comments in the subcollection
    const commentsCol = collection(db, "tips", tip.id, "comments");
    const commentsSnap = await getDocs(commentsCol);
    const batch = [];
    commentsSnap.forEach((docSnap) => {
      batch.push(deleteDoc(doc(db, "tips", tip.id, "comments", docSnap.id)));
    });
    await Promise.all(batch);

    // 2. Delete the tip document
    await deleteDoc(doc(db, "tips", tip.id));
    showToast("Tip deleted.", "danger");
    fetchTips();
  }
};

// Delete a comment
const deleteComment = async (tipId, comment) => {
  if (confirm("Are you sure you want to delete this comment?")) {
    await deleteDoc(doc(db, "tips", tipId, "comments", comment.id));
    showToast("Comment deleted.", "danger");
    await fetchComments(tipId);
  }
};

export default function useTipsForum() {
  // Get fresh userRole value inside the function
  const settings = useSettings();
  userRole.value = settings.userRole.value;

  onMounted(fetchTips);

  return {
    tips,
    tipsSorted: computed(() =>
      [...tips.value].sort((a, b) => (b.likes || 0) - (a.likes || 0))
    ),
    newTip,
    editingTipId,
    editTipContent,
    submitTip,
    likeTip,
    canLike: (tip) => {
      const userId = auth.currentUser?.uid;
      return userId && tip.authorId !== userId;
    },
    startEditTip,
    saveEditTip,
    cancelEditTip,
    deleteTip,
    formatDate: (ts) => {
      if (!ts) return "";
      const date = ts.seconds ? new Date(ts.seconds * 1000) : new Date();
      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    },
    auth,
    comments,
    newComment,
    submitComment,
    fetchComments,
    likeComment,
    canLikeComment,
    editingCommentId,
    editCommentContent,
    startEditComment,
    saveEditComment,
    cancelEditComment,
    deleteComment,
  };
}