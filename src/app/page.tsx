'use client'
import styles from './page.module.css'
import { useContext } from 'react'
import { gameCtx } from '@/game'
import { GameBoard } from '@/components/board'

export default function Home() {
  const { message } = useContext(gameCtx)

  return (
    <main className={styles.main}>
      <h1>{message}</h1>
      <GameBoard />
    </main>
  )
}
