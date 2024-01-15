import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { useContext } from 'react'

export function useEndGame() {
  const { _ } = useContext(gameCtx)

  return (winner?: PLAYER) => {
    _.setOver(true)
    _.setRunning(false)

    if (winner) {
      _.setMessage(winner === PLAYER.user ? 'You won!' : 'You lost.')
    } else {
      _.setMessage('Game over.')
    }
  }
}
