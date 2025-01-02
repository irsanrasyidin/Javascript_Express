// Placeholder use case
const execution = require('../../domain/entities/execution');

class PostgresqlUseCase {
    constructor(postgresqlRepository) {
        this.postgresqlRepository = postgresqlRepository;
    }

    async createPostgresql(postgresqlData) {
        // Placeholder creation logic        
        return await this.postgresqlRepository.createPostgresql(postgresqlData);
    }

    async getAllPostgresqls() {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.getAllPostgresqls();
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getAllPostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return  data; 
    }
    
    async getByIdPostgresqls(id) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.getByIdPostgresqls(id);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByIdPostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return  data;
    }

    async getByIdPostgresqlsNoExec(id) {    
        return await this.postgresqlRepository.getByIdPostgresqls(id);
    }

    async getByNamePostgresqls(name) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.getByNamePostgresqls(name);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByNamePostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return  data;
    }

    async getByEmailPostgresqls(email) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.getByEmailPostgresqls(email);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByEmailPostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return data;
    }

    async getByGenderPostgresqls(gender) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.getByGenderPostgresqls(gender);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByGenderPostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return data;
    }

    async updateByIdPostgresqls(newData) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.updateByIdPostgresqls(newData);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "updateByIdPostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return  data;
    }

    async deleteByIdPostgresqls(id) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.deleteByIdPostgresqls(id);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "deleteByIdPostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return  data;
    }

    async deleteAllPostgresqls() {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.postgresqlRepository.deleteAllPostgresqls();
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "deleteAllPostgresqls",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.postgresqlRepository.createExecutionPostgresql(newExecution);
        return  data;
    }
}

module.exports = PostgresqlUseCase;
