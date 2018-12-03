export const triggerCustomEvent = eventName => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(eventName))
  }
}

export const unique = (array = []) => {
  return array.filter((val, index, arr) => { return arr.indexOf(val) === index })
}
