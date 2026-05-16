import { Link } from 'react-router-dom';
import { RiCheckboxCircleLine, RiArrowLeftLine } from 'react-icons/ri';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center max-w-md px-4">
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'rgba(249,115,22,0.15)' }}>
          <RiCheckboxCircleLine className="w-10 h-10 text-orange-500" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-white mb-4">Thank You!</h1>
        <p className="text-light-dim mb-8">We've received your request and will be in touch within 24 hours.</p>
        <Link to="/" className="btn-primary">
          <RiArrowLeftLine className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}