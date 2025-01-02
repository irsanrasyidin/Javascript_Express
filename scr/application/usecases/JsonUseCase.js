// Placeholder use case
const execution = require('../../domain/entities/execution');

class JsonUseCase {
    constructor(jsonRepository) {
        this.jsonRepository = jsonRepository;
    }

    async createJson(jsonData) {
        // Placeholder creation logic
        return await this.jsonRepository.createJson(jsonData);
    }

    async getAllJsons() {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.jsonRepository.getAllJsons();
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getAllJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
             );
        // console.log(newExecution);
        await this.jsonRepository.createExecutionJson(newExecution);        
        return data;
    }
    
    async getByIdJsons(id) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.jsonRepository.getByIdJsons(id);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByIdJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        await this.jsonRepository.createExecutionJson(newExecution);
        return data;
    }

    async getByNameJsons(name) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  this.jsonRepository.getByNameJsons(name);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByNameJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        
            await this.jsonRepository.createExecutionJson(newExecution);
        
        return data;
    }

    async getByEmailJsons(email) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.jsonRepository.getByEmailJsons(email);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByEmailJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        
            await this.jsonRepository.createExecutionJson(newExecution);
        
        return data;
    }

    async getByGenderJsons(gender) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.jsonRepository.getByGenderJsons(gender);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "getByGenderJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        
            await this.jsonRepository.createExecutionJson(newExecution);
        return data;
    }

    async updateByIdJsons(newData) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.jsonRepository.updateByIdJsons(newData);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "updateByIdJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        
            await this.jsonRepository.createExecutionJson(newExecution);
        return  data;
    }

    async deleteByIdJsons(id) {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.jsonRepository.deleteByIdJsons(id);
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "deleteByIdJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        
            await this.jsonRepository.createExecutionJson(newExecution);
        return  data;
    }

    async deleteAllJsons() {
        // Placeholder retrieval logic
        var startDate = new Date();
        var start = performance.now();        
        const data =  await this.jsonRepository.deleteAllJsons();
        var endDate = new Date();
        var end = performance.now();        

        const newExecution = new execution(
            "deleteAllJsons",
            [startDate.getHours(), startDate.getMinutes() + 1, startDate.getSeconds()].join(':'),
            [endDate.getHours(), endDate.getMinutes() + 1, endDate.getSeconds()].join(':'),
            (end - start).toFixed(3),
            0
            );
        
            await this.jsonRepository.createExecutionJson(newExecution);
        return  data;
    }
}

module.exports = JsonUseCase;
