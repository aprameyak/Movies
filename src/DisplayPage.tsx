import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import MovieCard from './MovieCard';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const DisplayPage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const movies: Movie[] = location.state?.movies || [];

  return (
    <div>
      <h2>Search Results for: "{query}"</h2>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <p>No movies found. Try a different search term.</p>
      )}
    </div>
  );
};

export default DisplayPage;
