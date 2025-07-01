import { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./apwrite.js";
import Footer from "./components/Footer.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
<main className="bg-gradient-to-b from-[##030014] via-[#030014] to-[#030014] text-white min-h-screen">

      <div className="relative z-10">
        <header className="py-12 text-center px-4">
          <img
            src="./hero.png"
            alt="Hero Banner"
            className="mx-auto max-w-xs mb-6"
          />
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Find{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Movies
            </span>{" "}
            You'll Enjoy
          </h1>

          <p className="text-gray-300 mb-6">Without the Hassle</p>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="px-6 md:px-12 mb-12">
            <h2 className="text-2xl font-semibold mb-4">🔥 Trending Movies</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id} className="text-center">
                  <p className="text-sm font-medium mb-2">
                    {index + 1}. {movie.title}
                  </p>
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="rounded-lg w-full shadow-md"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="px-6 md:px-12 mb-20">
          <h2 className="text-2xl font-semibold mb-4">🎬 All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default App;
