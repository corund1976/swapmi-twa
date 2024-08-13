import PropTypes from 'prop-types';

import useParticle from './useParticle';

// import s from './firework.module.css';
import './firework.css';

function Firework({
  maxWidth = 8,
  maxHeight = 8,
  numberOfPieces = 15,
  maxDistanceX = 80,
  maxDistanceY = 80,
  maxTime = 3,
  color = '',
  dropShadow = false,
  recycle = false,
}) {
  const particles = useParticle({
    maxWidth,
    maxHeight,
    numberOfPieces,
    maxDistanceX,
    maxDistanceY,
    maxTime,
    color,
    dropShadow,
  });

  return (
    <div className="container-particle">
      {particles &&
        particles.map((particle, index) => (
          <span key={`${particle.id}${index}`}>
            <span
              className={
                recycle === false
                  ? `span-particle span-props-${particle.id}`
                  : `span-particle span-props-${particle.id} span-fly-${particle.id}`
              }
            ></span>
            <style>
              {`
                  .span-props-${particle.id} {
                    width: ${particle.width};
                    height: ${particle.height};
                    background-color: ${particle.color};
                    top: 0px;
                    left: 0px;
                    box-shadow: ${
                      particle.dropShadow === false
                        ? 'none'
                        : `1px 1px 3px ${particle.color} , -1px -1px 3px ${particle.color};`
                    };
                  }

                  @keyframes fly-${particle.id} {
                    0% {
                      top: 0px;
                      left: 0px;
                      opacity: 1;
                      display: block;
                    }

                    100% {
                      top: ${particle.finalPosY};
                      left: ${particle.finalPosX};
                      display: none;
                      opacity: 0;
                    }
                  }

                  .span-fly-${particle.id} {
                    animation: fly-${particle.id} ${particle.time}s ease-out forwards;
                  }
                `}
            </style>
          </span>
        ))}
    </div>
  );
}

export default Firework;

Firework.propTypes = {
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  numberOfPieces: PropTypes.number,
  maxDistanceX: PropTypes.number,
  maxDistanceY: PropTypes.number,
  maxTime: PropTypes.number,
  color: PropTypes.string,
  dropShadow: PropTypes.bool,
  recycle: PropTypes.bool,
};
