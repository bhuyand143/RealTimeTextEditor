const mongoose = require('mongoose')
const Document = require('./models/Documents')

mongoose.set('strictQuery', true);

const User = require('./models/User');

require('dotenv').config()



const mongourl=process.env.MONGO_CONN_URL

mongoose.connect(mongourl)
  .then(console.log('Connected to Mongo Succesfully!'))
  .catch(error => console.log(error));

const io = require("socket.io")(3001, {
  cors: {
    origin: "https://collab-text.vercel.app/",
    methods: ["GET", "POST"],
  },
})


async function findOrCreateDocument(id, user) {
  if (id == null) return;

  const document = await Document.findOne({ doc_id: id });
  if (document) {
    for (let i of user.files) {
      if (i.equals(document._id))
        return document;
    }
    user.files.push(document);
    await user.save();
    return document;
  }
  const doc = await Document.create({ doc_id: id, data: "",owner:user });
  user.files.push(doc);
  await doc.save();
  await user.save();
  return doc;
}

const userSocketMap = {};
let clients = [];
let docid = "";

function getAllConnectedClients(documentId) {
  const connectedSockets = Array.from(io.sockets.adapter.rooms.get(documentId) || []);
  const validSockets = connectedSockets.filter(socketId => userSocketMap[socketId]);

  return validSockets.map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    };
  });
}

io.on("connection", (socket) => {
  socket.on('get-document', async (documentId, userId) => {
    docid = documentId;
    const user = await User.findById(userId);
    userSocketMap[socket.id] = user.name;
    const docs = await findOrCreateDocument(documentId, user);
    socket.join(documentId);
    clients = getAllConnectedClients(documentId);

    // Broadcast the updated user list to all connected users
    io.to(documentId).emit('updateUser', clients);

    socket.emit('load-document', docs.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findOneAndUpdate({ doc_id: documentId }, { data });
    });
  });

  socket.on('disconnect', () => {
    delete userSocketMap[socket.id];
    clients = getAllConnectedClients(docid);
    io.to(docid).emit('updateUser', clients);
  });
});


