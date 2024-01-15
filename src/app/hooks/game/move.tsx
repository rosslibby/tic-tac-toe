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

  return (id: number) => {
    if (over) return
    if (!allMoves.length) {
      _.setRunning(true)
    } else if (allMoves.length === layout.length) {
      _.setRunning(false)
      _.setOver(true)
    }
    if (layout[id] !== null) {
      _.setMessage('Please select an empty space')
    } else {
      const moves = updateMoves(id)
      const didWin = checkForWin(moves)
      const gameOver = didWin || allMoves.length === layout.length - 1

      _.setMoves((prevState: Move[]) => [...prevState, {
        player: who,
        location: id,
      }])

      const wait = who === PLAYER.system ? 425 : 0
      setTimeout(() => {
        _.setSelection(null)
        _.setLayout(
          (prevState: (string | null)[]) => prevState.map(
            (cell: string | null, index: number) => index === id
              ? who === PLAYER.user
                ? 'X' : 'O'
              : cell
          )
        )

        if (gameOver) {
          if (didWin) {
            setTimeout(() => endGame(who), 1500)
          }
          else endGame()

          return
        }
        switchPlayer()
      }, wait)
    }
  }
}
