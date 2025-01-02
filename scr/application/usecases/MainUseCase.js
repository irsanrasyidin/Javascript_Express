// Placeholder use case
const execution = require('../../domain/entities/execution')
class MainUseCase {
    constructor(mainRepository, jsonRepository,postgresqlRepository) {
        this.mainRepository = mainRepository;
        this.jsonRepository = jsonRepository;
        this.postgresqlRepository = postgresqlRepository;
    }

    async createMain(mainData) {
        var startDate = new Date();
        var start = performance.now();        
        await await this.jsonRepository.createJson(mainData);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "InsertJson",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
        );
        await this.jsonRepository.createExecutionJson(newExecution);
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        var startDate = new Date();
        var start = performance.now();        
        await this.postgresqlRepository.createPostgresql(mainData);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution2 = new execution(
            "InsertPostgresql",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
        );
        await this.jsonRepository.createExecutionJson(newExecution2);
        await this.postgresqlRepository.createExecutionPostgresql(newExecution2); 
    }

    async getAllMains() {
        return  await this.mainRepository.getAllMains();
    }

    async restart() {
        return  await this.mainRepository.restart();
    }
}

module.exports = MainUseCase;
