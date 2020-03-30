const { io } = require("../../server");

const {
  addUser,
  getUsersFromDb,
  deleteUser,
  getMessages,
  addMessage
} = require("../utils/utils");
const moment = require("moment");

io.on("connection", socket => {
  socket.on("joinCredentail", async ({ username, room }) => {
    await addUser(username, room, socket.id);
    let users = await getUsersFromDb();
    socket.join(room);
    io.emit("getUsers", users);
    const messages = await getMessages(room);
    io.to(room).emit("getInitialMessage", messages);

    socket.on("leaveChat", async username => {
      await deleteUser(username);
      users = await getUsersFromDb();
      socket.emit("goBack");
      socket.broadcast.to(room).emit("leaveChat", { users, username });
    });

    socket.on("joinChat", username => {
      socket.broadcast.to(room).emit("joinChat", username);
    });

    socket.on("getUsers", async () => {
      const users = await getUsersFromDb();
      socket.emit("getUsers", users);
    });

    socket.on("typing", username => {
      socket.broadcast.to(room).emit("typing", username);
    });
    socket.on("message", async message => {
      await addMessage(message, room);

      io.to(room).emit("message", {
        ...message,
        time: moment().format("h:mm a")
      });
    });
    socket.on("stop-typing", () => {
      socket.broadcast.to(room).emit("stop-typing", { username: "" });
    });
  });
});
