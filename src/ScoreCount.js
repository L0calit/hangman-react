import React from 'react'
import PropTypes from 'prop-types'
import './ScoreCount.css'

const ScoreCount = ({ score }) => <div className="score">Score number : {score}</div>

ScoreCount.propTypes = {
    score: PropTypes.number.isRequired,
}

export default ScoreCount