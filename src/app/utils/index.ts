import { WINNING_COMBOS } from '../constants'

export const checkForWin = (moves: number[]): boolean => {
  let result: boolean = false

  for (const combo of WINNING_COMBOS) {
    result = combo.every((index: number) => moves.includes(index))

    if (result) {
      console.log('Winning combo is', combo)
      const cells = Array.from(document.querySelectorAll('#board > div')).filter((_, index: number) => combo.includes(index))
      console.log(cells)

      break
    }
  }

  return result
}

export const classNames = (classnames: (string | [string, boolean])[]) => {
  return classnames.reduce(
    (
      acc: string[],
      classname: string | [string, boolean],
    ) => {
      if (typeof classname === 'string') return [...acc, classname]
      const [name, valid] = classname
      if (valid) return [...acc, name]
      return acc
    }, []).join(' ')
}
