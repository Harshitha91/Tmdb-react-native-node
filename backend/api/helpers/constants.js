import config from '../config/config.js'
const { baseUrl, apiKey } = config
export const GET_MOVIES = baseUrl + '/discover/movie?api_key=' + apiKey

export const getMovieDetailsUrl = (id) => {
  return baseUrl + '/movie/' + id + '?api_key=' + apiKey
}
