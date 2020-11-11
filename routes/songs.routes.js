const express = require("express");
const router = express.Router();
const songs = require("../controllers/songs.controller");
const MongoClient = require("mongodb").MongoClient;

const db_user_password = process.env.DB_USER_PASSWORD;
const databaseURL = process.env.DATABASE_URL.replace(
  "<password>",
  encodeURI(db_user_password)
);

module.exports = (app) => {
  MongoClient.connect(databaseURL, {
    useUnifiedTopology: true,
  }).then((client) => {
    router.get("/", songs.findAll.bind(songs, app, client)); // Uses the bind method of Function's to set 'this' to 'songs' and to pass app and client parameters.

    router.get("/:id", songs.findOne.bind(songs, app, client));

    router.post("/", songs.create.bind(songs, app, client));

    router.put("/:id", songs.updateOne.bind(songs, app, client));

    router.delete("/:id", songs.deleteOne.bind(songs, app, client));

    app.use("/api/songs", router);
    console.log("Connected to Database");
  }).catch;
};
