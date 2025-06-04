import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-accenture-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-accenture-purple mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-accenture-gray-900 mb-4">Page not found</h2>
        <p className="text-accenture-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button>
            <Home className="mr-2 h-5 w-5" />
            Return home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;