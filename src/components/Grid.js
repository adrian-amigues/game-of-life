import React from 'react'
import styled from 'styled-components'
import Cell from './Cell'

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.size}, 1fr);
  grid-template-columns: repeat(${props => props.size}, 1fr);
  grid-gap: 5px 5px;
`

const size = 10
const init = () => {
  const cellGrid = new Array(size).fill(0).map(row => new Array(size).fill(0))
  cellGrid[4][4] = 1
  cellGrid[4][5] = 1
  cellGrid[5][4] = 1
  return cellGrid
}

export default function Grid() {
  const grid = init()
  console.log('grid: ', grid)

  return (
    <StyledGrid size={size}>
      {grid.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell value={cell} key={rowIndex * 10 + cellIndex} />
        ))
      )}
    </StyledGrid>
  )
}
