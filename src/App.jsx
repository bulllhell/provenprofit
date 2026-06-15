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
const About     = lazy(() => import('./pages/About'));

const NotFound       = lazy(() => import('./pages/NotFound'));
const AdminLogin     = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// ── Legal pages ────────────────────────────
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfUse    = lazy(() => import('./pages/legal/TermsOfUse'));
const RefundPolicy  = lazy(() => import('./pages/legal/RefundPolicy'));

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
              <Page seo={{ title: 'Proven Profit Marketing Agency | eCommerce & Digital Marketing', description: 'We build high converting Shopify stores, run Google and Facebook Ads, manage SEO, social media, and email marketing for brands worldwide.', url: 'https://www.provenprofitbrand.com/' }}>
                <Home />
              </Page>
            }
          />

          <Route
            path="portfolio"
            element={
              <Page seo={{ title: 'Portfolio | Proven Profit Marketing Agency', description: 'See our past high converting Shopify stores, websites, and digital marketing results.', url: 'https://www.provenprofitbrand.com/portfolio' }}>
                <Portfolio />
              </Page>
            }
          />

          <Route
            path="services"
            element={
              <Page seo={{ title: 'Services | Proven Profit Marketing Agency', description: 'Shopify stores, web design, Google Ads, SEO, social media management, branding and email marketing.', url: 'https://www.provenprofitbrand.com/services' }}>
                <Services />
              </Page>
            }
          />

          <Route
            path="book-a-call"
            element={
              <Page seo={{ title: 'Book a Free Call | Proven Profit Marketing Agency', description: 'Schedule a free strategy call to grow your business online.', url: 'https://www.provenprofitbrand.com/book-a-call' }}>
                <BookCall />
              </Page>
            }
          />

          <Route
            path="thank-you"
            element={
              <Page seo={{ title: 'Thank You | Proven Profit Marketing Agency', description: 'We have received your request and will be in touch shortly.', url: 'https://www.provenprofitbrand.com/thank-you' }}>
                <ThankYou />
              </Page>
            }
          />

          <Route
            path="about-us"
            element={
              <Page seo={{ title: 'About Us | Proven Profit Marketing Agency', description: 'Learn about Proven Profit Marketing Agency, our mission, our story, and the team behind your brand growth.', url: 'https://www.provenprofitbrand.com/about-us' }}>
                <About />
              </Page>
            }
          />

          {/* ── Legal pages ── */}
          <Route path="privacy-policy" element={<Page seo={{ title: 'Privacy Policy | Proven Profit Marketing Agency', description: 'How Proven Profit Marketing Agency collects, uses, and protects your information.', url: 'https://www.provenprofitbrand.com/privacy-policy' }}><PrivacyPolicy /></Page>} />
          <Route path="terms-of-use" element={<Page seo={{ title: 'Terms of Use | Proven Profit Marketing Agency', description: 'The terms governing the use of Proven Profit Marketing Agency services.', url: 'https://www.provenprofitbrand.com/terms-of-use' }}><TermsOfUse /></Page>} />
          <Route path="refund-policy" element={<Page seo={{ title: 'Refund Policy | Proven Profit Marketing Agency', description: 'Our refund terms and how to request a refund.', url: 'https://www.provenprofitbrand.com/refund-policy' }}><RefundPolicy /></Page>} />

          {/* ── Service pages ── */}
          <Route path="services/ecommerce"       element={<Page seo={{ title: 'eCommerce Store Design | Proven Profit Marketing Agency', description: 'Shopify and WooCommerce store design built to convert visitors into paying customers.', url: 'https://www.provenprofitbrand.com/services/ecommerce' }}><SvcEcommerce /></Page>} />
          <Route path="services/branding"        element={<Page seo={{ title: 'Branding & Logo Design | Proven Profit Marketing Agency', description: 'Brand identity, logo design and complete visual systems for modern businesses.', url: 'https://www.provenprofitbrand.com/services/branding' }}><SvcBranding /></Page>} />
          <Route path="services/social-media"    element={<Page seo={{ title: 'Social Media Management & Meta Ads | Proven Profit Marketing Agency', description: 'Instagram, TikTok and Facebook Ads management that grows your brand and drives sales.', url: 'https://www.provenprofitbrand.com/services/social-media' }}><SvcSocialMedia /></Page>} />
          <Route path="services/seo"             element={<Page seo={{ title: 'SEO Services | Proven Profit Marketing Agency', description: 'Organic search growth, keyword rankings and technical SEO that compounds over time.', url: 'https://www.provenprofitbrand.com/services/seo' }}><SvcSeo /></Page>} />
          <Route path="services/email-marketing" element={<Page seo={{ title: 'Email Marketing & Klaviyo Flows | Proven Profit Marketing Agency', description: 'Email automation, Klaviyo flows and campaigns that earn revenue every day.', url: 'https://www.provenprofitbrand.com/services/email-marketing' }}><SvcEmail /></Page>} />
          <Route path="services/google-ads"      element={<Page seo={{ title: 'Google Ads & Google My Business | Proven Profit Marketing Agency', description: 'Paid search campaigns and local visibility management that puts you in front of buyers.', url: 'https://www.provenprofitbrand.com/services/google-ads' }}><SvcGoogleAds /></Page>} />
          <Route path="services/web-design"      element={<Page seo={{ title: 'Web Design | Proven Profit Marketing Agency', description: 'Custom websites and landing pages designed to convert visitors into customers.', url: 'https://www.provenprofitbrand.com/services/web-design' }}><SvcWebDesign /></Page>} />
          <Route path="services/funnels"         element={<Page seo={{ title: 'Sales Funnel Creation | Proven Profit Marketing Agency', description: 'High converting sales funnel builds that turn traffic into revenue.', url: 'https://www.provenprofitbrand.com/services/funnels' }}><SvcFunnels /></Page>} />

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
            <Page seo={{ title: 'Page Not Found | Proven Profit Marketing Agency', description: 'This page does not exist.', url: 'https://www.provenprofitbrand.com/' }}>
              <NotFound />
            </Page>
          }
        />

      </Routes>
    </Suspense>
  );
}