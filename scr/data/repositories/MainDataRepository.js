// Import the MainRepository class
const MainRepository = require('../../domain/repositories/MainRepository');
const data = require('../../domain/entities/data');
const execution = require('../../domain/entities/execution');
const fs = require('fs');
const path = require('path');
const { json } = require('body-parser');
const JSONStream = require('JSONStream');
const { Console } = require('console');

class MainDataRepository extends MainRepository {
    constructor(pool) {
        super();
        this.pool = pool;
    }

    async createMain(mainData) {
        const jsonString = JSON.stringify(mainData, null, 6); 
        const filePath = path.join(__dirname, '..', 'file','output.json');

        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return err;
            } else {
                console.log('JSON file created successfully.');
                return null;
            }
        });
    }

    async getAllMains() {
        const jsonData = await readJsonFile();
        const postgreData = await this.getAllPostgreSql();
        const combinedData = jsonData.concat(postgreData);
        combinedData.sort((a, b) => {
            if (a.nama !== b.nama) {
              return a.nama.localeCompare(b.nama); 
            } else {
              return a.coba - b.coba; 
            }
        });
        const uniqueMap = new Map();
        const uniqueCombinedData = [];

        for (const item of combinedData) {
        const key = `${item.nama}-${item.coba}`; // Create a unique key for each (nama, coba) combination
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, true);
                uniqueCombinedData.push(item);
            }
        }
        return uniqueCombinedData;
    }

    async getAllPostgreSql(){
        try {
            const result = await this.pool.query('SELECT * FROM execution2');

            const dataList = result.rows.map(row => {
                return new execution(row.nama, row.masuk, row.keluar, row.duration, row.coba);
            });

            return dataList; 
        } catch (error) {
            console.error('Error selecting all data from execution2 table:', error);
            throw error;
        }    
    }

    async restart(){
        try {
            const dataMain = await this.getAllMains()
            const COUNT = await this.pool.query('SELECT COUNT(*) FROM data2');
            const countValue = COUNT.rows[0].count;
            dataMain.sort((a, b) => {
                if (a.nama !== b.nama) {
                  return a.nama.localeCompare(b.nama); 
                } else {
                  return a.coba - b.coba; 
                }
            });
            await writeJsonToCSV(dataMain,countValue);
            // await this.pool.query('DELETE FROM data2');
            // await this.pool.query('DELETE FROM execution2');
            // await restartJSON([]);
            return;
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        }    
    }
}

async function writeJsonToCSV(mainData,count) {
    const namaFile = `data_${count}.csv`
    const filePath = path.join(__dirname, '..', 'file', namaFile);

    return new Promise((resolve, reject) => {
    fs.writeFileSync(filePath, '', 'utf8');
    fs.writeFileSync(filePath, 'nama,masuk,keluar,duration,coba\n', { flag: 'a' });

    for (const element of mainData) { 
        const rowData = `${element.nama},${element.masuk},${element.keluar},${element.duration},${element.coba}\n`;
        try {
          fs.promises.appendFile(filePath, rowData);
        } catch (err) {
          console.error('Error writing CSV file:', err);
          reject(err);  
        }
    }
    resolve();
    });
}

async function restartJSON(mainData) {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(mainData, null, 5);
        const filePath = path.join(__dirname, '..', 'file','execution.json');
        const filePath2 = path.join(__dirname, '..', 'file','output.json');

        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                reject(err);
            }
        });
        fs.writeFile(filePath2, jsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                reject(err);
            }
        });
        resolve();
    });
}

async function readJsonFile() {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path.join(__dirname, '..', 'file', 'execution.json'), { encoding: 'utf8' });
        const parser = JSONStream.parse('*');
        const dataList = [];

        parser.on('data', (jsonObj) => {
            try {
                const dataObj = new execution(jsonObj.nama, jsonObj.masuk, jsonObj.keluar, jsonObj.duration, jsonObj.coba);
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
            resolve(dataList);
        });

        stream.pipe(parser);
    });
}

module.exports = MainDataRepository;
