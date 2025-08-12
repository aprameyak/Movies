import React, { useState } from 'react';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [showPlot, setShowPlot] = useState(false);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  const togglePlot = async () => {
    if (!movieDetails) {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }
    setShowPlot(!showPlot);
  };

  return (
    <div>
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'} 
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button onClick={togglePlot}>
        {showPlot ? 'Hide Plot' : 'Show Plot'}
      </button>
      {showPlot && (
        <div>
          <p>{movieDetails?.Plot || 'Loading plot...'}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
