'use strict'

const test = require('tape')
const Server = require('../src/server')

const server = new Server();

test('Server object is valid', t => {
  console.log(server);
  t.ok(server);
})

// test('Root URL should return 200 response', (t) => {
//   api.get('/')
//     .end((err, res) => {
//       if (err) return done(err)
//       expect(res.statusCode).to.equal(200)
//       expect(res.type).to.equal('application/json')
//       expect(err).to.not.exist
//       expect(res.body.data).to.equal('Grittings. Ma nam is Kahlfin.')
//       done()
//     })
// });

// describe('Authentication', () => {
//   it('should return a 401 response on GET /user without credentials', (done) => {
//     api.get('/user')
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.statusCode).to.equal(401)
//         expect(res.body.message).to.equal('Missing authentication')
//         done()
//       })
//   })

//   it('should return a 401 response on GET /user with incorrect credentials', (done) => {
//     api.get('/user')
//       .auth('baduser', 'badpassword')
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.statusCode).to.equal(401)
//         expect(res.body.message).to.equal('Bad username or password')
//         done()
//       })
//   })

//   it('should return an authenticated response on GET /user', (done) => {
//     api.get('/user')
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/json')
//       .auth('testuser', 'testpasswd')
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.statusCode).to.equal(200)
//         done()
//       })
//   })
// })

// describe('Search', () => {
//   it('should return 204 response on GET /search', (done) => {
//     api.get('/search')
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.statusCode).to.equal(204)
//         expect(err).to.not.exist
//         expect(res.body).to.be.empty
//         done()
//       })
//   })

//   it('should return a 401 response on POST /search without credentials', (done) => {
//     api.post('/search')
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.statusCode).to.equal(401)
//         expect(res.body.message).to.equal('Missing authentication')
//         done()
//       })
//   })

//   it('should return a 401 response on POST /search with incorrect credentials', (done) => {
//     api.post('/search')
//       .auth('baduser', 'badpassword')
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.statusCode).to.equal(401)
//         expect(res.body.message).to.equal('Bad username or password')
//         done()
//       })
//   })

//   it('should successfully return search results on POST', (done) => {
//     api.post('/search')
//       .send({ q: 'jack' })
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/json')
//       .auth('testuser', 'testpasswd')
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res).to.exist
//         expect(res.statusCode).to.equal(200)
//         expect(res.body.data.length).to.equal(2)
//         done()
//       })
//   })
// })
