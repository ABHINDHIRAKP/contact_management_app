const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDB = require('./config/dbConnection');
const validateToken = require('./middleware/validateTokenHandler');
const validateRefreshToken = require('./middleware/validateRefreshToken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use("/api/contacts", require('./routes/contactRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use("/api/refresh", require('./routes/refreshRoutes'));
app.use(errorHandler);
app.use(validateToken);
app.use(validateRefreshToken);

app.listen(port, () => {
    console.log('server running on port ' + port);
})