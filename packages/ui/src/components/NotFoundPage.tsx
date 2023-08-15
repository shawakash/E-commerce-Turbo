import * as React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-4 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-red-600">404</h1>
          <p className="text-gray-600 mt-2">Page Not Found</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            to={'/admin/signup'}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

