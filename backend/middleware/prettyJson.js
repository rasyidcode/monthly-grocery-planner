export function prettyJson(req, res, next) {
  const originalJson = res.json;

  res.json = function (data) {
    const isDev = process.env.NODE_ENV !== "production";

    if (isDev) {
      const formatted = JSON.stringify(data, null, 2);
      res.setHeader("Content-Type", "application/json");
      res.send(formatted);
    } else {
      originalJson.call(this, data);
    }
  };

  next();
}
