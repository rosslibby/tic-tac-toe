import { gameCtx } from '@/game'
import { PLAYER } from '@/game/types'
import { useContext } from 'react'

export function useRestart() {
  const { _ } = useContext(gameCtx)

  return () => {
    _.setOver(false)
    _.setMoves([])
    _.setUserMoves([])
    _.setSystemMoves([])
    _.setLayout(
      (prevState: (null | string)[]) => prevState.map(
        (item: (null | string)) => null
      )
    )
    _.setWho(PLAYER.user)
    _.setMessage('Your move')
    _.setRunning(true)
  }
}
