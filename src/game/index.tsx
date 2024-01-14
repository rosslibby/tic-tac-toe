'use client'
import { ReactNode, createContext, useContext, useState } from 'react'
import { Game, Move, PLAYER } from './types'

export const gameCtx = createContext<Game>({
  loading: false,
  layout: [null, null, null, null, null, null, null, null, null],
  moves: [],
  userMoves: [],
  systemMoves: [],
  over: false,
  running: false,
  who: PLAYER.user,
  _: {},
})

export default function GameProvider({ children }: {
  children: ReactNode
}) {
  const ctx = useContext(gameCtx)
  const [loading, setLoading] = useState<boolean>(false)
  const [layout, setLayout] = useState<(string | null)[]>(ctx.layout)
  const [who, setWho] = useState<PLAYER>(ctx.who)
  const [over, setOver] = useState<boolean>(false)
  const [running, setRunning] = useState<boolean>(true)
  const [moves, setMoves] = useState<Move[]>([])
  const [userMoves, setUserMoves] = useState<number[]>([])
  const [systemMoves, setSystemMoves] = useState<number[]>([])
  const [message, setMessage] = useState<string | null>('Your move')

  return (
    <gameCtx.Provider value={{
      loading,
      layout,
      moves,
      userMoves,
      systemMoves,
      over,
      running,
      who,
      message,
      _: {
        setLayout,
        setLoading,
        setMessage,
        setMoves,
        setUserMoves,
        setSystemMoves,
        setOver,
        setRunning,
        setWho,
      },
    }}>
      {children}
    </gameCtx.Provider>
  )
}
