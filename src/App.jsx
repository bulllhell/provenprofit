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
const Home      = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services  = lazy(() => import('./pages/Services'));
const BookCall  = lazy(() => import('./pages/BookCall'));
const ThankYou  = lazy(() => import('./pages/ThankYou'));
const Team      = lazy(() => import('./pages/Team'));

const NotFound       = lazy(() => import('./pages/NotFound'));
const AdminLogin     = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// ── Service pages ──────────────────────────
const SvcEcommerce   = lazy(() => import('./pages/services/ecommerce'));
const SvcBranding    = lazy(() => import('./pages/services/branding'));
const SvcSocialMedia = lazy(() => import('./pages/services/social-media'));
const SvcSeo         = lazy(() => import('./pages/services/seo'));
const SvcEmail       = lazy(() => import('./pages/services/email-marketing'));
const SvcGoogleAds   = lazy(() => import('./pages/services/google-ads'));
const SvcWebDesign   = lazy(() => import('./pages/services/web-design'));
const SvcFunnels     = lazy(() => import('./pages/services/funnels'));

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
              <Page seo={{ title: 'Proven Profit Brand | High-Converting Websites', description: 'We build modern websites, funnels, and systems that convert visitors into paying customers.', url: 'https://www.provenprofitbrand.com/' }}>
                <Home />
              </Page>
            }
          />

          <Route
            path="portfolio"
            element={
              <Page seo={{ title: 'Portfolio | Proven Profit Brand', description: 'See our past high-converting website projects and digital systems.', url: 'https://www.provenprofitbrand.com/portfolio' }}>
                <Portfolio />
              </Page>
            }
          />

          <Route
            path="services"
            element={
              <Page seo={{ title: 'Services | Web Development & Funnels', description: 'Website design, funnels, automation, and conversion systems.', url: 'https://www.provenprofitbrand.com/services' }}>
                <Services />
              </Page>
            }
          />

          <Route
            path="book-a-call"
            element={
              <Page seo={{ title: 'Book a Call | Proven Profit Brand', description: 'Schedule a strategy call to grow your business online.', url: 'https://www.provenprofitbrand.com/book-a-call' }}>
                <BookCall />
              </Page>
            }
          />

          <Route
            path="thank-you"
            element={
              <Page seo={{ title: 'Thank You', description: 'We have received your request.', url: 'https://www.provenprofitbrand.com/thank-you' }}>
                <ThankYou />
              </Page>
            }
          />

          <Route
            path="team"
            element={
              <Page seo={{ title: 'Our Team | Proven Profit Brand', description: 'Meet the team building high-performance digital systems.', url: 'https://www.provenprofitbrand.com/team' }}>
                <Team />
              </Page>
            }
          />

          {/* ── Service pages ── */}
          <Route path="services/ecommerce"       element={<Page seo={{ title: 'eCommerce Store Design | Proven Profit', description: 'Shopify and WooCommerce store design built to convert.', url: 'https://www.provenprofitbrand.com/services/ecommerce' }}><SvcEcommerce /></Page>} />
          <Route path="services/branding"        element={<Page seo={{ title: 'Branding | Proven Profit', description: 'Brand identity, logo and visual system.', url: 'https://www.provenprofitbrand.com/services/branding' }}><SvcBranding /></Page>} />
          <Route path="services/social-media"    element={<Page seo={{ title: 'Social Media Management | Proven Profit', description: 'Instagram, TikTok, Meta Ads management.', url: 'https://www.provenprofitbrand.com/services/social-media' }}><SvcSocialMedia /></Page>} />
          <Route path="services/seo"             element={<Page seo={{ title: 'SEO | Proven Profit', description: 'Organic growth and search engine rankings.', url: 'https://www.provenprofitbrand.com/services/seo' }}><SvcSeo /></Page>} />
          <Route path="services/email-marketing" element={<Page seo={{ title: 'Email Marketing & Klaviyo | Proven Profit', description: 'Email flows, campaigns and Klaviyo automations.', url: 'https://www.provenprofitbrand.com/services/email-marketing' }}><SvcEmail /></Page>} />
          <Route path="services/google-ads"      element={<Page seo={{ title: 'Google Ads & Google My Business | Proven Profit', description: 'Paid search and local visibility.', url: 'https://www.provenprofitbrand.com/services/google-ads' }}><SvcGoogleAds /></Page>} />
          <Route path="services/web-design"      element={<Page seo={{ title: 'Web Design | Proven Profit', description: 'Custom websites and landing pages.', url: 'https://www.provenprofitbrand.com/services/web-design' }}><SvcWebDesign /></Page>} />
          <Route path="services/funnels"         element={<Page seo={{ title: 'Sales Funnel Creation | Proven Profit', description: 'High-converting funnel builds.', url: 'https://www.provenprofitbrand.com/services/funnels' }}><SvcFunnels /></Page>} />

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
            <Page seo={{ title: 'Page Not Found', description: 'This page does not exist.', url: 'https://www.provenprofitbrand.com/' }}>
              <NotFound />
            </Page>
          }
        />

      </Routes>
    </Suspense>
  );
}