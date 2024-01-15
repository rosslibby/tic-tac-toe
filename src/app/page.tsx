'use client'
import styles from './page.module.css'
import { useContext } from 'react'
import { gameCtx } from '@/game'
import { GameBoard } from '@/components/board'
import { useRestart } from './hooks/game/restart'

export default function Home() {
  const { message, over } = useContext(gameCtx)
  const restart = useRestart()

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>{message}</h1>
        {over && (
          <button
            className={styles.restartGame}
            onClick={restart}
          >Play again</button>
        )}
      </div>
      <GameBoard />
    </main>
  )
}
