import { WINNING_COMBOS } from '../constants'

export const checkForWin = (moves: number[]): boolean => {
  let result: boolean = false

  for (const combo of WINNING_COMBOS) {
    result = combo.every((index: number) => moves.includes(index))

    if (result) break
  }

  return result
}
