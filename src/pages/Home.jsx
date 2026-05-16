import { lazy, Suspense } from 'react';
import Hero from '../components/home/Hero';

// ── Lazy load below-the-fold sections ─────────────────────
const TrustBar       = lazy(() => import('../components/home/TrustBar'));
const Services       = lazy(() => import('../components/home/Services'));
const Packages       = lazy(() => import('../components/home/Packages'));
const VideoReviews   = lazy(() => import('../components/home/VideoReviews'));
const AboutCEO       = lazy(() => import('../components/home/AboutCEO'));
const FAQ            = lazy(() => import('../components/home/FAQ'));

// ── Optimized section skeleton loader (faster) ────────────
const SectionSkeleton = () => (
  <div className="py-16 sm:py-20 flex items-center justify-center">
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-orange-500/30 animate-pulse"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      {/* ─ HERO: Above the fold, NOT lazy ─ */}
      <Hero />

      {/* ─ TRUST BAR: Social proof ─ */}
      <Suspense fallback={<SectionSkeleton />}>
        <TrustBar />
      </Suspense>

      {/* ─ SERVICES: What we offer ─ */}
      <Suspense fallback={<SectionSkeleton />}>
        <Services />
      </Suspense>

      {/* ─ PACKAGES: Pricing & plans ─ */}
      <Suspense fallback={<SectionSkeleton />}>
        <Packages />
      </Suspense>

      {/* ─ VIDEO REVIEWS: Social proof from clients ─ */}
      <Suspense fallback={<SectionSkeleton />}>
        <VideoReviews />
      </Suspense>

      {/* ─ ABOUT CEO: Build trust & credibility ─ */}
      <Suspense fallback={<SectionSkeleton />}>
        <AboutCEO />
      </Suspense>

      {/* ─ FAQ: Answer common questions ─ */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>
    </>
  );
}