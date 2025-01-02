const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const { initializeJsonDependencies, initializeMainDependencies, initializePostgresqlDependencies } = require('./config/dependencies');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.APP_PORT;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'scr', 'presentation', 'html'));
app.use(express.static(path.join(__dirname, 'scr', 'presentation','assets')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Dependencies
const { jsonController } = initializeJsonDependencies();
const { mainController } = initializeMainDependencies();
const { postgresqlController } = initializePostgresqlDependencies();

//JSON
app.get('/jsons', (req, res) => jsonController.showJsons(req, res));
app.get('/jsonu', (req, res) => jsonController.updateJsonsPage(req, res));
app.get('/jsond', (req, res) => jsonController.deleteJsonsPage(req, res));
app.post('/jsonu', (req, res) => jsonController.updateJsons(req, res));
app.post('/jsond', (req, res) => jsonController.deleteJsons(req, res));

//PostgreSQL
app.get('/pstsqls', (req, res) => postgresqlController.showPostgresqls(req, res));
app.get('/pstsqlu', (req, res) => postgresqlController.updatePostgresqlsPage(req, res));
app.get('/pstsqld', (req, res) => postgresqlController.deletePostgresqlsPage(req, res));
app.post('/pstsqlu', (req, res) => postgresqlController.updatePostgresqls(req, res));
app.post('/pstsqld', (req, res) => postgresqlController.deletePostgresqls(req, res));

//main
app.get('/', (req, res) => mainController.showMains(req, res));
app.post('/upload', upload.single('fileUpload'), (req, res) => mainController.createJSON(req, res));
app.post('/restart', (req, res) => mainController.restart(req, res));

// Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
