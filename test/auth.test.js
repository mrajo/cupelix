"use strict";

const test = require("tape");
const Server = require("../src/server");

const server = new Server();
(async () => server.init(true))();

test("Authentication: /user", async t => {
  t.plan(8);

  const noAuthResponse = await server.simRequest({
    method: "GET",
    url: "/user"
  });

  t.equals(
    noAuthResponse.statusCode,
    401,
    "Returns 401 status code with no credentials"
  );
  t.equals(
    noAuthResponse.result.message,
    "Missing authentication",
    "Returns proper error message with no credentials"
  );

  const goodCredentials = {
    id: 1,
    name: "test"
  };
  const goodAuthResponse = await server.simRequest({
    method: "GET",
    url: "/user",
    credentials: goodCredentials
  });

  t.equals(
    goodAuthResponse.statusCode,
    200,
    "Returns 200 status code with valid credentials"
  );
  t.ok(
    goodAuthResponse.result.data,
    "Returns data object with valid credentials"
  );
  t.true(
    goodAuthResponse.result.data.isAuthenticated,
    "Response is authenticated with valid credentials"
  );
  t.deepEqual(
    goodAuthResponse.result.data.credentials,
    goodCredentials,
    "Credentials match with valid credentials"
  );

  const badAuthResponse = await server.simRequest({
    method: "GET",
    url: "/user",
    headers: {
      Authorization: "Basic dGVzdHVzZXI6d3JvbmdwYXNzd29yZA=="
    }
  });

  t.equals(
    badAuthResponse.statusCode,
    401,
    "Returns 401 status code with bad credentials"
  );
  t.equals(
    badAuthResponse.result.message,
    "Bad username or password",
    "Returns proper error message with bad credentials"
  );
});
