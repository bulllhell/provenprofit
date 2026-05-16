import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark">
    <div className="relative">
      <div
        className="w-14 h-14 rounded-full border-2 border-dark-border animate-spin"
        style={{ borderTopColor: '#F97316' }}
      />
      <div
        className="absolute inset-2 rounded-full border-2 border-dark-border animate-spin"
        style={{ borderTopColor: '#2563EB', animationDirection: 'reverse', animationDuration: '0.7s' }}
      />
    </div>
  </div>
);

// Each page is a separate JS chunk via dynamic import
const Home      = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services  = lazy(() => import('./pages/Services'));
const BookCall  = lazy(() => import('./pages/BookCall'));
const ThankYou  = lazy(() => import('./pages/ThankYou'));
const NotFound  = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index              element={<Home />} />
          <Route path="portfolio"   element={<Portfolio />} />
          <Route path="services"    element={<Services />} />
          <Route path="book-a-call" element={<BookCall />} />
          <Route path="thank-you"   element={<ThankYou />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}