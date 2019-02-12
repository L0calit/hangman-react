import React from 'react'
import PropTypes from 'prop-types'
import './WordDisplay.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const WordDisplay = ({ word }) => (
    <Card.Text>
        {word.split("").map((symbol, index) => (
            <Button variant="secondary" className="symbol" disabled key={index}>
                {index === 0? symbol.toUpperCase() : symbol}
            </Button>
        ))}
    </Card.Text>
)

WordDisplay.propTypes = {
  word: PropTypes.string.isRequired,
}

export default WordDisplay