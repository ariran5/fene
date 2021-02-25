export const overload = (types, ...args) => {
  return types.map(item => {
    let fn
    switch (item) {
      case String:
        fn = item => typeof item === 'string'
        break

      case Number:
        fn = item => typeof item === 'number'
        break
    
      case Function:
        fn = item => item instanceof Function
        break

      case Object:
        fn = item => item.toString() === '[object Object]'
        break

      default:
        fn = item => item
        break

    }
    const index = args.findIndex(fn)

    return index >= 0 ? args.splice(index, 1)[0]: undefined
  })
}