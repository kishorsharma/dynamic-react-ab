export const triggerCustomEvent = eventName => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(eventName))
  }
}
