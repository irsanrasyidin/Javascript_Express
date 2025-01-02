const { postgresql } = require('express');
const path = require('path');
const data = require('../../domain/entities/data');
// Placeholder controller
class PostgresqlController {
    constructor(postgresqlUseCase) {
        this.postgresqlUseCase = postgresqlUseCase;
    }

    async showPostgresqls(req, res) {
        const data = [];
        const id = req.query.id;
        const name = req.query.name;
        const email = req.query.email;
        const gender = req.query.gender;
        //console.log(id, name, email, gender);
        if  (!id && !name && !email && !gender) {
            try {
                const postgresqls = await this.postgresqlUseCase.getAllPostgresqls();
                data.push(...postgresqls);
                // Send JSON response
                if (data.length === 0) {
                    res.render('ui-tablepostgresql', { data: "" });
                } else {
                    res.render('ui-tablepostgresql', { data: data });
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else if(id){      
            try{
                const postgresqls = await this.postgresqlUseCase.getByIdPostgresqls(id);
                if (postgresqls.length === 0) {
                    res.render('ui-tablepostgresql', { data: "" });
                } else {
                    res.render('ui-tablepostgresql', { data: postgresqls });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }
        }  else if(name){      
            try{
                const postgresqls = await this.postgresqlUseCase.getByNamePostgresqls(name);
                if (postgresqls.length === 0) {
                    res.render('ui-tablepostgresql', { data: "" });
                } else {
                    res.render('ui-tablepostgresql', { data: postgresqls });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }      
        } else if(email){      
            try{
                const postgresqls = await this.postgresqlUseCase.getByEmailPostgresqls(email);
                if (postgresqls.length === 0) {
                    res.render('ui-tablepostgresql', { data: "" });
                } else {
                    res.render('ui-tablepostgresql', { data: postgresqls });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }      
        } else if(gender){      
            try{
                const postgresqls = await this.postgresqlUseCase.getByGenderPostgresqls(gender);
                if (postgresqls.length === 0) {
                    res.render('ui-tablepostgresql', { data: "" });
                } else {
                    res.render('ui-tablepostgresql', { data: postgresqls });
                }
            }catch (error){
                res.status(500).json({ error: error.message });
            }      
        }
    }

    async updatePostgresqlsPage(req,res){
        const id = req.query.id;
        try {
            if (!id){
                res.render('ui-updatepostgresql', { data: "" });                   
            }else {
                const postgresqls = await this.postgresqlUseCase.getByIdPostgresqls(id);
                if (postgresqls.length === 0) {
                    res.render('ui-updatepostgresql', { data: "" });
                } else {
                    res.render('ui-updatepostgresql', { data: postgresqls });
                }                
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }       
    }

    async updatePostgresqls(req,res){    
        const id = req.body.id;
        const firstName = req.body.fname;
        const lastName = req.body.lname;
        const email = req.body.email;
        const gender = req.body.gender;
        const avatar = req.body.avatar;

        const newData = new data(id, firstName, lastName, email, gender, avatar);
        try {
            await this.postgresqlUseCase.updateByIdPostgresqls(newData);            
            res.render('ui-updatepostgresql', { data: "" });                            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePostgresqlsPage(req,res){
        const id = req.query.id;
        try {
            if (!id){
                res.render('ui-deletepostgresql', { data: "" });                          
            } else {
                const postgresqls = await this.postgresqlUseCase.getByIdPostgresqlsNoExec(id);
                if (postgresqls.length === 0) {
                    res.render('ui-deletepostgresql', { data: "" });
                } else {
                     res.render('ui-deletepostgresql', { data: postgresqls });
                }                      
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        
    }

    async deletePostgresqls(req,res){    
        const id = req.body.id;
        const all = req.body.all    
        try {
            if (all){
                await this.postgresqlUseCase.deleteAllPostgresqls(); 
            }else{
                await this.postgresqlUseCase.deleteByIdPostgresqls(id); 
            }                       
            res.render('ui-deletepostgresql', { data: "" });                            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PostgresqlController;
