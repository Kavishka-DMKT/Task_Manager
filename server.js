const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

app.use('/api/todos', require('./routes/todo.routes'));

mongoose
  .connect('mongodb://todoUser:todo123@ac-8tphk4u-shard-00-00.hzzesuf.mongodb.net:27017,ac-8tphk4u-shard-00-01.hzzesuf.mongodb.net:27017,ac-8tphk4u-shard-00-02.hzzesuf.mongodb.net:27017/?ssl=true&replicaSet=atlas-v98hwi-shard-0&authSource=admin&appName=TodoCluster')
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});  