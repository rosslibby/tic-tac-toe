import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { useContext } from 'react'

export function useSwitchPlayer() {
  const { who, _ } = useContext(gameCtx)

  return () => {
    _.setLoading(true)
    const next = who === PLAYER.user ? PLAYER.system : PLAYER.user

    _.setWho(next)

    setTimeout(() => {
      _.setMessage(next === PLAYER.user ? 'Your move' : 'Their move')
      _.setLoading(false)
    }, 1500)
  }
}
