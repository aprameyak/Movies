import React, { useState } from 'react';

interface Movie {
  name: string;
  year: string;
  id: string;
  type: string;
  image: string;
  plot?: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [showPlot, setShowPlot] = useState(false);
  const [details, setDetails] = useState<Movie | null>(null);

  const togglePlot = async () => {
    if (!details) {
      const response = await fetch(`https://www.omdbapi.com/?i=${movie.id}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
      const data = await response.json();
      const mappedData = {
        name: data.Title,
        year: data.Year,
        id: data.imdbID,
        type: data.Type,
        image: data.Poster,
        plot: data.Plot
      };
      setDetails(mappedData);
    }
    setShowPlot(!showPlot);
  };

  if (showPlot && details) {
    return (
      <div style={{
        backgroundColor: '#1e1e1e',
        border: '2px solid #2d2d2d',
        borderRadius: '10px',
        padding: '20px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }} onClick={togglePlot}>
        <h3 style={{
          color: '#aa8139',
          fontSize: '20px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>{movie.name}</h3>
        <div style={{
          color: 'white',
          fontSize: '14px',
          lineHeight: '1.4',
          overflow: 'auto',
          flex: 1
        }}>
          <p style={{ marginBottom: '10px' }}><strong>Year:</strong> {movie.year}</p>
          <p style={{ marginBottom: '10px' }}><strong>Type:</strong> {movie.type}</p>
          <p><strong>Plot:</strong> {details.plot || 'loading'}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      border: '2px solid #2d2d2d',
      borderRadius: '10px',
      overflow: 'hidden',
      height: '400px',
      cursor: 'pointer',

    }} onClick={togglePlot}>
      <img 
        src={movie.image !== 'N/A' ? movie.image : 'https://via.placeholder.com/300x400?text=No+Image'} 
        alt={movie.name}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '15px' }}>
        <h3 style={{
          color: '#aa8139',
          fontSize: '16px',
          margin: '0 0 8px 0',
          textAlign: 'center'
        }}>{movie.name}</h3>
        <p style={{
          color: 'white',
          fontSize: '14px',
          margin: '0',
          textAlign: 'center'
        }}>{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
