'use client'
import { useContext } from 'react'
import styles from './board.module.css'
import { gameCtx } from '.'
import { Overlay } from './overlay'
import { System, User } from './piece'
import { useGame } from '@/app/hooks'
import { PLAYER } from './types'

export const GameBoard = () => {
  const { layout, over, running, who } = useContext(gameCtx)
  const { move } = useGame()
  const classname = running ? styles.board : `${styles.board} ${styles.off}`

  return (
    <div className={classname}>
      {over && (
        <Overlay />
      )}
      {layout.map((cell: (string | null), index: number) => (
        <div key={index} className={styles.cell} onClick={() => who === PLAYER.user ? move(index) : null}>{
          cell === 'X' ? <User /> : cell === 'O' ? <System /> : null
        }</div>
      ))}
    </div>
  )
}
