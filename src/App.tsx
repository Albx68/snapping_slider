import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

const CANVAS_WIDTH = 400
const DEFAULT_RADIUS = 18;
const OFFSET = 100;
const NO_OF_PARTS = 10;

const App = () => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS)
  const [cursorPosition, setCursorPosition] = useState(OFFSET)
  const point = CANVAS_WIDTH / NO_OF_PARTS
  const snappingPointsArr = useMemo(() => {
    const points = [];
    for (let i = OFFSET; i <= CANVAS_WIDTH + OFFSET; i += point) {
      points.push(i);
    }
    return points;
  }, [point]);

  const snappingPoint = snappingPointsArr.map(el => {
    return <circle key={el} cx={el} cy="50" r="1" fill="#9999ff" stroke="#9999ff" stroke-width="2" />

  })
  const snappingPointWhite = snappingPointsArr.map(el => {
    return <circle key={el} cx={el} cy="50" r="1" fill="#fff" stroke="#fff" stroke-width="2" />

  })



  const onDragEnd = () => {
    // setRadius(defaultRadius)
  }

  const onDrag = (event, info) => {

    const closestSnapPoint = snappingPointsArr.reduce((closest, point) => {
      const distance = Math.abs(info.point.x - point);
      return distance < Math.abs(info.point.x - closest) ? point : closest;
    });
    setRadius(DEFAULT_RADIUS)
    setCursorPosition(closestSnapPoint)
  };
  return (
    <>
      <motion.div initial={{ textAlign: "center", userSelect: 'none', fontWeight: "bold", y: 10, width: 40, backgroundColor: "#ddbbff", borderRadius: 10 }} animate={{ x: cursorPosition - 20, }} >{cursorPosition - OFFSET}</motion.div>
      <motion.svg width={CANVAS_WIDTH + 200} height="100" >
        <line x1={OFFSET} y1="50" x2={String(CANVAS_WIDTH + OFFSET)} y2="50" stroke="#007bff" opacity={0.2} stroke-width="4" strokeLinecap='round' />
        <g>
          {snappingPoint}
        </g>

        <motion.g
          whileHover={{ cursor: "pointer" }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={false}
          dragMomentum={false}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          dragTransition={{ bounceStiffness: 0, bounceDamping: 0 }}

        >
          <motion.circle
            cx={cursorPosition} cy="50" r="10" fill="#007bff" stroke="white" stroke-width="2" />
          <motion.circle cx={cursorPosition} cy="50" r={radius} fill="#007bff" opacity={0.4} stroke="white" stroke-width="2" />
        </motion.g>

        <motion.line x1={OFFSET} y1="50" x2={cursorPosition} y2="50" stroke="#007bff" opacity={0.8} stroke-width="4" strokeLinecap='round'>

        </motion.line>
        <motion.g>
          {snappingPointWhite}
        </motion.g>
      </motion.svg>

    </>
  )
}

export default App
