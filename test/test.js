'use strict'

const expect = require('chai').expect
const supertest = require('supertest')

const api = supertest('http://localhost:5555')

describe('Hello', () => {
  it('should return 200 response', (done) => {
    api.get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(err).to.not.exist
        expect(res.body.data).to.equal('Grittings. Ma nam is Kahlfin.')
        done()
      })
  })
})

describe('Search', () => {
  it('should return 204 response on GET', (done) => {
    api.get('/search')
      .expect(204)
      .end((err, res) => {
        expect(err).to.not.exist
        expect(res.body).to.be.empty
        done()
      })
  })

  it('should successfully return search results on POST', (done) => {
    api.post('/search')
      .send({ q: 'jack' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res).to.exist
        expect(res.body.data.length).to.equal(2)
        done()
      })
  })
})
