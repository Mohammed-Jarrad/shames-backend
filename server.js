const express = require("express");
const cors = require("cors");

require("dotenv").config();

// setup
const app = express();
app.use(cors());

// database connection

// Routes

// run the server
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
	console.log(`Server Running on port ${PORT || 5000}`);
});
