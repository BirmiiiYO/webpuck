import React from 'react'

import { Container } from './styles'

export const Footer = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Container>
      <button onClick={() => setOpen(!open)}>
        {String(open)}
      </button>
      <h1>bye bye</h1>
    </Container>
  )
}
