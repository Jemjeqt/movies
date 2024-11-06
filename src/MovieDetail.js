import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, ArrowLeft, Video, Heart, Share2 } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-screen">
        <h2>Error loading movie details</h2>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <div className="content-wrapper">
        {/* Back Button Header */}
        <div className="back-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Poster Section */}
          <div className="poster-column">
            <div className="poster-wrapper">
              <img
                src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                  e.target.src = '/placeholder-movie.png';
                }}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="info-column">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-meta-info">
              <div className="rating">
                <Star size={24} fill="#FFD700" stroke="none" className="icon" />
                <span>{movie.vote_average?.toFixed(1)}/10</span>
              </div>
              
              {movie.runtime > 0 && (
                <div className="duration">
                  <Clock size={20} className="icon" />
                  <span>{movie.runtime} minutes</span>
                </div>
              )}
              
              <div className="year">
                <Calendar size={20} className="icon" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>

            {movie.genres?.length > 0 && (
              <div className="genre-list">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-pill">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="action-buttons">
              <button className="watch-btn">
                <Video size={20} />
                Watch Now
              </button>
              <button className="favorite-btn" aria-label="Add to favorites">
                <Heart size={20} />
              </button>
              <button className="share-btn" aria-label="Share movie">
                <Share2 size={20} />
              </button>
            </div>

            {/* Overview Section */}
            <div className="overview-section">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>

            {/* Details Grid */}
            <div className="details-grid">
              <div className="detail-card">
                <h3>Release Info</h3>
                <p>Release Date: {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p>Original Language: {movie.original_language?.toUpperCase()}</p>
              </div>

              <div className="detail-card">
                <h3>Stats</h3>
                <p>Vote Count: {movie.vote_count?.toLocaleString()}</p>
                <p>Popularity: {movie.popularity?.toFixed(1)}</p>
              </div>

              <div className="detail-card">
                <h3>Production</h3>
                <p>Status: {movie.status}</p>
                {movie.budget > 0 && (
                  <p>Budget: ${movie.budget?.toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;