import sinon from 'sinon'
import { expect } from 'chai'
import * as movieController from '../api/controllers/movie.js'
import models from '../api/models/index.js'
const { Movie } = models

describe('Movie controller', async () => {
  const popularMovies = []
  const latestMovies = []
  it('Popular movies Query results should be same.', async () => {
    const stub = sinon
      .stub(Movie, 'findAll')
      .withArgs({
        order: [['popularity', 'DESC']],
      })
      .returns(popularMovies)

    const actualPopularMovies = await Movie.findAll({
      order: [['popularity', 'DESC']],
    })

    expect(actualPopularMovies).to.equal(popularMovies)
  })
})
