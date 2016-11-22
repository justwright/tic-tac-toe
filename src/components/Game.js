import React, { Component } from 'react';
import Board from './Board';
import calculateWinner from '../helpers/calculateWinner';
import '../styles/Game.css';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }
    handleClick(i) {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status = (theWinner) => {
            if (theWinner) {
                return `Winner: ${theWinner}`
            }
            return `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`
        };
        const moves = history.map((step, move) => {
            const description = move ? `Move #${move}` : 'Game Start';

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{description}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <h2 className="status">{status(winner)}</h2>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Game;
