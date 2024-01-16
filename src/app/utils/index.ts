import { WINNING_COMBOS } from '../constants'

/**
 * 
 *  + + + + + + + + + + + + + + + + + + + +
 *  +                                     +
 *  +     TENTATIVE LINE DRAWING CODE     +
 *  +                                     +
 *  + + + + + + + + + + + + + + + + + + + +
 * 
 * const line = document.createElement('div')
 * line.style.width = '4px'
 * line.style.height = '4px'
 * line.style.backgroundColor = 'red'
 * line.style.position = 'absolute'
 * document.getElementById('board').appendChild(line)
 * line.style.top = (temp2.offsetTop + temp2.offsetHeight / 2) - line.offsetHeight / 2 + 'px'
 * line.style.transition = 'all 2s ease'
 * line.style.width = Math.abs((temp3.offsetLeft + temp3.offsetWidth / 2) - (temp1.offsetLeft - temp1.offsetWidth / 2)) - line.style.width + 'px'
 */

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
