class EventEmitter {
  constructor() {
    this._events = this._events || new Map()
  }
  addLitener(type, fn) {
    let handler = this._events.get(type)
    
    if (!handler) {
      this._events.set(type, fn)
    } else if (handler && typeof handler === 'function') {
      this._events.set(type, [handler, fn])
    } else {
      this.handler.push(fn)
    }
  }
  emit(type, ...args) {
    let handler = this._events.get(type)

    if (Array.isArray(handler)) {
      if (arg.length > 0) {
        handler.forEach(val => {
          val.apply(this, args)
        })
      } else {
        val.call(this)
      }
    } else {
      if (arg.length > 0) {
        handler.apply(this, args)
      } else {
        handler.call(this)
      }
    }
  }
}
