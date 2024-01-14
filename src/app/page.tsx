'use client'
import styles from './page.module.css'
import { GameBoard } from '@/game/board'
import { useContext } from 'react'
import { gameCtx } from '@/game'

export default function Home() {
  const { message } = useContext(gameCtx)

  return (
    <main className={styles.main}>
      <h1>{message}</h1>
      <GameBoard />
    </main>
  )
}
