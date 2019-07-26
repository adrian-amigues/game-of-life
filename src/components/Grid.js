import React, { useState } from 'react'
import styled from 'styled-components'
import { useInterval } from '../utils/hooks'
import Cell from './Cell'

const StyledGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.size}, 1fr);
  grid-template-columns: repeat(${props => props.size}, 1fr);
  grid-gap: 5px 5px;
`

const SIZE = 30
function init() {
  const cellGrid = new Array(SIZE).fill(0).map(row => new Array(SIZE).fill(0))
  // cellGrid[3][4] = 1
  // cellGrid[4][4] = 1
  // cellGrid[4][5] = 1
  // cellGrid[4][6] = 1
  // cellGrid[5][4] = 1
  return cellGrid.map(row => row.map(cell => (Math.random() > 0.5 ? 1 : 0)))
}

function getAdjacentLivingCells(grid, x, y) {
  const adjacent = [
    [[x - 1], [y - 1]],
    [[x], [y - 1]],
    [[x + 1], [y - 1]],
    [[x - 1], [y]],
    [[x + 1], [y]],
    [[x - 1], [y + 1]],
    [[x], [y + 1]],
    [[x + 1], [y + 1]],
  ]
  return adjacent
    .filter(([x, y]) => x >= 0 && y >= 0 && x < SIZE && y < SIZE)
    .reduce((acc, [x, y]) => acc + grid[y][x], 0)
}

function updateGrid(grid) {
  const newGrid = JSON.parse(JSON.stringify(grid))
  for (let [y, row] of grid.entries()) {
    for (let [x, cell] of row.entries()) {
      const neighbors = getAdjacentLivingCells(grid, x, y)

      if (cell === 0 && neighbors === 3) {
        newGrid[y][x] = 1
      } else if (cell === 1 && neighbors <= 1) {
        newGrid[y][x] = 0
      } else if (cell === 1 && neighbors >= 4) {
        newGrid[y][x] = 0
      } else {
        newGrid[y][x] = grid[y][x]
      }
    }
  }
  return newGrid
}

export default function Grid() {
  const [grid, setGrid] = useState(init())

  // setGrid(updateGrid(grid))

  useInterval(() => setGrid(updateGrid(grid)), 20)

  return (
    <StyledGrid size={SIZE}>
      {grid.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell value={cell} key={rowIndex * 10 + cellIndex} />
        ))
      )}
    </StyledGrid>
  )
}
