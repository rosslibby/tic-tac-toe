import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { useContext } from 'react'

export function useUpdateMoves() {
  const { systemMoves, userMoves, who, _ } = useContext(gameCtx)

  return (move: number): number[] => {
    const moves = who === PLAYER.system
        ? [...systemMoves, move]
        : [...userMoves, move]

    if (who === PLAYER.system) {
      _.setConsidered(move)
      setTimeout(() => {
        _.setConsidered(false)
        _.setSelection(move)
      }, 320)
      _.setSystemMoves((prevState: number[]) => [...prevState, move])
    } else {
      _.setUserMoves((prevState: number[]) => [...prevState, move])
    }

    return moves
  }
}
