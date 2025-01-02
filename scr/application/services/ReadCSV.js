const fs = require('fs');
const csv = require('csv-parser');
const Data = require('../../domain/entities/data');

async function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Convert each CSV row into a Data object and push it into data array
                const dataObj = new Data(row.id, row.first_name, row.last_name, row.email, row.gender, row.avatar);
                data.push(dataObj);
            })
            .on('end', () => {
                console.log('CSV file successfully processed.');
                resolve(data);
            })
            .on('error', (error) => {
                console.error('Error processing CSV file:', error);
                reject(error);
            });
    });
}

module.exports = { readCSV };
