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
      setConsidered,
      setLayout,
      setLoading,
      setRunning,
      setMoves,
      setMessage,
      setOver,
      setSelection,
      setSystemMoves,
      setUserMoves,
      setWho,
    }
  } = useContext(gameCtx)

  useEffect(() => {
    if (who === PLAYER.system) {
      setTimeout(() => move(smartMove()), 3000)
    }
  }, [layout, who])

  const updateMoves = (move: number) => {
    const moves = who === PLAYER.system
      ? [...systemMoves, move]
      : [...userMoves, move]

    if (who === PLAYER.system) {
      setConsidered(move)
      setTimeout(() => {
        setConsidered(false)
        setSelection(move)
      }, 100)
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

      const wait = who === PLAYER.system ? 200 : 0
      setTimeout(() => {
        setSelection(null)
        setLayout(
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
        switchWho()
      }, wait)
    }
  }

  function switchWho() {
    setLoading(true)
    const next = who === PLAYER.user ? PLAYER.system : PLAYER.user
    setWho(next)
    setTimeout(() => {
      setMessage(next === PLAYER.user ? 'Your move' : 'Their move')
      setLoading(false)
    }, 1500)
  }

  return {
    move,
    restart,
  }
}
