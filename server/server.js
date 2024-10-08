require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// 中间件，用于解析 JSON 请求体
app.use(
  express.json(),
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

// 示例路由
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 引入用户路由
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// 错误处理中间件
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

// 提供静态文件
app.use(express.static(path.join(__dirname, "../client/build")));
// 通配符路由，处理所有非 API 请求，返回 React 的 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
