import React from 'react';
import Axios from 'axios';
const getMovieData = async (): Promise<any> => {
  try {
    const response = await Axios.get('https://api.example.com/data');
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const HomePage: React.FC = () => {
  return (
    <div>
    </div>
  );
};

export default HomePage;

