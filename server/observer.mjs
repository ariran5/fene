export function mongo(){
  const collections = new Map()

  return {
    subscribe(cb, list){
      list.forEach(item => {
        const count = collections.get(item) ?? 0
        collections.set(item, count + 1)
      })
      return (...args) => cb(...args)
    },
    unsubscribe(cb, list){
      list.forEach(item => {
        const count = collections.get(item) ?? 0
        collections.set(item, Math.min(count - 1, 0))
      })
    }
  }
}