const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// 获取所有用户
router.get("/", (req, res) => {
  console.log("get all users req:" + JSON.stringify(req.body));
  res.json(users);
});

// 获取单个用户
router.get("/:id", (req, res) => {
  console.log("get single users req body:" + JSON.stringify(req.body));
  console.log("get single users req param:" + JSON.stringify(req.params));
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// 创建新用户
router.post("/", (req, res) => {
  console.log("add single users req body:" + JSON.stringify(req.body));
  console.log("add single users req param:" + JSON.stringify(req.params));
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 更新用户
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// 删除用户
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
