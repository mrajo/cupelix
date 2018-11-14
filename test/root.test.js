"use strict";

const test = require("tape");
const Server = require("../src/server");
const pkg = require("../package.json");

(async () => {
  const server = new Server();
  await server.init(true);

  test("GET /", async t => {
    t.plan(3);

    t.ok(server, "Server object is valid");

    const response = await server.simRequest({
      method: "GET",
      url: "/"
    });

    t.equals(response.statusCode, 200, "Status code should be 200");
    t.deepEqual(
      response.result,
      { data: `${pkg.name} v${pkg.version}` },
      "Return data should be correct"
    );
  });
})();
