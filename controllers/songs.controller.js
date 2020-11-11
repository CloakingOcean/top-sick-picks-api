exports.create = (app, client, req, res) => {
  console.log("Calling findAll");
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

exports.findOne = (app, client, req, res) => {
  console.log("Calling findAll");
  return;
};

exports.updateOne = (app, client, req, res) => {};
exports.deleteOne = (app, client, req, res) => {};
