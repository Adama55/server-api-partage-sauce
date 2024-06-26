const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

/** connection à mongoose*/
/**mongodb+srv://Adama55:Moster.q4jzdlf.mongodb.net/ */
mongoose.connect('mongodb+srv://Atlascluster.q4jzdlf.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

app.use("/images", express.static(path.join(__dirname, "images"))); // gerer l'url des fichiers statiques

module.exports = app;
