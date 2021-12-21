class Observer {
  static item = null

  constructor(state = 1) {
    this.state = state
    this.initialState = state
  }
  static initial() {
    this.item = new Observer()
  }

  update(action) {
    switch (action.type) {
      case 'INCREMENT':
        this.state = ++this.state
        break
      case 'DECREMENT':
        this.state = --this.state
        break
      case 'ADD':
        this.state += action.payload
        break
      case 'RESOLVE':
        this.state = action.payload
        // console.log('--observer-->this.state', this.state)
        break
      case 'REJECT':
      // this.state = action.payload
      // console.log('--REJECT-->observer-->this.state typeof',typeof this.state)
      // console.log('--REJECT-->observer-->this.state ',this.state)
      console.log('--REJECT-->observer-->this.state ')
      

      default:
        this.state = this.initialState
        break
    }
  }
}

module.exports = Observer
