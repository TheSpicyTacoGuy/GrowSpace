import { ref } from 'vue';

export function useNotifications() {
  const isSupported = ref('Notification' in window);
  const isPermissionGranted = ref(
    isSupported.value && Notification.permission === 'granted'
  );

  // Request permission
  const requestPermission = async () => {
    if (!isSupported.value) return false;
    
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      isPermissionGranted.value = permission === 'granted';
      return isPermissionGranted.value;
    }
    
    return isPermissionGranted.value;
  };

  // Show notification
  const showNotification = async (title, options = {}) => {
    if (!isSupported.value) return false;
    
    // Request permission if not already granted
    if (!isPermissionGranted.value) {
      const granted = await requestPermission();
      if (!granted) return false;
    }
    
    // Create and show notification
    try {
      const notification = new Notification(title, options);
      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return false;
    }
  };

  return {
    isSupported,
    isPermissionGranted,
    requestPermission,
    showNotification
  };
}