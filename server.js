const express = require('express');
const app = express();

app.use(express.static(__dirname + `/public`)) // TODO: NEST IN A PUBLIC DIR

app.listen(3000,()=>console.log('server on'))