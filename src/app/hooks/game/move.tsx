import { checkForWin } from '@/app/utils'
import { gameCtx } from '@/game'
import { Move, PLAYER } from '@/game/types'
import { useContext } from 'react'
import { useEndGame, useSwitchPlayer, useUpdateMoves } from './lib'

export function useMove() {
  const { layout, moves: allMoves, over, who, _ } = useContext(gameCtx)
  const updateMoves = useUpdateMoves()
  const endGame = useEndGame()
  const switchPlayer = useSwitchPlayer()

  const startOrStop = () => {
    if (!allMoves.length) {
      _.setRunning(true)
    } else if (allMoves.length === layout.length) {
      _.setRunning(false)
      _.setOver(true)
    }
  }

  const handleGameOver = (moves: number[]): boolean => {
    const didWin = checkForWin(moves)
    const gameOver = didWin || allMoves.length === layout.length - 1

    if (gameOver) {
      if (didWin) {
        setTimeout(() => endGame(who), 1500)
      }
      else endGame()

      return true
    }

    return false
  }

  const updateLayout = (moves: number[], move: number) => {
    _.setSelection(null)
    _.setLayout(
      (prevState: (string | null)[]) => prevState.map(
        (cell: string | null, index: number) => index === move
          ? who === PLAYER.user
            ? 'X' : 'O'
          : cell
      )
    )

    const gameOver = handleGameOver(moves)

    if (gameOver) return

    switchPlayer()
  }

  return (move: number) => {
    if (!over) {
      startOrStop()

      if (layout[move] !== null) {
        _.setMessage('Please select an empty space')
      } else {
        const moves = updateMoves(move)

        _.setMoves((prevState: Move[]) => [...prevState, {
          player: who,
          location: move,
        }])

        const wait = who === PLAYER.system ? 425 : 0

        setTimeout(() => updateLayout(moves, move), wait)
      }
    }
  }
}
