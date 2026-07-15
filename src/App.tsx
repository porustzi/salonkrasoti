import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { BookingProvider } from './context/BookingContext'

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminEditor = lazy(() => import('./pages/admin/AdminEditor').then(m => ({ default: m.AdminEditor })))

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })))
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const TeamPage = lazy(() => import('./pages/TeamPage').then(m => ({ default: m.TeamPage })))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then(m => ({ default: m.ReviewsPage })))
const ContactsPage = lazy(() => import('./pages/ContactsPage').then(m => ({ default: m.ContactsPage })))
const BookPage = lazy(() => import('./pages/BookPage').then(m => ({ default: m.BookPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function SuspenseWrapper({ children }) {
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
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Navigate to="/pricing" replace />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin/login" element={<SuspenseWrapper><AdminLogin /></SuspenseWrapper>} />
            <Route path="/admin" element={<SuspenseWrapper><AdminLayout /></SuspenseWrapper>}>
              <Route index element={<AdminDashboard />} />
              <Route path="editor/general" element={<SuspenseWrapper><AdminEditor /></SuspenseWrapper>} />
              <Route path="editor/services" element={<SuspenseWrapper><AdminEditor /></SuspenseWrapper>} />
              <Route path="editor/gallery" element={<SuspenseWrapper><AdminEditor /></SuspenseWrapper>} />
              <Route path="editor/team" element={<SuspenseWrapper><AdminEditor /></SuspenseWrapper>} />
              <Route path="editor/reviews" element={<SuspenseWrapper><AdminEditor /></SuspenseWrapper>} />
            </Route>
            <Route path="*" element={<SuspenseWrapper><NotFoundPage /></SuspenseWrapper>} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </DataProvider>
  )
}

export default App
