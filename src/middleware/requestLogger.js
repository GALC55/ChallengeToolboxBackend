// Simple request logger middleware
module.exports = function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const ts = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;
    const ip = req.ip || (req.connection && req.connection.remoteAddress);
    console.log(`[${ts}] ${method} ${url} ${status} - ${duration}ms - ${ip}`);
  });
  next();
};
