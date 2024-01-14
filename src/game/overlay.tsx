import { useGame } from '@/app/hooks'
import styles from './overlay.module.css'

export const Overlay = () => {
  const { restart } = useGame()

  return (
    <div className={styles.overlay}>
      <button onClick={restart}>Play again</button>
    </div>
  )
}
