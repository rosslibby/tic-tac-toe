import styles from './piece.module.css'

export const User = () => (
  <div className={styles.x}>
    <div className={styles.bar} />
    <div className={styles.bar} />
  </div>
)

export const System = () => (
  <div className={styles.o} />
)
