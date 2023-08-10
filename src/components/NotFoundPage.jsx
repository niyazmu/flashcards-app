import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-8">
      <h1 className="mb-8 mt-16 text-3xl font-semibold 2xl:text-4xl">
        Page not found
      </h1>
      <p className="mb-16">
        Oh, no. The page you are looking for does not exist.
      </p>
      <button
        className="flex rounded-full bg-black px-8 py-4 text-white"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="mr-2 h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        Return to homepage
      </button>
    </div>
  );
}

export default NotFoundPage;
