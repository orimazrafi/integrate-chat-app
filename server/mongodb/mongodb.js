const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

let _db;

module.exports = {
  connectToServer: callback => {
    MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, function(
      err,
      client
    ) {
      _db = client.db("chat-app");
      console.log("connected to ModoDB");
      return callback(err);
    });
  },

  getDb: function() {
    return _db;
  }
};
