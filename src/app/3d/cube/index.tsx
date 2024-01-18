/**
 * References:
 * https://dribbble.com/shots/18413350-Tic-Tac-Toe-Machine
 * https://www.behance.net/gallery/145197895/Tic-Tac-Toe-Machine
 * https://mir-s3-cdn-cf.behance.net/project_modules/disp/183ad2145197895.629b3c539d58f.gif
 * https://3dtransforms.desandro.com/cube
 * https://mir-s3-cdn-cf.behance.net/project_modules/disp/3e1054145197895.629b3c539d9c1.gif
 */

import styled from 'styled-components'
import styles from './cube.module.css'
import Face from './face'
import { FACES } from './types'
import { useState } from 'react'

const faces: FACES[] = [
  FACES.front,
  FACES.back,
  FACES.right,
  FACES.left,
  FACES.top,
  FACES.bottom,
]

export default function Cube() {
  const [angle, setAngle] = useState<number>(18)
  const rotate = () => setAngle((prevState: number) => {
    return prevState + 90
  })

  return (
    <div className={styles.scene}>
      <StyledCube
        className={styles.cube}
        angle={angle}
        onClick={rotate}
      >
        {faces.map((face: FACES) => (
          <Face side={face} key={face} />
        ))}
      </StyledCube>
    </div>
  )
}

const StyledCube = styled.div<{ angle: number }>`
  transform: translateZ(-100px) rotateX(${({ angle}) => angle}deg);
`
