import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { useContext, useEffect } from 'react'
import { useAI } from '..'
import { useMove, useRestart } from './lib'

export const useGame = () => {
  const { layout, over, who } = useContext(gameCtx)
  const { smartMove } = useAI()
  const move = useMove()

  useEffect(() => {
    if (who === PLAYER.system && !over) {
      setTimeout(() => move(smartMove()), 3000)
    }
  }, [layout, who])

  return { move }
}
