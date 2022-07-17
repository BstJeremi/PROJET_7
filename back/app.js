const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require ('mongoose')
require('dotenv').config();

const postRoutes = require ('./routes/post');
const userRoutes = require ('./routes/user');

mongoose.connect(process.env.SECRET)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express();

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-auth-token, Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(express.json());
app.use(bodyParser.json());

//Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
