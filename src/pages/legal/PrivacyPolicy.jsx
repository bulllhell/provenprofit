import { Link } from 'react-router-dom'
import { RiArrowLeftLine, RiShieldCheckLine } from 'react-icons/ri'

const SECTIONS = [
  {
    title: '1. Introduction',
    body: [
      'Proven Profit Marketing Agency ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have.',
      'By using our website and services, you agree to the practices described in this policy.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'We collect information you provide directly to us, such as your name, email address, business name, and payment details when you contact us, subscribe to our newsletter, or purchase a service.',
      'We also automatically collect certain technical information when you visit our site, including your IP address, browser type, device information, and pages visited, through cookies and similar technologies.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: [
      'We use the information we collect to deliver our services, process payments, respond to your enquiries, send you updates and marketing communications you have opted into, improve our website, and comply with legal obligations.',
      'We will never sell your personal information to third parties.',
    ],
  },
  {
    title: '4. Payment Processing',
    body: [
      'Payments are processed securely through Flutterwave. We do not store your full card details on our servers. All transactions are encrypted and handled by our payment provider in accordance with industry security standards.',
    ],
  },
  {
    title: '5. Cookies',
    body: [
      'Our website uses cookies to improve your browsing experience, analyse traffic, and remember your preferences. You can control or disable cookies through your browser settings, though some features of the site may not function properly without them.',
    ],
  },
  {
    title: '6. Data Sharing',
    body: [
      'We may share your information with trusted third-party service providers who help us operate our business, such as payment processors, email platforms, and analytics tools. These providers are only given the information necessary to perform their services and are bound to protect it.',
    ],
  },
  {
    title: '7. Data Security',
    body: [
      'We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: '8. Your Rights',
    body: [
      'Depending on your location, you may have the right to access, correct, or delete the personal information we hold about you, and to opt out of marketing communications at any time. To exercise these rights, contact us using the details below.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review it periodically.',
    ],
  },
  {
    title: '10. Contact Us',
    body: [
      'If you have any questions about this Privacy Policy or how we handle your data, contact us at support@provenprofitbrand.com.',
    ],
  },
]

export default function PrivacyPolicy() {
  return <LegalLayout title="Privacy Policy" accent="#7C3AED" icon={RiShieldCheckLine} sections={SECTIONS} />
}

export function LegalLayout({ title, accent, icon: Icon, sections }) {
  return (
    <div className="min-h-screen" style={{ background: '#F8F7FF' }}>
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[240px] rounded-full blur-[90px]"
               style={{ background: accent + '12' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-body mb-8 transition-colors"
                style={{ color: '#6B6880' }}>
            <RiArrowLeftLine className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: accent + '15', border: '1px solid ' + accent + '30' }}>
              <Icon className="w-6 h-6" style={{ color: accent }} />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold" style={{ color: '#1E1B2E' }}>
              {title}
            </h1>
          </div>
          <p className="text-sm font-body" style={{ color: '#6B6880' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl p-6 sm:p-10"
             style={{ background: '#FFFFFF', border: '1px solid #E2D9F3', boxShadow: '0 4px 24px rgba(124,58,237,0.05)' }}>
          {sections.map((section) => (
            <div key={section.title} className="mb-8 last:mb-0">
              <h2 className="font-heading text-lg font-bold mb-3" style={{ color: '#1E1B2E' }}>
                {section.title}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="text-sm font-body leading-relaxed mb-3 last:mb-0" style={{ color: '#6B6880' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}