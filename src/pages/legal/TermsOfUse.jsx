import { RiFileTextLine } from 'react-icons/ri'
import { LegalLayout } from './PrivacyPolicy'

const SECTIONS = [
  {
    title: '1. Agreement to Terms',
    body: [
      'These Terms of Use govern your access to and use of the website and services provided by Proven Profit Marketing Agency ("we", "us", "our"). By accessing our site or engaging our services, you agree to be bound by these terms. If you do not agree, please do not use our services.',
    ],
  },
  {
    title: '2. Our Services',
    body: [
      'We provide digital marketing services including but not limited to Shopify and WooCommerce store design, eCommerce management, social media management, paid advertising, branding, SEO, and email marketing.',
      'The specific scope, deliverables, and timeline for any project will be agreed upon before work begins.',
    ],
  },
  {
    title: '3. Client Responsibilities',
    body: [
      'To deliver our services effectively, we rely on you to provide accurate information, timely feedback, and any materials or access required for the project. Delays in providing these may affect agreed timelines.',
      'You are responsible for ensuring that any content, logos, or materials you provide to us do not infringe on the rights of any third party.',
    ],
  },
  {
    title: '4. Payment Terms',
    body: [
      'Payment terms are agreed upon at the start of each project. For one-time projects, payment is typically split into an upfront deposit and a final balance on completion. Monthly retainer services are billed at the start of each billing cycle.',
      'All payments are processed securely through Flutterwave. Services commence once payment or the agreed deposit has been received.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      'Upon full payment, ownership of the final deliverables created specifically for your project transfers to you. We retain the right to display completed work in our portfolio and marketing materials unless otherwise agreed in writing.',
      'Any third-party tools, themes, plugins, or assets used in your project remain subject to their respective licenses.',
    ],
  },
  {
    title: '6. Revisions and Scope',
    body: [
      'Each package includes a defined number of revisions. Requests that fall outside the originally agreed scope may incur additional charges, which will be communicated and agreed before any extra work is carried out.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    body: [
      'We deliver our services with professional care and skill. However, we do not guarantee specific business results such as sales figures, traffic levels, or rankings, as these depend on many factors outside our control.',
      'To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential losses arising from the use of our services.',
    ],
  },
  {
    title: '8. Termination',
    body: [
      'Either party may terminate an ongoing engagement with reasonable written notice. Any work completed up to the termination date remains payable. Monthly services can be cancelled at any time and will end at the close of the current billing cycle.',
    ],
  },
  {
    title: '9. Third-Party Platforms',
    body: [
      'Our services often involve third-party platforms such as Shopify, Meta, Google, and Klaviyo. We are not responsible for changes, outages, or policy decisions made by these platforms that may affect your project.',
    ],
  },
  {
    title: '10. Changes to These Terms',
    body: [
      'We may update these Terms of Use from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.',
    ],
  },
  {
    title: '11. Contact Us',
    body: [
      'For any questions about these Terms of Use, contact us at support@provenprofitbrand.com.',
    ],
  },
]

export default function TermsOfUse() {
  return <LegalLayout title="Terms of Use" accent="#F97316" icon={RiFileTextLine} sections={SECTIONS} />
}