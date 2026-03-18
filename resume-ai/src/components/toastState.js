export const toastEvent = new EventTarget();

export function showToast(message, type = 'success') {
  toastEvent.dispatchEvent(new CustomEvent('show', { detail: { message, type } }));
}
