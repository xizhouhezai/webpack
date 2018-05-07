class eventEmeitter {
  constructor() {
    this._event = this._event || new Map()
    this._maxListeners = this._maxListeners || 10
  }
}

eventEmeitter.prototype.emit = function(type, ...args) {
  let handler
  handler = this._event.get(type)

  if (args.length > 0) {
    handler.aplly(this, args)
  } else {
    handler.call(this)
  }

  return true
}

eventEmeitter.prototype.addLitener = function (type, fn) {
  if (!this._event.get(type)) {
    this._event.set(type, fn)
  }
}

export default function e() {
  let emitter = new eventEmeitter()

  emitter.addLitener('arson', function(man) {
    console.log(`arson ${man}`)
  })

  emitter.emit('arson', 'Tom')
}