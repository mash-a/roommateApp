const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3004;
const morgan = require('morgan');

const choreRoutes = require('./routes/chores');

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/roommates', choreRoutes);

const server = app.listen(PORT, () => {
  console.log(`RoomMates: Listening on port no. ${PORT}`);
})

module.exports = {
  app,
  server
}
