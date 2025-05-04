// toast.js
// Import Bootstrap 5 Toast component
import { Toast } from "bootstrap";

// Function to create and display a Bootstrap 5 toast
export function showToast(message, type, duration = 3000) {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container position-fixed top-0 start-50 translate-middle-x p-3";
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${type} border-0`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");

  // Toast content
  toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

  // Append toast to container
  toastContainer.appendChild(toast);

  // Initialize and show the toast
  const bootstrapToast = new Toast(toast, { delay: duration });
  bootstrapToast.show();

  // Remove toast from DOM after it hides
  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove();
  });
}
