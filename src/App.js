import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getMovieList, searchMovie } from "./api";
import MovieDetail from './MovieDetail';

const Header = ({ onSearch, isSearching, onReset }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleReset = () => {
    setSearchQuery('');
    onReset();
  };

  return (
    <>
      <h1>
        <marquee>JemJeeqt Movie's</marquee>
      </h1>
      <div className="search-container">
        <input
          value={searchQuery}
          placeholder="Search ur Movies"
          className="Movie-search"
          onChange={({ target }) => handleSearch(target.value)}
        />
        {isSearching && (
          <button 
            onClick={handleReset}
            className="reset-button"
          >
            Back to Home
          </button>
        )}
      </div>
    </>
  );
};

const PopularMovieList = ({ movies }) => {
  return movies.map((movie) => {
    return (
      <div className="wrapper" key={movie.id}>
        <div className="box-area">
          <div className="box">
            <img 
              src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} 
              alt={movie.title} 
            />
            <div className="overlay">
              <div className="overlay-content">
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <Link to={`/movie/${movie.id}`}>View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    const result = await getMovieList();
    setPopularMovies(result);
    setIsSearching(false);
  };

  const handleSearch = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
      setIsSearching(true);
    } else if (q.length === 0) {
      loadPopularMovies();
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <header className="App-header">
                <Header 
                  onSearch={handleSearch} 
                  isSearching={isSearching}
                  onReset={loadPopularMovies}
                />
                <div className="Movie-container">
                  <PopularMovieList movies={popularMovies} />
                </div>
              </header>
            } 
          />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;