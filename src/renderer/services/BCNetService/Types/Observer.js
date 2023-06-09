class Observer {
  static item = null

  constructor(state = 0, status = -1) {
    this.state = state
    this.initialState = state
    this.status = status

  }

  static initial() {
    this.item = new Observer()
  }

  update(action) {

    switch (action.type) {
      case 'CONNECTING':
        this.state = this.state
        break
      case 'NOT_CONNECTED':
        this.state = this.state
        break
      case 'TIMEOUT':
        this.state = action.payload
        break
      case 'RESOLVE':
        this.state = action.payload
        this.status = action.status
        break
      case 'REJECT':
        this.state = action.payload
        break
      case 'ADD':
        this.state += action.payload
        break

      default:
        // this.state = this.initialState
        break
    }
  }
}

module.exports = Observer
