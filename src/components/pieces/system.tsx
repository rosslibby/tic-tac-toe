import styled from 'styled-components'
import styles from './system.module.css'

export default function System() {
  return (
    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        className={styles.path}
      />
    </svg>
  )
}

const StyledPath = styled.path<{ stroke: string }>`
  stroke: ${({ stroke }) => stroke};
`
