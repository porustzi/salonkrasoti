import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { DataProvider } from './context/DataContext';

const AdminPage = lazy(() => import('./pages/admin/AdminPage').then(m => ({ default: m.AdminPage })));
import {
  HomePage,
  PricingPage,
  GalleryPage,
  AboutPage,
  TeamPage,
  ReviewsPage,
  BlogPage,
  PromotionsPage,
  ContactsPage,
  BookPage,
  PrivacyPage,
  TermsPage,
  NotFoundPage,
} from './pages';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/services" element={<Navigate to="/pricing" replace />} />
          <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
          <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/team" element={<Layout><TeamPage /></Layout>} />
          <Route path="/reviews" element={<Layout><ReviewsPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/promotions" element={<Layout><PromotionsPage /></Layout>} />
          <Route path="/contacts" element={<Layout><ContactsPage /></Layout>} />
          <Route path="/book" element={<Layout><BookPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
          <Route path="/admin" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-500">Завантаження...</div>}><AdminPage /></Suspense>} />
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
