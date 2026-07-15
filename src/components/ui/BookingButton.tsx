import { useState } from 'react'
import { Button } from './Button'
import { BookingModal } from './BookingModal'
import type { ButtonProps } from './Button'

export function BookingButton(props: Omit<ButtonProps, 'href' | 'external'>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button {...props} onClick={() => setIsOpen(true)} />
      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
