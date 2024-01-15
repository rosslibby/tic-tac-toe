import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { useContext, useEffect } from 'react'
import { useAI } from '..'
import { useMove, useRestart } from './lib'

export const useGame = () => {
  const { layout, who } = useContext(gameCtx)
  const { smartMove } = useAI()
  const move = useMove()
  const restart = useRestart()

  useEffect(() => {
    if (who === PLAYER.system) {
      setTimeout(() => move(smartMove()), 3000)
    }
  }, [layout, who])

  return {
    move,
    restart,
  }
}