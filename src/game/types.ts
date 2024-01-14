export enum PLAYER {
  user = 'USER',
  system = 'SYSTEM',
}

export interface Move {
  player: PLAYER
  location: number
}

export interface Game {
  layout: (string | null)[]
  userMoves: number[]
  systemMoves: number[]
  moves: Move[]
  over: boolean
  running: boolean
  who: PLAYER
  message?: string | null
  _: {
    [key: string]: Function
  }
}
