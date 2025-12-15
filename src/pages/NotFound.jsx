import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-base-100 p-4">
      <h1 className="text-9xl font-extrabold text-secondary mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-base-200">Oops! Page not found</h2>
      <p className="text-center text-lg md:text-xl text-base-200 mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="btn btn-secondary px-6 py-3 text-lg font-semibold hover:bg-primary hover:text-secondary transition-colors"
      >
        Go Back Home
      </Link>
      <div className="mt-8">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="Not Found Illustration"
          className="w-64 md:w-96 mx-auto"
        />
      </div>
    </div>
  );
}
