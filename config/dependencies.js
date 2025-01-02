// dependencies.js
const { configDb } = require('./db');

const JsonDataRepository = require('../scr/data/repositories/JsonDataRepository');
const JsonUseCase = require('../scr/application/usecases/JsonUseCase');
const JsonController = require('../scr/application/controllers/JsonController');

const MainDataRepository = require('../scr/data/repositories/MainDataRepository');
const MainUseCase = require('../scr/application/usecases/MainUseCase');
const MainController = require('../scr/application/controllers/MainController');

const PostgresqlDataRepository = require('../scr/data/repositories/PostgresqlDataRepository');
const PostgresqlUseCase = require('../scr/application/usecases/PostgreUseCase');
const PostgresqlController = require('../scr/application/controllers/PostgreController');

function initializeJsonDependencies() {
    const jsonRepository = new JsonDataRepository();
    const jsonUseCase = new JsonUseCase(jsonRepository);
    const jsonController = new JsonController(jsonUseCase);

    return {
        jsonRepository,
        jsonUseCase,
        jsonController
    };
}

function initializePostgresqlDependencies() {
    const postgresqlRepository = new PostgresqlDataRepository(configDb());
    const postgresqlUseCase = new PostgresqlUseCase(postgresqlRepository);
    const postgresqlController = new PostgresqlController(postgresqlUseCase);

    return {
        postgresqlRepository,
        postgresqlUseCase,
        postgresqlController
    };
}

function initializeMainDependencies() {
    const mainRepository = new MainDataRepository(configDb());
    const jsonRepository = new JsonDataRepository();
    const postgresqlRepository = new PostgresqlDataRepository(configDb());
    const mainUseCase = new MainUseCase(mainRepository, jsonRepository, postgresqlRepository);
    const mainController = new MainController(mainUseCase);

    return {
        mainRepository,
        mainUseCase,
        mainController
    };
}

module.exports = {
    initializeJsonDependencies,
    initializePostgresqlDependencies,
    initializeMainDependencies
};
