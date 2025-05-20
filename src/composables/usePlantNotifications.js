import { ref } from 'vue';
import { 
  getFirestore, collection, addDoc, getDocs, query, 
  orderBy, limit, doc, updateDoc, writeBatch, serverTimestamp,
  where, getDoc, setDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNotifications } from '@js/Notifications';
import { usePlants } from '@composables/usePlants';

export function usePlantNotifications() {
  const notifications = ref([]);
  const unreadCount = ref(0);
  const loading = ref(false);
  const db = getFirestore();
  const auth = getAuth();
  const { isSupported, showNotification } = useNotifications();
  
  // Create full instance for when used outside of plants component
  const plantsComposable = usePlants();
  const plants = plantsComposable.plants;
  const needsWater = plantsComposable.needsWater;
  const needsFertiliser = plantsComposable.needsFertiliser;
  
  // Store IDs of plants we've already notified about to prevent duplication
  const notifiedPlantIds = ref(new Set());
  
  // Load notified plants from Firestore on startup
  const loadNotifiedPlants = async () => {
    if (!auth.currentUser) return;
    
    try {
      const userNotificationsRef = doc(db, `userData/${auth.currentUser.uid}/userPreferences/notifications`);
      const docSnap = await getDoc(userNotificationsRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.notifiedPlants) {
          // Convert the array back to a Set
          notifiedPlantIds.value = new Set(data.notifiedPlants);
        }
      }
    } catch (error) {
      console.error('Error loading notified plants:', error);
    }
  };
  
  // Save notified plants to Firestore
  const saveNotifiedPlants = async () => {
    if (!auth.currentUser) return;
    
    try {
      const userNotificationsRef = doc(db, `userData/${auth.currentUser.uid}/userPreferences/notifications`);
      await setDoc(userNotificationsRef, {
        notifiedPlants: Array.from(notifiedPlantIds.value),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving notified plants:', error);
    }
  };
  
  // Check plants status and send notifications if needed
  const checkPlantsStatus = async (plantsToCheck = null) => {
    if (!auth.currentUser) return;
    
    try {
      await loadNotifiedPlants();
      
      // Use provided plants array if available, otherwise use our own
      const plantsArray = plantsToCheck || plants.value;
      
      if (!plantsArray || plantsArray.length === 0) {
        return;
      }
      
      const plantsNeedingWater = plantsArray.filter(
        p => needsWater(p) && !notifiedPlantIds.value.has(`water-${p.id}`)
      );
      
      const plantsNeedingFertiliser = plantsArray.filter(
        p => needsFertiliser(p) && !notifiedPlantIds.value.has(`fertiliser-${p.id}`)
      );
      
      // Send notifications for plants needing water
      for (const plant of plantsNeedingWater) {
        await sendNotification({
          title: "Plant needs water!",
          body: `${plant.name} needs watering.`,
          icon: "./favicon.ico",
          type: "water",
          plantId: plant.id,
          plantName: plant.name
        });
        
        // Mark as notified to prevent duplicates
        notifiedPlantIds.value.add(`water-${plant.id}`);
      }
      
      // Send notifications for plants needing fertiliser
      for (const plant of plantsNeedingFertiliser) {
        await sendNotification({
          title: "Plant needs fertiliser!",
          body: `${plant.name} needs fertilising.`,
          icon: "./favicon.ico",
          type: "fertiliser",
          plantId: plant.id,
          plantName: plant.name
        });
        
        // Mark as notified to prevent duplicates
        notifiedPlantIds.value.add(`fertiliser-${plant.id}`);
      }
      
      // Save the updated notified plants list
      if (plantsNeedingWater.length > 0 || plantsNeedingFertiliser.length > 0) {
        await saveNotifiedPlants();
      }
    } catch (error) {
      console.error('Error checking plants status:', error);
    }
  };
  
  // Send notification and store in Firestore
  const sendNotification = async (notification) => {
    if (!auth.currentUser) return;
    
    try {
      // Store in Firestore first
      const notificationData = {
        ...notification,
        userId: auth.currentUser.uid,
        read: false,
        createdAt: serverTimestamp()
      };
      
      await addDoc(
        collection(db, `userData/${auth.currentUser.uid}/notifications`),
        notificationData
      );
      
      // Show browser notification if supported
      if (isSupported.value) {
        await showNotification(notification.title, {
          body: notification.body,
          icon: notification.icon,
          data: {
            plantId: notification.plantId,
            type: notification.type
          }
        });
      }
      
      // Update local notifications list
      await loadNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  
  // Load notifications from Firestore
  const loadNotifications = async (limitCount = 30) => {
    if (!auth.currentUser) return;
    
    loading.value = true;
    
    try {
      const notificationsRef = collection(db, `userData/${auth.currentUser.uid}/notifications`);
      const q = query(notificationsRef, orderBy('createdAt', 'desc'), limit(limitCount));
      const snapshot = await getDocs(q);
      
      notifications.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      unreadCount.value = notifications.value.filter(n => !n.read).length;
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    if (!auth.currentUser) return;
    
    try {
      const docRef = doc(db, `userData/${auth.currentUser.uid}/notifications`, notificationId);
      await updateDoc(docRef, { read: true });
      
      // Update local state
      const index = notifications.value.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        notifications.value[index].read = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!auth.currentUser || notifications.value.length === 0) return;
    
    try {
      const batch = writeBatch(db);
      const unreadNotifications = notifications.value.filter(n => !n.read);
      
      for (const notification of unreadNotifications) {
        const docRef = doc(db, `userData/${auth.currentUser.uid}/notifications`, notification.id);
        batch.update(docRef, { read: true });
        notification.read = true;
      }
      
      await batch.commit();
      unreadCount.value = 0;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  // Clear notifications for a plant when it's watered or fertilised
  const clearPlantNotification = async (plantId, type) => {
    if (!auth.currentUser) return;
    
    try {
      await loadNotifiedPlants();
      
      // Remove the notification from the set
      notifiedPlantIds.value.delete(`${type}-${plantId}`);
      
      // Save the updated notified plants list
      await saveNotifiedPlants();
      
      // Update read status for any existing notifications
      const notificationsRef = collection(db, `userData/${auth.currentUser.uid}/notifications`);
      const q = query(
        notificationsRef, 
        where('plantId', '==', plantId),
        where('type', '==', type),
        where('read', '==', false)
      );
      
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      
      snapshot.docs.forEach(docRef => {
        batch.update(docRef.ref, { read: true });
      });
      
      await batch.commit();
      
      // Update local notifications if any were marked as read
      if (!snapshot.empty) {
        await loadNotifications();
      }
    } catch (error) {
      console.error(`Error clearing plant ${type} notification:`, error);
    }
  };
  
  // Clear all notifications
  const clearAllNotifications = async () => {
    if (!auth.currentUser) return;
    
    loading.value = true;
    
    try {
      const notificationsRef = collection(db, `userData/${auth.currentUser.uid}/notifications`);
      const snapshot = await getDocs(notificationsRef);
      
      if (!snapshot.empty) {
        const batch = writeBatch(db);
        
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        
        await batch.commit();
        
        // Clear local notifications
        notifications.value = [];
        unreadCount.value = 0;
      }
    } catch (error) {
      console.error('Error clearing notifications:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Initialize notification system
  const initialize = () => {
    loadNotifications();
    checkPlantsStatus();
  };
  
  // Return additional utility functions
  return {
    notifications,
    unreadCount,
    loading,
    checkPlantsStatus,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    clearPlantNotification, // New function to expose
    clearAllNotifications, // New function to expose
    initialize
  };
}