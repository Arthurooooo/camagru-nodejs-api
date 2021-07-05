module.exports = {
    url: "mongodb://localhost:27017/camagru_db"

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  })
  };