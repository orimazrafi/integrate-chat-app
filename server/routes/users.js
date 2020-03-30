const { app } = require("../../server");
const { getUsersFromDb } = require("../utils/utils");

app.get("/users", async (req, res) => {
  let users = [];
  try {
    users = await getUsersFromDb();
  } catch (ex) {
    throw new Eror(ex.message);
  }
  res.status(200).send(users);
});
