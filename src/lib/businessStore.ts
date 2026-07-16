import { useSyncExternalStore } from 'react'
import { defaultSiteContent } from '../data/siteContent'

export type BusinessInfo = typeof defaultSiteContent.businessInfo

let current: BusinessInfo = defaultSiteContent.businessInfo
const listeners = new Set<() => void>()

export function setBusinessInfo(info: BusinessInfo) {
  current = info
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot() {
  return current
}

export function useBusinessInfo(): BusinessInfo {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

let bookingUrl = defaultSiteContent.businessInfo.bookingUrl || ''
const bookingListeners = new Set<() => void>()

export function setBookingUrl(url: string) {
  bookingUrl = url
  bookingListeners.forEach((l) => l())
}

function subscribeBooking(cb: () => void) {
  bookingListeners.add(cb)
  return () => bookingListeners.delete(cb)
}

export function useBookingUrl(): string {
  return useSyncExternalStore(subscribeBooking, () => bookingUrl, () => bookingUrl)
}

