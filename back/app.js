const express = require('express');
const path = require('path');
require('dotenv').config();
const postRoutes = require ('./routes/post');
const userRoutes = require ('./routes/user');
const commentRoutes = require ('./routes/comment')
const app = express();

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

//Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
