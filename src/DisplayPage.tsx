import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import MovieCard from './MovieCard';

interface Movie {
  name: string;
  year: string;
  id: string;
  type: string;
  image: string;
}

const DisplayPage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const movies: Movie[] = location.state?.movies || [];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Roboto, sans-serif',

      padding: '20px'
    }}>

      
      <button 
        onClick={() => window.history.back()}
        style={{
          color: '#aa8139',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px',
          zIndex: 1,
          position: 'relative'
        }}
      >← Back</button>
      
      <h2 style={{
        color: '#aa8139',
        fontSize: '36px',
        marginBottom: '30px',
        textAlign: 'center',

      }}>Search Results for "{query}"</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',

      }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {movies.length === 0 && (
        <p style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '18px',
          zIndex: 1,
          position: 'relative'
        }}>no matches</p>
      )}
    </div>
  );
};

export default DisplayPage;
