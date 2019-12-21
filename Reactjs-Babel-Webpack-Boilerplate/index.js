let path = require("path");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

let errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
let evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');

let webpack = require("webpack");
let webpackDevServer = require("webpack-dev-server");

let webpackConfig = require("./webpack.config");
let webpackDevServerOptions = {
  publicPath: "/",
  contentBase: path.join(process.cwd(), "dist"),
  historyApiFallback: true,
  hot: true,
  host: "0.0.0.0",
  allowedHosts: [
    ".repl.it",
    ".repl.co",
    ".repl.run"
  ],
  before: function(app, server) {
    // This lets us fetch source contents from webpack for the error overlay
    app.use(evalSourceMapMiddleware(server));
    // This lets us open files from the runtime error overlay.
    app.use(errorOverlayMiddleware());
  }
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, webpackDevServerOptions);
let webpackCompiler = webpack(webpackConfig);

let app = new webpackDevServer(webpackCompiler, webpackDevServerOptions);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}`));
