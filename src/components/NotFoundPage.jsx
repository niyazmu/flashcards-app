import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <h1 className="mb-8 mt-16 text-8xl">404 - Page not found</h1>
      <p className="mb-16 text-2xl">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        className="flex items-center font-medium italic underline"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mr-2 h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
            clipRule="evenodd"
          />
        </svg>
        Return to homepage
      </button>
    </div>
  );
}

export default NotFoundPage;
