import styled from 'styled-components'
import styles from './user.module.css'

export default function User() {
  return (
    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <StyledPath
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinecap="round"
        d="M6 6l12 12"
        className={styles.left}
      />
      <StyledPath
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinecap="round"
        d="M6 18 18 6"
        className={styles.right}
      />
    </svg>
  )
}

const StyledPath = styled.path<{ stroke: string }>`
  stroke: ${({ stroke }) => stroke};
`
