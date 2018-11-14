"use strict";

const test = require("tape");
const Server = require("../src/server");

const server = new Server();
(async () => server.init(true))();

test("Search: /search", async t => {
  const getResponse = await server.simRequest({
    method: "GET",
    url: "/search"
  });

  t.equals(
    getResponse.statusCode,
    204,
    "Returns 204 status code on GET /search"
  );

  t.equals(
    getResponse.result,
    null,
    "Returns no data on GET /search"
  );

  const postNoAuthResponse = await server.simRequest({
    method: "POST",
    url: "/search"
  });

  t.equals(
    postNoAuthResponse.statusCode,
    401,
    "Returns 401 status code on POST /search without credentials"
  );

  t.equals(
    postNoAuthResponse.result.message,
    "Missing authentication",
    "Returns proper error message on POST /search without credentials"
  );

  t.end();
});

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
