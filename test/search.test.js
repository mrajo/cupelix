"use strict";

const test = require("tape");
const Server = require("../src/server");

(async () => {
  const server = new Server();
  await server.init(true);

  test("GET /search", async t => {
    t.plan(2);

    const getResponse = await server.simRequest({
      method: "GET",
      url: "/search"
    });

    t.equals(
      getResponse.statusCode,
      204,
      "Returns 204 status code on GET /search"
    );

    t.equals(getResponse.result, null, "Returns no data on GET /search");
  });

  test("POST /search (no authentication)", async t => {
    t.plan(2);

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
  });

  test("POST /search (bad authentication)", async t => {
    t.plan(2);

    const postBadAuthResponse = await server.simRequest({
      method: "POST",
      url: "/search",
      headers: {
        Authorization: "Basic dGVzdHVzZXI6d3JvbmdwYXNzd29yZA=="
      }
    });

    t.equals(
      postBadAuthResponse.statusCode,
      401,
      "Returns 401 status code on POST /search with incorrect credentials"
    );

    t.equals(
      postBadAuthResponse.result.message,
      "Bad username or password",
      "Returns proper error message on POST /search with incorrect credentials"
    );
  });

  test("POST /search (authenticated)", async t => {
    t.plan(3);

    const postGoodAuthResponse = await server.simRequest({
      method: "POST",
      url: "/search",
      credentials: {
        id: 1,
        name: "testuser"
      },
      payload: {
        q: "jack"
      }
    });

    t.equals(
      postGoodAuthResponse.statusCode,
      200,
      "Returns 200 status code with valid credentials"
    );
    t.ok(
      postGoodAuthResponse.result.data,
      "Returns data object with valid credentials"
    );
    t.equal(
      postGoodAuthResponse.result.data.length,
      2,
      "Response contains proper number of search results"
    );
  });
})();
