import * as Hapi from "@hapi/hapi";
import { RouterPlugin } from "./plugins/router";

const server = Hapi.server({
  port: 17491,
  host: "localhost"
});

export async function startServer() {
  await server.start();

  await server.register([
    RouterPlugin
  ]);

  console.log(`Server running on ${server.info.uri}`);
}
