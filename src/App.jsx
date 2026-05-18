import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import SEO from './components/SEO';

// ── Loading UI ─────────────────────────────
const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
    <div className="relative">
      <div
        className="w-14 h-14 rounded-full border-2 border-[#E2D9F3] animate-spin"
        style={{ borderTopColor: '#7C3AED' }}
      />
      <div
        className="absolute inset-2 rounded-full border-2 border-[#E2D9F3] animate-spin"
        style={{
          borderTopColor: '#F97316',
          animationDirection: 'reverse',
          animationDuration: '0.7s',
        }}
      />
    </div>
  </div>
);

// ── Lazy Pages ─────────────────────────────
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services = lazy(() => import('./pages/Services'));
const BookCall = lazy(() => import('./pages/BookCall'));
const ThankYou = lazy(() => import('./pages/ThankYou')); // FIXED
const Team = lazy(() => import('./pages/Team'));

const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// ── SEO wrapper helper ─────────────────────
const Page = ({ seo, children }) => (
  <>
    <SEO {...seo} />
    {children}
  </>
);

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>

        {/* ───────── PUBLIC SITE (WITH LAYOUT) ───────── */}
        <Route element={<Layout />}>
          
          <Route
            index
            element={
              <Page
                seo={{
                  title: 'Proven Profit Brand | High-Converting Websites',
                  description:
                    'We build modern websites, funnels, and systems that convert visitors into paying customers.',
                  url: 'https://www.provenprofitbrand.com/',
                }}
              >
                <Home />
              </Page>
            }
          />

          <Route
            path="portfolio"
            element={
              <Page
                seo={{
                  title: 'Portfolio | Proven Profit Brand',
                  description:
                    'See our past high-converting website projects and digital systems.',
                  url: 'https://www.provenprofitbrand.com/portfolio',
                }}
              >
                <Portfolio />
              </Page>
            }
          />

          <Route
            path="services"
            element={
              <Page
                seo={{
                  title: 'Services | Web Development & Funnels',
                  description:
                    'Website design, funnels, automation, and conversion systems.',
                  url: 'https://www.provenprofitbrand.com/services',
                }}
              >
                <Services />
              </Page>
            }
          />

          <Route
            path="book-a-call"
            element={
              <Page
                seo={{
                  title: 'Book a Call | Proven Profit Brand',
                  description:
                    'Schedule a strategy call to grow your business online.',
                  url: 'https://www.provenprofitbrand.com/book-a-call',
                }}
              >
                <BookCall />
              </Page>
            }
          />

          <Route
            path="thank-you"
            element={
              <Page
                seo={{
                  title: 'Thank You',
                  description: 'We have received your request.',
                  url: 'https://www.provenprofitbrand.com/thank-you',
                }}
              >
                <ThankYou />
              </Page>
            }
          />

          <Route
            path="team"
            element={
              <Page
                seo={{
                  title: 'Our Team | Proven Profit Brand',
                  description:
                    'Meet the team building high-performance digital systems.',
                  url: 'https://www.provenprofitbrand.com/team',
                }}
              >
                <Team />
              </Page>
            }
          />
        </Route>

        {/* ───────── ADMIN (NO LAYOUT) ───────── */}
        <Route path="admin" element={<AdminLogin />} />

        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ───────── 404 ───────── */}
        <Route
          path="*"
          element={
            <Page
              seo={{
                title: 'Page Not Found',
                description: 'This page does not exist.',
                url: 'https://www.provenprofitbrand.com/',
              }}
            >
              <NotFound />
            </Page>
          }
        />

      </Routes>
    </Suspense>
  );
}