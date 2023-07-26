const functions = require("firebase-functions");
const { default: next } = require("next");

const nextjsDistDir = ".next";

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = functions
  .region("asia-northeast1")
  .https.onRequest((req, res) => {
    return nextjsServer.prepare().then(() => nextjsHandle(req, res));
  });
