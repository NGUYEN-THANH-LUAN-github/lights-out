/* eslint-disable no-useless-constructor */
/* eslint-disable react/require-render-return */
import React, { Component } from 'react'
import Cell from './Cell'
import './styles/styles.css'

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: 0.25,
  }

  constructor(props) {
    super(props)
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    const board = []
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; y++) {
      let row = []
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    const { ncols, nrows } = this.props
    const board = this.state.board
    let [y, x] = coord.split('-').map(Number)

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x]
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x)
    flipCell(y - 1, x)
    flipCell(y + 1, x)
    flipCell(y, x - 1)
    flipCell(y, x + 1)
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell))
    this.setState({ board: board, hasWon: hasWon })
  }

  /** Render game board or winning message. */

  render() {
    let tblBoard = []
    for (let y = 0; y < this.props.nrows; y++) {
      let row = []
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        )
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }
    // TODO
    return (
      <div>
        {this.state.hasWon ? (
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WON!</span>
          </div>
        ) : (
          <div>
            <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
            <table className='Board'>
              <tbody>{tblBoard}</tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

export default Board
