const path = require('path');
const fs = require('fs');
const { filterByName, analyze, sort } = require('../services/DataFilter');
const csvService = require('../services/ReadCSV');


// Placeholder controller
class MainController {
    constructor(mainUseCase) {
        this.mainUseCase = mainUseCase;
    }

    async showMains(req, res) {
        const selectedOption = req.query.option;      
        let result = {};
        try {
            const mainData = await this.mainUseCase.getAllMains();
            switch (selectedOption) {
                case '2':
                    const createData = filterByName(mainData,"Insert")
                    const { resultJson: createJson, resultPostgresql: createPostgresql } = analyze(createData);
                    sort(createData,createJson);
                    sort(createData,createPostgresql);
                    res.render('index', { 
                        mainData:createData,
                        jsonData:createJson,
                        postgreData:createPostgresql,
                        selectedOption: selectedOption 
                    });
                    break;
                case '3':
                    const readData = filterByName(mainData,"get")
                    const { resultJson: readJson, resultPostgresql: readPostgresql } = analyze(readData);
                    sort(readData,readJson);
                    sort(readData,readPostgresql);
                    res.render('index', { 
                        mainData:readData,
                        jsonData:readJson,
                        postgreData:readPostgresql,
                        selectedOption: selectedOption 
                    });
                    break;
                case '4':
                    const updateData = filterByName(mainData,"update")
                    const { resultJson: updateJson, resultPostgresql: updatePostgresql } = analyze(updateData);
                    sort(updateData,updateJson);
                    sort(updateData,updatePostgresql);
                    res.render('index', { 
                        mainData:updateData,
                        jsonData:updateJson,
                        postgreData:updatePostgresql,
                        selectedOption: selectedOption 
                    });
                    break;  
                case '5':
                    const deleteData = filterByName(mainData,"delete")
                    const { resultJson: deleteJson, resultPostgresql: deletePostgresql } = analyze(deleteData);
                    sort(deleteData,deleteJson);
                    sort(deleteData,deletePostgresql);
                    res.render('index', { 
                        mainData:deleteData,
                        jsonData:deleteJson,
                        postgreData:deletePostgresql,
                        selectedOption: selectedOption 
                    });
                    break;  
                default:
                    const {resultJson,resultPostgresql} = analyze(mainData);
                    sort(mainData,resultJson);
                    sort(mainData,resultPostgresql);
                    res.render('index', { 
                        mainData:mainData,
                        jsonData:resultJson,
                        postgreData:resultPostgresql,
                        selectedOption: selectedOption 
                    });
                    break;
            }            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createJSON(req,res){
        const data =[];
        try {
            const newData = await csvService.readCSV(req.file.path);
            data.push(...newData);

            fs.unlinkSync(req.file.path);
            await this.mainUseCase.createMain(data);
       
            res.redirect('/');
        } catch (error) {
            console.error('Error processing CSV file:', error);
            res.status(500).send('Error processing CSV file');
        }
    }

    async restart(req,res){
        try {
            await this.mainUseCase.restart();
            res.redirect('/');
        } catch (error) {
            console.error('Error processing restart:', error);
            res.status(500).send('Error processing CSV file');
        }
    }
}

module.exports = MainController;
