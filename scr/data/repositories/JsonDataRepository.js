// Import the JsonRepository class
const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

const JsonRepository = require('../../domain/repositories/JsonRepository');
const json = require('../../domain/entities/data');
const execution = require('../../domain/entities/execution');
const { Console } = require('console');

class JsonDataRepository extends JsonRepository {
    constructor() {
        super();
        this.jsons = [];
    }

    async createJson(jsonData) {
        try {
            await writeJsonToFile(jsonData); 
            return null;
        } catch (error) {
            throw error;
        }
    }

    async getAllJsons() {
        try {
            return await readJsonFile();
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    
    }

    async getByIdJsons(id) {
        const filterData = [];
        try {
            const data = await readJsonFile();
            data.forEach(item => {
                if (item.id == id){
                    filterData.push(item);
                }
            });
            return filterData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    }

    async getByNameJsons(name) {
        const filterData = [];
        const searchTerm = name.toLowerCase();
        try {
            const data = await readJsonFile();
            data.forEach(item => {
                if (item.first_name.toLowerCase().includes(searchTerm) || item.last_name.toLowerCase().includes(searchTerm)) {
                    filterData.push(item);
                }
            });
            return filterData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    }

    async getByEmailJsons(email) {
        const filterData = [];
        const searchTerm = email.toLowerCase();
        try {
            const data = await readJsonFile();
            data.forEach(item => {
                if (item.email.toLowerCase().includes(searchTerm)) {
                    filterData.push(item);
                }
            });
            return filterData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    }

    async getByGenderJsons(gender) {
        const filterData = [];
        const searchTerm = gender.toLowerCase();
        try {
            const data = await readJsonFile();
            data.forEach(item => {
                if (item.gender.toLowerCase() == searchTerm){
                    filterData.push(item);
                }
            });
            return filterData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    }

    async updateByIdJsons(newData) {
        const filterData = [];
        try {
            const data = await readJsonFile();
            data.forEach(item => {
                if (item.id == newData.id){
                    filterData.push(newData);
                } else {
                    filterData.push(item);
                }
            });
            writeJsonToFile(filterData)
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    }

    async deleteByIdJsons(id) {
        const filterData = [];
        try {
            const data = await readJsonFile();
            data.forEach(item => {
                if (item.id == id){
                } else {
                    filterData.push(item);
                }
            });
            writeJsonToFile(filterData)
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    }

    async deleteAllJsons() {
        try {
            writeJsonToFile([])
        } catch (error) {
            console.error('Error reading JSON file:', error);
            throw error;
        }
    }

    async createExecutionJson(jsonData) {
        let posisi = 0;
        let executionObjects =[];
        let dataExecution = [];
        try {
            const listData =  await readJsonFile2();
            if (Array.isArray(listData) && listData.length > 0) {
                executionObjects = listData.map(entry => {
                    return new execution(entry.nama, entry.masuk, entry.keluar, entry.duration, entry.coba);
                });
                for (let index = 0; index < executionObjects.length; index++) {
                    if(executionObjects[index].nama == jsonData.nama){
                        if (posisi == 0){
                            posisi = index + 1;
                            jsonData.coba = executionObjects[index].coba + 1;
                        } else {
                            posisi++
                            jsonData.coba = executionObjects[index].coba + 1;
                        }
                    }                
                }
                if (jsonData.coba==31){
                    for (let index = posisi-1; index > posisi-30; index--) {
                        executionObjects[index].coba--
                    }
                    jsonData.coba = 30
                    executionObjects.splice(posisi - 30 , 1);
                    executionObjects.splice(posisi - 1 , 0,jsonData);
                    await writeJsonToFile2(executionObjects);
                }else{
                    if (posisi == 0){
                        jsonData.coba = 1;
                        executionObjects.push(jsonData)
                        //console.log(executionObjects)
                        await writeJsonToFile2(executionObjects);
                    }else{
                        executionObjects.splice(posisi,0,jsonData);
                        await writeJsonToFile2(executionObjects);
                    }
                }
                
                
            } else if(!Array.isArray(listData)&&(listData.nama == jsonData.nama)){
                jsonData.coba = listData.coba + 1;
                dataExecution.push(listData)
                dataExecution.push(jsonData)
                await writeJsonToFile2(dataExecution)

            }else if(!Array.isArray(listData)){
                jsonData.coba++
                dataExecution.push(listData)
                dataExecution.push(jsonData)
                await writeJsonToFile2(dataExecution);
            }else{
                jsonData.coba++
                await writeJsonToFile2(jsonData);
            }
            
            
        } catch (error) {
            throw error;
        }
        

    }
}

async function writeJsonToFile(mainData) {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(mainData, null, 6);
        const filePath = path.join(__dirname, '..', 'file','output.json');

        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                reject(err);
            } else {
                //console.log('JSON file created successfully.');
                resolve();
            }
        });
    });
}

async function readJsonFile() {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path.join(__dirname, '..', 'file', 'output.json'), { encoding: 'utf8' });
        const parser = JSONStream.parse('*');
        const dataList = [];

        parser.on('data', (jsonObj) => {
            try {
                const dataObj = new json(jsonObj.id, jsonObj.first_name, jsonObj.last_name, jsonObj.email, jsonObj.gender, jsonObj.avatar);
                dataList.push(dataObj);
            } catch (error) {
                console.error('Error creating data object:', error);
            }
        });

        parser.on('error', (err) => {
            console.error('Error parsing JSON stream:', err);
            reject(err);
        });

        parser.on('end', () => {
            //console.log('JSON parsing complete.');
            resolve(dataList);
        });

        stream.pipe(parser);
    });
}

async function writeJsonToFile2(mainData) {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(mainData, null, 5);
        const filePath = path.join(__dirname, '..', 'file','execution.json');

        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                reject(err);
            } else {
                //console.log('JSON file created successfully.');
                resolve();
            }
        });
    });
}

async function readJsonFile2() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '..', 'file', 'execution.json'), 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                reject(err);
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                reject(error);
            }
        });
    });
}

module.exports = JsonDataRepository;
