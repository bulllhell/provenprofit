import { RiRefund2Line } from 'react-icons/ri'
import { LegalLayout } from './PrivacyPolicy'

const SECTIONS = [
  {
    title: '1. Overview',
    body: [
      'At Proven Profit Marketing Agency, we are committed to delivering high-quality work and a positive experience for every client. This Refund Policy explains the circumstances under which refunds may be issued.',
      'Because our services involve dedicated time, skilled labour, and custom work, refunds are handled on a case-by-case basis as described below.',
    ],
  },
  {
    title: '2. Deposits',
    body: [
      'Deposits paid to begin a project cover the initial planning, research, and resource allocation required to start your work. Deposits are generally non-refundable once work has commenced, as the time and effort cannot be recovered.',
    ],
  },
  {
    title: '3. One-Time Projects',
    body: [
      'For one-time projects such as store builds or brand identity packages, refund eligibility depends on the stage of the project.',
      'If you cancel before any work has begun, you may be eligible for a refund of any amount paid beyond the non-refundable deposit. Once work is underway, refunds are calculated based on the portion of work already completed.',
      'No refunds are issued for completed and delivered projects.',
    ],
  },
  {
    title: '4. Monthly Retainer Services',
    body: [
      'Monthly services such as social media management and ongoing marketing are billed at the start of each cycle. You may cancel at any time, and your service will continue until the end of the current paid cycle.',
      'We do not provide partial refunds for unused days within a billing cycle that has already started.',
    ],
  },
  {
    title: '5. Satisfaction and Revisions',
    body: [
      'If you are not satisfied with a deliverable, we encourage you to use the revisions included in your package. We will work with you within the agreed scope to make things right before any refund is considered.',
    ],
  },
  {
    title: '6. Non-Refundable Items',
    body: [
      'Certain costs are non-refundable, including third-party expenses paid on your behalf such as advertising spend, premium themes, plugins, apps, stock assets, and domain or hosting fees.',
    ],
  },
  {
    title: '7. How to Request a Refund',
    body: [
      'To request a refund, contact us at support@provenprofitbrand.com with your name, project details, and the reason for your request. We aim to review and respond to all refund requests within a reasonable timeframe.',
    ],
  },
  {
    title: '8. Chargebacks',
    body: [
      'We ask that you contact us first to resolve any payment concerns before initiating a chargeback with your bank or card provider. Filing a chargeback without contacting us may delay resolution and could affect future service.',
    ],
  },
  {
    title: '9. Contact Us',
    body: [
      'If you have any questions about this Refund Policy, please reach out to us at support@provenprofitbrand.com.',
    ],
  },
]

export default function RefundPolicy() {
  return <LegalLayout title="Refund Policy" accent="#16a34a" icon={RiRefund2Line} sections={SECTIONS} />
}