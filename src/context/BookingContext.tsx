import { createContext, useContext, ReactNode } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  return <BookingContext.Provider value={null}>{children}</BookingContext.Provider>
}

export function useBooking() {
  return useContext(BookingContext)
}
