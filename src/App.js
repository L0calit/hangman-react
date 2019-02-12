import React, { Component } from 'react';
import './App.css';

import Letter from './Letter'
import ScoreCount from './ScoreCount'
import WordDisplay from './WordDisplay'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("")
const WORDS = ["refuser", "reprendre", "vendredi", "orange", "lire", "jambon", "miette", "fromage"]

class App extends Component {
  constructor(props) {
    super(props)
    this.newGame = this.newGame.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.state = {
      word: this.generateWord(),
      mask: "",
      score: 0,
      nbErrors: 0,
    }
  }

  generateWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length)
    return WORDS[randomIndex]
  }

  computeDisplay() {
    const { word, mask } = this.state
    return word.replace(/\w/g,
      (letter) => (mask.includes(letter) ? letter : '_')
    )
  }

  getFeedbackForLetter(index) {
    const { mask } = this.state
    return mask.includes(ALPHABET[index])
  }

  newGame() {
    this.setState(() => ({ word: this.generateWord(), mask: "", score: 0, nbErrors: 0 }))
  }

  resetGame() {
    this.setState(() => ({ mask: "", score: 0, nbErrors : 0 }))
  }

  handleSymbolClick = (index) => {
    const { score, mask, word, nbErrors } = this.state
    let newScore = score
    let newNbErrors = nbErrors
    if (word.includes(ALPHABET[index])) {
      newScore += 2
    } else {
      newScore -= 1
      newNbErrors = nbErrors + 1
    }

    let newMask = mask.concat(ALPHABET[index])

    const newDisplay = word.replace(/\w/g, (letter) => (newMask.includes(letter) ? letter : '_'))

    if (!newDisplay.includes("_")) {
      newMask = ALPHABET
    }

    if (newNbErrors === 7) {
      newMask = ALPHABET
    }

    this.setState({ mask: newMask, score : newScore, nbErrors: newNbErrors })
  }

  render() {
    const { score, nbErrors } = this.state
    const lost = nbErrors === 7
    const won = !this.computeDisplay().includes("_")
    const imageSrc = "images/hangman".concat(nbErrors, ".png")
    return (
      <div className="pendu">
        <h1>Hangman Game</h1>
        <Card className="wordDisplay">
          <Card.Body>
            <Card.Img variant="top" src={imageSrc} className="hangmanImage" />
            { won && !lost && <Card.Title>You have won the game</Card.Title> }
            { lost && <Card.Title>You have lost! Try again.</Card.Title> }
            <Card.Subtitle className="mb-2 text-muted">
              <ScoreCount score={score} />
            </Card.Subtitle>
            <WordDisplay word={this.computeDisplay()} />
            <Card.Link>
              <Button className="reset" variant="link" onClick={this.newGame}>New Game</Button>
            </Card.Link>
            <Card.Link>
              <Button className="reset" variant="link" onClick={this.resetGame}>Reset this Game</Button>
            </Card.Link>
          </Card.Body>
        </Card>
        <Card className="keyboard">
          <Card.Body>
            <Card.Text>
              {ALPHABET.map((symbol, index) => (
                <Letter
                symbol={symbol}
                feedback={this.getFeedbackForLetter(index)}
                index={index}
                key={index}
                onClick={this.handleSymbolClick}
                />
                ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
