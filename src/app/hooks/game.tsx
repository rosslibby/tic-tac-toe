import { gameCtx } from '@/game'
import { Move, PLAYER } from '@/game/types'
import { useContext, useEffect } from 'react'
import { checkForWin } from '../utils'
import { useAI } from '.'

export const useGame = () => {
  const { randomMove, smartMove } = useAI()

  const {
    layout,
    moves: allMoves,
    over,
    systemMoves,
    userMoves,
    who,
    _: {
      setLayout,
      setRunning,
      setMoves,
      setMessage,
      setOver,
      setWho,
      setUserMoves,
      setSystemMoves,
    }
  } = useContext(gameCtx)

  useEffect(() => {
    if (who === PLAYER.system) {
      setTimeout(() => move(smartMove()), 1500)
    }
  }, [layout, who])

  const updateMoves = (move: number) => {
    const moves = who === PLAYER.system
      ? [...systemMoves, move]
      : [...userMoves, move]

    if (who === PLAYER.system) {
      setSystemMoves((prevState: number[]) => [...prevState, move])
    } else {
      setUserMoves((prevState: number[]) => [...prevState, move])
    }

    return moves
  }

  const endGame = (winner?: PLAYER) => {
    setOver(true)
    setRunning(false)

    if (winner) {
      setMessage(winner === PLAYER.user ? 'You won!' : 'You lost.')
    } else {
      setMessage(`Game over.`)
    }
  }

  const restart = () => {
    setOver(false)
    setMoves([])
    setUserMoves([])
    setSystemMoves([])
    setLayout((prevState: (null | string)[]) => prevState.map((item: (null | string)) => null))
    setWho(PLAYER.user)
    setMessage('Your move')
    setRunning(true)
  }

  const move = (id: number) => {
    if (over) return
    if (!allMoves.length) {
      setRunning(true)
    } else if (allMoves.length === layout.length) {
      setRunning(false)
      setOver(true)
    }
    if (layout[id] !== null) {
      setMessage('Please select an empty space')
    } else {
      const moves = updateMoves(id)
      const didWin = checkForWin(moves)
      const gameOver = didWin || allMoves.length === layout.length - 1

      setMoves((prevState: Move[]) => [...prevState, {
        player: who,
        location: id,
      }])
      setLayout(
        (prevState: (string | null)[]) => prevState.map(
          (cell: string | null, index: number) => index === id
            ? who === PLAYER.user
              ? 'X' : 'O'
            : cell
        )
      )

      if (gameOver) {
        if (didWin) endGame(who)
        else endGame()

        return
      }
      switchWho()
    }
  }

  function switchWho() {
    const next = who === PLAYER.user ? PLAYER.system : PLAYER.user
    setWho(next)
    setMessage(next === PLAYER.user ? 'Your move' : 'Their move')
  }

  return {
    move,
    restart,
  }
}
