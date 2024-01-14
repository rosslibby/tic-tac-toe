'use client'
import { useContext, useEffect } from 'react'
import { gameCtx } from '.'
import { Move, PLAYER } from './types'

const WINNING_COMBOS: [number, number, number][] = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
]

const checkForWin = (moves: number[]): boolean => {
  let result: boolean = false

  for (const combo of WINNING_COMBOS) {
    result = combo.every((index: number) => moves.includes(index))

    if (result) break
  }

  return result
}

export const useAI = () => {
  const { layout, moves, systemMoves, userMoves } = useContext(gameCtx)
  const getAvailable = () => layout.map(
    (cell: (string | null), index: number) => cell === null ? index : -1
  ).filter((val: number) => val > -1)

  const randomMove = () => {
    const available = getAvailable()

    return available[Math.floor(Math.random() * available.length)]
  }

  const smartMove = () => {
    const available = getAvailable()
    const potentials = WINNING_COMBOS.reduce((acc: [number, number, number][], combo: [number, number, number]) => {
      if (combo.every((index: number) => Array.from(new Set([...available, ...systemMoves])).includes(index))) {
        return [...acc, combo]
      }

      return acc
    }, [])
    const started = systemMoves.length
      ? potentials.reduce((acc: [number, number, number][], combo: [number, number, number]) => {
        if (systemMoves.some((move: number) => combo.includes(move))) return [...acc, combo]

        return acc
      }, [])
      : potentials
    const probability = started.length < potentials.length
      ? started.reduce((acc: {[key: number]: [number, number, number][]}, combo: [number, number, number]) => {
        const commonElements = systemMoves.length + combo.length - (new Set([...systemMoves, ...combo])).size

        return {
          ...acc,
          [commonElements]: [...(acc[commonElements] || []), combo],
        }
      }, {})
      : started.reduce((acc: {[key: number]: [number, number, number][]}, combo: [number, number, number]) => {
        return {
          1: [...(acc[1] || []), combo],
        }
      }, {})
      const [_, highestProbability] = Object.keys(probability).length
        ? Object.entries(probability).sort(([akey, avalue], [bkey, bvalue]) => Number(akey) - Number(bkey)).pop()!
        : [null, [available]]
      const randomHighest = Math.floor(Math.random() * highestProbability.length)
      const combo = highestProbability[randomHighest].filter((value: number) => !systemMoves.includes(value))
      const pick = combo[Math.floor(Math.random() * combo.length)]

      return pick
  }

  return {
    randomMove,
    smartMove,
  }
}

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
