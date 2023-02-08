const jsonServer = require("json-server");
const server = jsonServer.create();
const db = require("./db.js");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

//setup middlewares
server.use(middlewares);

// mock services
server.get("/feedPosts", (req, res) => {
  const cursor = Number(req.query.cursor);
  const size = Number(req.query.size);
  if (cursor == null) {
    res.sendStatus(400);
    return;
  }

  if (cursor > db.feedPost.length) {
    res.jsonp({ response: [] });
    return;
  }

  // simulates real service delay
  setTimeout(() => {
    res.jsonp({
      response: {
        nextCursor: cursor + size,
        values: db.feedPost.slice(cursor, cursor + size),
      },
    });
  }, Math.floor(Math.random() * 1500) + 1);
});

// connect router
server.use(router);
server.listen(8000, () => {
  console.log("JSON Server is running");
});
