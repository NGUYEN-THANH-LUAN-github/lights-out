import React, { Component } from 'react'
import Board from './Board'

/** Simple app that just shows the LightsOut game. */

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Board />
      </div>
    )
  }
}

export default App
