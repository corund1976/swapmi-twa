import { useEffect, useState } from "react"
import PropTypes from 'prop-types';

const COLORS = {
  1: 'yellow',
  2: 'red',
  3: 'green',
  4: 'blue',
  5: 'orange',
  6: 'purple',
  7: 'turquoise',
  8: 'violet',
  9: 'cyan'
}

const useParticle = ({
  maxWidth = 8,
  maxHeight = 8,
  numberOfPieces = 15,
  maxDistanceX = 80,
  maxDistanceY = 80,
  maxTime = 3,
  color = '',
  dropShadow = false }) => {

  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (numberOfPieces)
      setParticles(
        [...Array(numberOfPieces - 1).keys()].map(() => ({
          id: (maxWidth * Math.round(Math.random() * (99 - 1) + 1)) + (maxDistanceX * Math.round(Math.random() * (99 - 1) + 1)),
          width: `${Math.floor(Math.random() * (maxWidth - 2) + 2)}px`,
          height: `${Math.floor(Math.random() * (maxHeight - 2) + 2)}px`,
          finalPosX: `${Math.ceil(Math.random() * maxDistanceX) * (Math.round(Math.random()) ? 1 : -1)}px`,
          finalPosY: `${Math.ceil(Math.random() * maxDistanceY) * (Math.round(Math.random()) ? 1 : -1)}px`,
          time: Math.random() * (maxTime - 0.5) + 0.5,
          color: color ? color : COLORS[Math.round(Math.random() * 10)],
          dropShadow,
        }))
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfPieces])
  return particles
}

export default useParticle


useParticle.propTypes = {
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  numberOfPieces: PropTypes.number,
  maxDistanceX: PropTypes.number,
  maxDistanceY: PropTypes.number,
  maxTime: PropTypes.number,
  color: PropTypes.string,
  dropShadow: PropTypes.bool,
};
