import express from 'express'
import * as movieController from '../controllers/movie'

const router = express.Router()

router.get('/popular-movies', movieController.getPopularMovies)
router.get('/latest-movies', movieController.getLatestMovies)
router.get('/movie/:id', movieController.getMovieDetailsById)

export default router
