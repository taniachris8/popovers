const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const createConfig = require("../webpack.config");
const config = createConfig({ development: true });

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    port: 9000,
    host: "localhost",
    open: false,
  },
  compiler,
);

(async () => {
  try {
    await server.start();
    if (process.send) process.send("ok");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

process.on("SIGINT", async () => {
  await server.stop();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await server.stop();
  process.exit(0);
});
