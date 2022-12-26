import React from 'react'

import { Container, Title } from './styles'
export const Header = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Container>
      <Title>BirmiiiYo</Title>
    </Container>
  )
}
