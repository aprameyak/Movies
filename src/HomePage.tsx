import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
      
      if (response.data.Response === 'True') {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`, { 
          state: { movies: response.data.Search } 
        });
      } else {
        setError('No results found. Please try a different search term.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
        />
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default HomePage;

