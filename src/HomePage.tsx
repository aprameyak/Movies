import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);

    const response = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
    
    const movies = response.data.Search;
    const mappedMovies: any[] = [];
    if (movies) {
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const newMovie: any = {};
        newMovie.name = movie.Title;
        newMovie.year = movie.Year;
        newMovie.id = movie.imdbID;
        newMovie.type = movie.Type;
        newMovie.image = movie.Poster;
        mappedMovies.push(newMovie);
      }
    }
    
    navigate(`/search?q=${encodeURIComponent(search)}`, { 
      state: { movies: mappedMovies } 
    });
    
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, sans-serif',

    }}>

      
      <h1 className="search-title" style={{
        color: '#aa8139',
        fontSize: '48px',
        marginBottom: '50px',
        textAlign: 'center',
        fontWeight: 'bold',

      }}>Movie Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a movie..."
          className="search-input"
          style={{
            padding: '15px 20px',
            borderRadius: '25px',
            border: 'none',
            backgroundColor: '#2d2d2d',
            color: 'white',
            fontSize: '16px',
            outline: 'none'
          }}
        />
        <button type="submit" disabled={loading} className="search-btn" style={{
          padding: '15px 30px',
          borderRadius: '25px',
          border: 'none',
          backgroundColor: '#aa8139',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>
      
      
    </div>
  );
};

export default HomePage;

