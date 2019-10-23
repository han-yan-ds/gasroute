const PORT = 4000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const routerV1 = require('./routers/routerV1');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/v1', routerV1);


app.listen(PORT, () => `Server is listening on port ${PORT}`);