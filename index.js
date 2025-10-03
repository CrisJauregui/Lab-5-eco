const express = require("express");
const path = require("path");
const { createServer } = require("http");

const usersRouter = require("./server/routes/users.router");
const productsRouter = require("./server/routes/products.router");
const ordersRouter = require("./server/routes/orders.router");
const postsRouter = require("./server/routes/posts.router");



const PORT = 5050;

const app = express();
const httpServer = createServer(app);


app.use(express.json());


app.use("/app2", express.static(path.join(__dirname, "app2")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.use("/", usersRouter);
app.use("/", productsRouter);
app.use("/", ordersRouter);
app.use("/", postsRouter);



httpServer.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/app2/`)
);