import React from 'react'
import styled from 'styled-components'

const StyledCell = styled.div`
  background: ${({ value }) => (value === 1 ? 'yellow' : 'initial')};
  width: 50px;
  height: 50px;
`

export default function Cell({ value }) {
  return <StyledCell value={value} />
}
