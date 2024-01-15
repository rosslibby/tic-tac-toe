'use client'
import { useContext } from 'react'
import styles from './board.module.css'
import { useGame } from '@/app/hooks'
import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import Cell from '../cell'
import { classNames } from '@/app/utils'

export const GameBoard = () => {
  const { layout, loading, over, running, who } = useContext(gameCtx)
  const { move } = useGame()
  const classname = classNames([
    styles.board,
    [styles.off, running && who === PLAYER.user && !loading],
    [styles.over, over],
  ])

  return (
    <div className={classname} id="board">
      {layout.map((cell: (string | null), index: number) => (
        <Cell cell={cell} index={index} key={index} move={move} />
      ))}
    </div>
  )
}
