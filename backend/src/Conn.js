const mongoose = require("mongoose");
const Db = process.env.ATLAS_URI;

const { connect, set } = mongoose;

mongoose.connection.on("connected", () => {
  console.log("Connection mongodb: Etablished");
});
mongoose.connection.on("reconnected", () => {
  console.log("Connection mongodb: reset Etablished");
});
mongoose.connection.on("disconnected", () => {
  console.log("Connection mongodb: reset Etablished");
});
mongoose.connection.on("closed", () => {
  console.log("Connection mongodb: closed");
});
mongoose.connection.on("error", (error) => {
  console.log("Connection mongodb:", error);
});

set("debug", true);
set("strictQuery", false);
connect(Db, { useUnifiedTopology: true, useNewUrlParser: true });
