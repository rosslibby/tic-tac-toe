import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { useContext } from 'react'

export function useSwitchPlayer() {
  const { over, who, _ } = useContext(gameCtx)

  return () => {
    if (!over) {
      _.setLoading(true)
      const next = who === PLAYER.user ? PLAYER.system : PLAYER.user

      _.setWho(next)

      setTimeout(() => {
        _.setMessage(next === PLAYER.user ? 'Your move' : 'Their move')
        _.setLoading(false)
      }, 1500)
    }
  }
}
