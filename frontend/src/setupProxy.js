const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/websocket", {
      target: "http://localhost:5000",
      ws: true,
    })
  );
  app.use(
    proxy.createProxyMiddleware("/api", {
      target: "http://localhost:5000",
    })
  );
};
