import { ref } from "vue";
import { getAuth, deleteUser } from "firebase/auth";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "vue-router";
import { showToast } from "@js/toast";

export function useAccountDeletion() {
  const showDeleteModal = ref(false);
  const deletingAccount = ref(false);
  const router = useRouter();
  const db = getFirestore();
  const auth = getAuth();

  async function deleteAccount() {
    deletingAccount.value = true;
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user.");

      const userId = user.uid;

      // 1. Delete all user subcollections (plants, greenhouses, etc.)
      const subcollections = ["plants", "greenhouses"];
      for (const sub of subcollections) {
        const subColRef = collection(db, `userData/${userId}/${sub}`);
        const docsSnap = await getDocs(subColRef);
        for (const docSnap of docsSnap.docs) {
          await deleteDoc(doc(db, `userData/${userId}/${sub}/${docSnap.id}`));
        }
      }

      // 2. Delete userData document
      await deleteDoc(doc(db, "userData", userId));

      // 3. Delete user's tips and comments
      const tipsSnap = await getDocs(collection(db, "tips"));
      for (const tipDoc of tipsSnap.docs) {
        const tip = tipDoc.data();
        // Delete tips authored by user
        if (tip.authorId === userId) {
          // Delete all comments under this tip
          const commentsSnap = await getDocs(collection(db, "tips", tipDoc.id, "comments"));
          for (const commentDoc of commentsSnap.docs) {
            await deleteDoc(doc(db, "tips", tipDoc.id, "comments", commentDoc.id));
          }
          await deleteDoc(doc(db, "tips", tipDoc.id));
        } else {
          // Delete comments authored by user under other tips
          const commentsSnap = await getDocs(collection(db, "tips", tipDoc.id, "comments"));
          for (const commentDoc of commentsSnap.docs) {
            if (commentDoc.data().authorId === userId) {
              await deleteDoc(doc(db, "tips", tipDoc.id, "comments", commentDoc.id));
            }
          }
        }
      }

      // 4. Delete Firebase Auth user
      await deleteUser(user);

      showToast("Account deleted. Hope to see you again!", "success");
      router.push("/login");
    } catch (err) {
      showToast("Failed to delete account: " + (err.message || err), "danger");
    } finally {
      deletingAccount.value = false;
      showDeleteModal.value = false;
    }
  }

  return {
    showDeleteModal,
    deletingAccount,
    deleteAccount,
  };
}