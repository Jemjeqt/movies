import axios from "axios";

const api_key = process.env.REACT_APP_APIKEY
const baseUrl = process.env.REACT_APP_BASEURL

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${api_key}`)
  return movie.data.results
}

export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${api_key}`)
  return search.data
}