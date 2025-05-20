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
    
    // Create and show notification - ADD THESE OPTIONS
    try {
      const notification = new Notification(title, {
        ...options,
        // These are the critical properties to ensure notifications display:
        requireInteraction: true, // Don't auto-dismiss on some browsers
        silent: false,           // Allow sound (browser dependent)
        icon: '/favicon.ico',    // Use absolute path
        tag: options.type || 'growspace', // Group similar notifications
      });
      
      // Add notification click handler to open app
      notification.onclick = () => {
        window.focus();
        if (options.data?.plantId) {
          window.location.href = `/dashboard/plants/${options.data.plantId}`;
        }
      };
      
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