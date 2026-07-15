import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout'
import { DataProvider } from './context/DataContext'
import { BookingProvider } from './context/BookingContext'

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminHome = lazy(() => import('./pages/admin/AdminHome').then(m => ({ default: m.AdminHome })))
const AdminServices = lazy(() => import('./pages/admin/AdminServices').then(m => ({ default: m.AdminServices })))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery').then(m => ({ default: m.AdminGallery })))
const AdminAbout = lazy(() => import('./pages/admin/AdminAbout').then(m => ({ default: m.AdminAbout })))
const AdminTeam = lazy(() => import('./pages/admin/AdminTeam').then(m => ({ default: m.AdminTeam })))
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews').then(m => ({ default: m.AdminReviews })))
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts').then(m => ({ default: m.AdminContacts })))

import {
  HomePage, PricingPage, GalleryPage, AboutPage,
  TeamPage, ReviewsPage, ContactsPage, BookPage,
  PrivacyPage, TermsPage, NotFoundPage,
} from './pages'

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-500 text-sm">Завантаження...</div>}>
      {children}
    </Suspense>
  )
}

function App() {
  return (
    <DataProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/services" element={<Navigate to="/pricing" replace />} />
            <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
            <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/team" element={<Layout><TeamPage /></Layout>} />
            <Route path="/reviews" element={<Layout><ReviewsPage /></Layout>} />
            <Route path="/contacts" element={<Layout><ContactsPage /></Layout>} />
            <Route path="/book" element={<Layout><BookPage /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
            <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
            <Route path="/admin/login" element={<SuspenseWrapper><AdminLogin /></SuspenseWrapper>} />
            <Route path="/admin" element={<SuspenseWrapper><AdminLayout /></SuspenseWrapper>}>
              <Route index element={<AdminDashboard />} />
              <Route path="pricing" element={<AdminServices />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="about/about" element={<AdminAbout />} />
              <Route path="about/team" element={<AdminTeam />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>
            <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </DataProvider>
  )
}

export default App
