'use client'
import { useContext } from 'react'
import styles from './board.module.css'
import { useGame } from '@/app/hooks'
import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { Overlay } from '../overlay'
import Cell from '../cell'

export const GameBoard = () => {
  const { layout, loading, over, running, who } = useContext(gameCtx)
  const { move } = useGame()
  const classname = (running && who === PLAYER.user && !loading)
    ? styles.board
    : `${styles.board} ${styles.off}`

  return (
    <div className={classname}>
      {over && (
        <Overlay />
      )}
      {layout.map((cell: (string | null), index: number) => (
        <Cell cell={cell} index={index} key={index} move={move} />
      ))}
    </div>
  )
}
