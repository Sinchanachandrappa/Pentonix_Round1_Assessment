// server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5000;
const cors = require("cors");

// Route to get items using the controller
let users = [];
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "100mb" }));
console.log(users);

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const TOKEN = authHeader.split(" ")[1];
    jwt.verify(TOKEN, "test", async (err, auth) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: "invalid token!" });
      console.log(auth, "token");
      let userData = users.filter(usr => usr.username == auth.username);
      req.user = userData;
      next();
    });
  } else {
    return res.status(401).json({ message: "you are not authenticated1" });
  }
};

app.post("/api/login", (req, res) => {
  let { username, password } = req.body;
  const TOKEN = jwt.sign({ username }, "test", {
    expiresIn: "1D",
  });
  res.json({ username, TOKEN });
  users.push({ username, password, TOKEN });
  return;
});
app.get("/api/data", verifyToken, (req, res) => {
  let usersdata = [
    { username: "abc1", id: "1", email: "abc1@gmail.com" },
    { username: "abc2", id: "2", email: "abc2@gmail.com" },
    { username: "abc3", id: "3", email: "abc3@gmail.com" },
    { username: "abc4", id: "4", email: "abc4@gmail.com" },
    { username: "abc5", id: "5", email: "abc5@gmail.com" },
    { username: "abc6", id: "6", email: "abc6@gmail.com" },
    { username: "abc7", id: "7", email: "abc7@gmail.com" },
    { username: "abc8", id: "8", email: "abc8@gmail.com" },
    { username: "abc9", id: "9", email: "abc9@gmail.com" },
    { username: "abc10", id: "10", email: "abc10@gmail.com" },
    { username: "abc11", id: "11", email: "abc11@gmail.com" },
    { username: "abc12", id: "12", email: "abc12@gmail.com" },
    { username: "abc13", id: "13", email: "abc13@gmail.com" },
    { username: "abc14", id: "14", email: "abc14@gmail.com" },
    { username: "abc15", id: "15", email: "abc15@gmail.com" },
    { username: "abc16", id: "16", email: "abc16@gmail.com" },
    { username: "abc17", id: "17", email: "abc17@gmail.com" },
    { username: "abc18", id: "18", email: "abc18@gmail.com" },
    { username: "abc19", id: "19", email: "abc19@gmail.com" },
    { username: "abc20", id: "20", email: "abc20@gmail.com" },
  ];
  res.send({ usersdata });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
