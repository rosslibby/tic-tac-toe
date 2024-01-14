import { useContext } from 'react'
import { WINNING_COMBOS } from '../constants'
import { gameCtx } from '@/game'

export const useAI = () => {
  const { layout, systemMoves } = useContext(gameCtx)
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
