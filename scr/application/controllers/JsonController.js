const { json } = require('express');
const path = require('path');
const data = require('../../domain/entities/data');
// Placeholder controller
class JsonController {
    constructor(jsonUseCase) {
        this.jsonUseCase = jsonUseCase;
    }

    async showJsons(req, res) {
        const data = [];
        const id = req.query.id;
        const name = req.query.name;
        const email = req.query.email;
        const gender = req.query.gender;
        if  (!id && !name && !email && !gender) {
            try {
                const jsons = await this.jsonUseCase.getAllJsons();
                data.push(...jsons);
                // Send JSON response
                if (data.length === 0) {
                    res.render('ui-tablejson', { data: "" });
                } else {
                    res.render('ui-tablejson', { data: data });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else if(id){      
            try{
                const jsons = await this.jsonUseCase.getByIdJsons(id);
                if (jsons.length === 0) {
                    res.render('ui-tablejson', { data: "" });
                } else {
                    res.render('ui-tablejson', { data: jsons });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }
        }  else if(name){      
            try{
                const jsons = await this.jsonUseCase.getByNameJsons(name);
                //console.log(name);
                if (jsons.length === 0) {
                    res.render('ui-tablejson', { data: "" });
                } else {
                    res.render('ui-tablejson', { data: jsons });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }      
        } else if(email){      
            try{
                const jsons = await this.jsonUseCase.getByEmailJsons(email);
                if (jsons.length === 0) {
                    res.render('ui-tablejson', { data: "" });
                } else {
                    res.render('ui-tablejson', { data: jsons });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }      
        } else if(gender){      
            try{
                const jsons = await this.jsonUseCase.getByGenderJsons(gender);
                if (jsons.length === 0) {
                    res.render('ui-tablejson', { data: "" });
                } else {
                    res.render('ui-tablejson', { data: jsons });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }      
        }
    }

    async updateJsonsPage(req,res){
        const id = req.query.id;
        try {
            if (!id){
                res.render('ui-updatejson', { data: "" });                   
            }else {
                const jsons = await this.jsonUseCase.getByIdJsons(id);
                if (jsons.length === 0) {
                    res.render('ui-updatejson', { data: "" });
                } else {
                    res.render('ui-updatejson', { data: jsons });
                }                
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }       
    }

    async updateJsons(req,res){    
        const id = req.body.id;
        const firstName = req.body.fname;
        const lastName = req.body.lname;
        const email = req.body.email;
        const gender = req.body.gender;
        const avatar = req.body.avatar;

        const newData = new data(id, firstName, lastName, email, gender, avatar);
        try {
            await this.jsonUseCase.updateByIdJsons(newData);            
            res.render('ui-updatejson', { data: "" });                            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteJsonsPage(req,res){
        const id = req.query.id;
        try {
            if (!id){
                res.render('ui-deletejson', { data: "" });                          
            } else {
                const jsons = await this.jsonUseCase.getByIdJsons(id);
                if (jsons.length === 0) {
                    res.render('ui-deletejson', { data: "" });
                } else {
                     res.render('ui-deletejson', { data: jsons });
                }                      
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        
    }

    async deleteJsons(req,res){    
        const id = req.body.id;
        const all = req.body.all    
        //console.log(all);
        try {
            if (all){
                await this.jsonUseCase.deleteAllJsons(); 
            }else{
                await this.jsonUseCase.deleteByIdJsons(id); 
            }                       
            res.render('ui-deletejson', { data: "" });                            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = JsonController;
