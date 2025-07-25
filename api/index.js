const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const urlShortnerController = require('./controllers/urls.js');
const handleErrorMiddleware = require('./middlewares/error.js');
const redirectToOriginalUrlByShortId = require('./controllers/redirectToOriginalUrlByShortId.js');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post('/form-sent', urlShortnerController);

app.get('/id/:id', redirectToOriginalUrlByShortId);

app.use(handleErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
