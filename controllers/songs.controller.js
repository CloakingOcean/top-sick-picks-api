const ObjectID = require("mongodb").ObjectID;

exports.create = (app, client, req, res) => {
  console.log("Calling create");
  const db = client.db("top-sick-picks");
  const songsCollection = db.collection("songs");

  songsCollection
    .insertOne(req.body)
    .then((result) => {
      res.status(200).send("Successfully created song!");
    })
    .catch((error) => res.status(400).send(error));
  return;
};

exports.findAll = (app, client, req, res) => {
  console.log("Calling findAll");
  const db = client.db("top-sick-picks");
  const songsCollection = db.collection("songs");

  songsCollection
    .find()
    .toArray()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
      res.status(400).send(err);
    });

  return;
};

//TODO: FIX!!!!!
exports.findOne = (app, client, req, res) => {
  const db = client.db("top-sick-picks");
  const songsCollection = db.collection("songs");

  songsCollection
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((results) => {
      console.log(results);
      res.status(200).send(results);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
      res.status(400).send(err);
    });
  return;
};

exports.updateOne = (app, client, req, res) => {
  const db = client.db("top-sick-picks");
  const songsCollection = db.collection("songs");

  songsCollection
    .findOneAndUpdate(
      {
        _id: new ObjectID(req.params.id),
      },
      {
        $set: {
          name: req.body.name,
          artists: req.body.artists,
          ["youtube-link"]: req.body["youtube-link"],
          rating: req.body.rating,
          review: req.body.review,
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).send("Successfully updated song!");
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(err);
    });
};
exports.deleteOne = (app, client, req, res) => {
  const db = client.db("top-sick-picks");
  const songsCollection = db.collection("songs");

  songsCollection
    .deleteOne({
      _id: new ObjectID(req.params.id),
    })
    .then((result) => {
      res.send(`Successfully Deleted Song!`);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(err);
    });
};
