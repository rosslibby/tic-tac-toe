import { FACES } from './types'
import styles from './cube.module.css'
import ring from '../3d.module.css'

export default function Face({ side }: {
  side: FACES
}) {
  return (
    <div className={`${styles.cube__face} ${styles[side]}`} />
  )
}
