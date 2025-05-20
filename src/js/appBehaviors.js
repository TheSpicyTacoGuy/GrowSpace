/**
 * Utility to handle app-like behaviors like disabling right-click
 * on mobile/PWA installations
 */

// Check if the app is running in standalone mode (installed PWA)
export function isRunningAsInstalledApp() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
}

// Check if running on mobile device
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
}

// Check if running in development mode
export function isDevMode() {
  return (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.indexOf('192.168.') === 0 ||
    window.location.port === '3000' || 
    window.location.port === '8080'
  );
}

// Check if element is an input field, textarea, or other editable element
function isEditableElement(element) {
  if (!element) return false;
  
  const tagName = element.tagName?.toLowerCase();
  const contentEditable = element.contentEditable === 'true';
  const inputTypes = ['text', 'password', 'email', 'number', 'search', 
                      'tel', 'url', 'date', 'datetime-local', 'time'];
  
  return (
    tagName === 'input' && inputTypes.includes(element.type) || 
    tagName === 'textarea' || 
    contentEditable
  );
}

// Initialize app behaviors
export function initializeAppBehaviors() {
  // Skip on desktop unless in standalone mode, and always skip in development mode
  if (isDevMode() || (!isMobileDevice() && !isRunningAsInstalledApp())) {
    console.log('App behaviors skipped: development mode or desktop browser');
    return;
  }
  
  // Rest of the code remains the same...
  // Prevent context menu (right-click) EXCEPT on editable elements
  document.addEventListener('contextmenu', (e) => {
    // Allow context menu on editable elements
    if (isEditableElement(e.target)) {
      return true;
    }
    
    // Prevent on all other elements
    e.preventDefault();
    return false;
  });
  
  // Prevent selection EXCEPT in editable elements
  document.addEventListener('selectstart', (e) => {
    if ((isMobileDevice() || isRunningAsInstalledApp()) && !isEditableElement(e.target)) {
      e.preventDefault();
      return false;
    }
  });
  
  // Don't interfere with copy/paste events on inputs
  document.addEventListener('copy', (e) => {
    if (!isEditableElement(e.target)) {
      // Only prevent copy on non-editable elements
      e.preventDefault();
    }
  });
  
  document.addEventListener('paste', (e) => {
    if (!isEditableElement(e.target)) {
      // Only prevent paste on non-editable elements
      e.preventDefault();
    }
  });
  
  document.addEventListener('cut', (e) => {
    if (!isEditableElement(e.target)) {
      // Only prevent cut on non-editable elements
      e.preventDefault();
    }
  });
  
  // Disable pull-to-refresh on iOS Safari (except our custom implementation)
  document.body.style.overscrollBehavior = 'none';
  
  // Add CSS class to body for PWA-specific styling
  if (isRunningAsInstalledApp()) {
    document.body.classList.add('pwa-installed');
  }
  
  console.log('App behaviors initialized:', {
    mobile: isMobileDevice(),
    pwa: isRunningAsInstalledApp()
  });
}