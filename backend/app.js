const express = require("express");
const bodyParser = require('body-parser');

const app = express();

// ---------------Autorisation des rêquetes-----------//

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// ---------------Autorisation des rêquetes-----------//

const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/user');
const commentRoute = require('./routes/comments')
const likeRoute = require("./routes/like");
const imageRoute = require ('./routes/images')

app.use(bodyParser.json());

app.use('/posts', postsRoute)
app.use('/user', usersRoute)
app.use('/comment', commentRoute)
app.use("/like", likeRoute);
app.use('/images', imageRoute)
app.use('/uploads', express.static('uploads'))


module.exports = app;












// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.get("/blog", (req, res) => {
//   res.send("hello blog");
// });




