import axios from 'axios'
import { GET_MOVIES } from '../helpers/constants'
import models from '../models'

const { Movie } = models

export const getMovies = async () => {
  try {
    axios
      .get(GET_MOVIES)
      .then(async (response) => {
        const movies = response?.data?.results ?? []

        const formattedMovies = movies.map((item) => {
          const {
            id,
            title,
            release_date,
            popularity,
            vote_average,
            poster_path,
          } = item
          return {
            id,
            title,
            release_date,
            popularity,
            vote_average,
            poster_path,
          }
        })

        await Movie.destroy({
          where: {},
          truncate: true,
        })

        await Movie.bulkCreate(formattedMovies)
      })
      .catch((error) => {
        console.log('Error ', error)
      })
  } catch (error) {
    console.log('Error ', error)
  }
}
