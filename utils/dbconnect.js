const mongoose = require("mongoose");
const db_url = process.env.DB_URI;

const connectDatabase = () => {
  console.log(process.env.DB_URI);
  mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
       
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
