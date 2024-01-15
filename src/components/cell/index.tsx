import { useContext } from 'react'
import styles from './cell.module.css'
import User from '@/components/pieces/user'
import System from '@/components/pieces/system'
import { classNames } from '@/app/utils'
import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'

export default function Cell({ cell, index, move }: {
  cell: string | null
  index: number
  move: (id: number) => void
}) {
  const {
    considered,
    loading,
    over,
    running,
    selection,
    who
  } = useContext(gameCtx)
  const userCanPlay = !loading && running && who === PLAYER.user && !over

  const classnames = classNames([
    styles.cell,
    [styles.hover, index === considered],
    [styles.active, index === selection],
    [styles.disabled, !userCanPlay],
  ])

  const onClick = () => who === PLAYER.user ? move(index) : null
  const content = cell
    ? cell === 'X' ? <User /> : <System />
    : null

  return (
    <div
      className={classnames}
      onClick={onClick}
    >
      {content}
    </div>
  )
}
