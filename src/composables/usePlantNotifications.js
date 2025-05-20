import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useNotifications } from '@js/Notifications.js';
import { usePlants } from '@composables/usePlants.js';
import { 
  getFirestore, collection, addDoc, getDocs, query, 
  orderBy, limit, doc, updateDoc, writeBatch, serverTimestamp 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export function usePlantNotifications() {
  const notifications = ref([]);
  const unreadCount = ref(0);
  const loading = ref(false);
  const db = getFirestore();
  const auth = getAuth();
  const { isSupported, showNotification } = useNotifications();
  const { plants, needsWater, needsFertiliser } = usePlants();
  
  // Store IDs of plants we've already notified about to prevent duplication
  const notifiedPlantIds = ref(new Set());
  
  // Check plants status and send notifications if needed
  const checkPlantsStatus = async () => {
    if (!auth.currentUser) return;
    
    try {
      const plantsNeedingWater = plants.value.filter(
        p => needsWater(p) && !notifiedPlantIds.value.has(`water-${p.id}`)
      );
      
      const plantsNeedingFertiliser = plants.value.filter(
        p => needsFertiliser(p) && !notifiedPlantIds.value.has(`fertiliser-${p.id}`)
      );
      
      // Send notifications for plants needing water
      for (const plant of plantsNeedingWater) {
        await sendNotification({
          title: "Plant needs water!",
          body: `${plant.name} needs watering.`,
          icon: "/favicon.ico",
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
          icon: "/favicon.ico",
          type: "fertiliser",
          plantId: plant.id,
          plantName: plant.name
        });
        
        // Mark as notified to prevent duplicates
        notifiedPlantIds.value.add(`fertiliser-${plant.id}`);
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
  
  // Watch for changes in plants to check status
  watch(() => plants.value, () => {
    checkPlantsStatus();
  }, { deep: true });
  
  // Initialize notification system
  onMounted(() => {
    loadNotifications();
    checkPlantsStatus();
    
    // Set up periodic checks every 30 minutes
    const interval = setInterval(checkPlantsStatus, 30 * 60 * 1000);
    
    // Clean up on unmount
    onUnmounted(() => {
      clearInterval(interval);
    });
  });
  
  return {
    notifications,
    unreadCount,
    loading,
    checkPlantsStatus,
    loadNotifications,
    markAsRead,
    markAllAsRead
  };
}