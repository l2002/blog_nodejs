const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');

const cors = require('cors');
const corsConfig = {
  origin: '*',
  credential: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
app.use(cors(corsConfig));
app.options('', cors(corsConfig));

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom Middleware
app.use(SortMiddleware);

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'fa-solid fa-sort',
          asc: 'fa-solid fa-arrow-down-wide-short',
          desc: 'fa-solid fa-arrow-down-short-wide',
        };

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>`;
      },
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

module.exports = app;
