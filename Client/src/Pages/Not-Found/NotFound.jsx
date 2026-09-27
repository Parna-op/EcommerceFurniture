import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, MoveLeft } from 'lucide-react'; 

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="p-4 mb-6 rounded-full bg-amber-100">
        <FileQuestion className="w-16 h-16 text-amber-600" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        404
      </h1>
      
      <h2 className="mt-2 text-2xl font-semibold text-gray-800">
        Page not found
      </h2>

      <p className="max-w-md mt-4 text-gray-500">
        Sorry, we couldn’t find the page you’re looking for. It might have been removed or the link is incorrect.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 px-6 py-3 mt-8 text-sm font-medium text-white transition-all bg-black rounded-lg hover:bg-gray-800 hover:shadow-lg"
      >
        <MoveLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
