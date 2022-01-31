import axios from 'axios'
import models from '../models/index.js'
import { successResponse, errorResponse } from '../helpers/index.js'
import { GET_MOVIES, getMovieDetailsUrl } from '../helpers/constants.js'
const { Movie } = models

export const getPopularMovies = async (req, res) => {
  try {
    const popularMovies = await Movie.findAll({
      order: [['popularity', 'DESC']],
    })
    return successResponse(req, res, popularMovies)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const getLatestMovies = async (req, res) => {
  try {
    const latestMovies = await Movie.findAll({
      order: [['release_date', 'DESC']],
    })
    return successResponse(req, res, latestMovies)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const getMovieDetailsById = async (req, res) => {
  try {
    const { id } = req.params

    const movie = await Movie.findByPk(id)

    if (!movie) {
      throw new Error('Movie not found')
    }

    axios
      .get(getMovieDetailsUrl(id))
      .then(async (response) => {
        const movie = response?.data ?? {}

        return successResponse(req, res, movie)
      })
      .catch((error) => {
        console.log('Error ', error)
      })
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}
