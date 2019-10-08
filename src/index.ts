import { startServer } from "./server";

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

startServer();