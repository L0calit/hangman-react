import React from 'react'
import PropTypes from 'prop-types'
import './Letter.css'
import Button from 'react-bootstrap/Button'

const Letter = ({ symbol, feedback, index, onClick }) => (
  <Button type="button" className="letter" variant="primary" onClick={() => onClick(index)} disabled={feedback}>
    {symbol.toUpperCase()}
  </Button>
)

Letter.propTypes = {
  symbol: PropTypes.string.isRequired,
  feedback: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Letter