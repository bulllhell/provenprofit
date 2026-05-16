import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center px-4">
        <div className="font-heading text-[10rem] font-extrabold text-gradient leading-none opacity-20 select-none">
          404
        </div>
        <h1 className="font-heading text-3xl font-bold text-white -mt-8 mb-4">Page Not Found</h1>
        <p className="text-light-dim mb-8">This page doesn't exist or was moved.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}