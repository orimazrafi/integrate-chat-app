const moment = require("moment");
var MongoDB = require("../mongodb/mongodb");
let db;

MongoDB.connectToServer((err, client) => {
  if (err) console.log(err);
  db = MongoDB.getDb();
});

const getUsersFromDb = async () => {
  return await db
    .collection("users")
    .find({})
    .toArray();
};
const deleteUser = async username => {
  return await db.collection("users").deleteOne({ username });
};
const addUser = async (username, room, socket) => {
  return await db.collection("users").insertOne({ username, room, socket });
};
const getMessages = async room => {
  return db
    .collection("messages")
    .find({ room })
    .toArray();
};
const addMessage = async (message, room) => {
  return await db.collection("messages").insertOne({
    ...message,
    room,
    time: moment().format("h:mm a")
  });
};

module.exports = {
  addUser,
  getUsersFromDb,
  deleteUser,
  getMessages,
  addMessage
};
