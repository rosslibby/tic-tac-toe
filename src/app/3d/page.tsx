'use client'
import styles from '../page.module.css'
import styles2 from './3d.module.css'
import cstyles from './cube/cube.module.css'
import { useContext, useEffect, useState } from 'react'
import { gameCtx } from '@/game'
import Cube from './cube'
import Image from 'next/image'

export default function Home() {
  const { message, over } = useContext(gameCtx)
  const [state, setState] = useState<string>('o.gif')

  useEffect(() => {
    const evth = (e: KeyboardEvent) => {
      console.log('tapp', e.key)
      if (e.key === 'ArrowUp') {
        setState('up-anim.gif')
      } else if (e.key === 'ArrowDown') {
        setState('down-anim.gif')
      }
    }
    console.log('add handler')
    document.addEventListener('keydown', evth)

    return () => {
      document.removeEventListener('keydown', evth)
    }
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>{message}</h1>
      </div>
      {/* <p>Rings here</p>
      <div className={styles2.rings}>
        <div className={styles2.container}>
          <div className={styles2.ring} />
        </div>
      </div>
      <p>Blocks here</p> */}
      {/* <div className={styles2.imgs}> */}
        {/* <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} />
        <div className={styles2.block} style={{
          backgroundImage: `url(/reference/frames/${state})`,
        }} /> */}
        {/* <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" />
        <Image src={`/reference/frames/${state}`} alt="up" width="300" height="300" /> */}
      {/* </div> */}

      <div className={cstyles.wrapper}>
        <div className={cstyles.bg} />
        <Cube />
      </div>
    </main>
  )
}
