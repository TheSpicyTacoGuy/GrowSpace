import { useWebNotification } from "@vueuse/core";

export function useNotifications(customOptions = {}) {
    const defaultOptions = {
        title: "Hello, VueUse world!",
        dir: "auto",
        lang: "en",
        renotify: true,
        tag: "test",
    };
    
    const options = { ...defaultOptions, ...customOptions };
    
    const {
        isSupported,
        notification,
        permissionGranted,
        show: _showNotification,
        close,
        onError,
    } = useWebNotification(options);

    // Set up default handlers
    onError((error) => console.error("Notification error:", error));

    const requestPermission = async () => {
        if (isSupported.value && !permissionGranted.value) {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                permissionGranted.value = true;
                return true;
            }
        }
        return permissionGranted.value;
    };

    // Request permission on load
    requestPermission();

    const showNotification = async () => {
        if (isSupported.value && permissionGranted.value) {
            _showNotification();
        } else if (isSupported.value) {
            const granted = await requestPermission();
            if (granted) {
                _showNotification();
            }
        }
    };

    return {
        isSupported,
        permissionGranted,
        notification,
        showNotification,
        close,
        requestPermission,
    };
}
