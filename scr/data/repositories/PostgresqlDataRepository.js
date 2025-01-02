// Import the PostgresqlRepository class
const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

const { Pool } = require('pg');

const PostgresqlRepository = require('../../domain/repositories/PostgreRepository');
const Data = require('../../domain/entities/data');
const execution = require('../../domain/entities/execution');
const JsonDataRepository = require('./JsonDataRepository');


class PostgresqlDataRepository extends PostgresqlRepository {
    constructor(pool) {
        super();
        this.pool = pool;
    }

    async createPostgresql(postgresqlData) {
        await this.deleteAllPostgresqls()
        try {
            await this.pool.query('BEGIN');
        
            const values = postgresqlData.map(data => [
              data.id, data.first_name, data.last_name, data.email, data.gender, data.avatar
            ]);

            const query = `
              INSERT INTO data2 (id, first_name, last_name, email, gender, avatar)
              VALUES ${values.map((_, i) => `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`).join(', ')}
            `;
        
            await this.pool.query(query, values.flat()); // Flatten the values array
        
            await this.pool.query('COMMIT');
          } catch (error) {
            await this.pool.query('ROLLBACK');
            throw error;
          }   
    }

    async getAllPostgresqls() {
        try {
            // Execute the SELECT query to retrieve all data from 'data2' table
            const result = await this.pool.query('SELECT * FROM data2 ORDER BY id');

            // Map the selected rows to instances of the 'data' class
            const dataList = result.rows.map(row => {
                return new Data(row.id, row.first_name, row.last_name, row.email, row.gender, row.avatar);
            });

            return dataList; // Return the list of 'data' instances
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        }    
    }

    async getByIdPostgresqls(id) {
        try {
            const result = await this.pool.query('SELECT * FROM data2 WHERE id=$1',[id]);

            const dataList = result.rows.map(row => {
                return new Data(row.id, row.first_name, row.last_name, row.email, row.gender, row.avatar);
            });

            return dataList;
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        }    
    }

    async getByNamePostgresqls(name) {
        try {
            const result = await this.pool.query(
                `SELECT * FROM data2 WHERE first_name ILIKE '%' || $1 || '%' OR last_name ILIKE '%' || $1 || '%'`,
                [name]
              );

            const dataList = result.rows.map(row => {
                return new Data(row.id, row.first_name, row.last_name, row.email, row.gender, row.avatar);
            });

            return dataList; 
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        } 
    }

    async getByEmailPostgresqls(email) {
        try {
            const result = await this.pool.query(
                `SELECT * FROM data2 WHERE email ILIKE '%' || $1 || '%'`,
                [email]
              );
            const dataList = result.rows.map(row => {
                return new Data(row.id, row.first_name, row.last_name, row.email, row.gender, row.avatar);
            });
            return dataList; 
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        } 
    }

    async getByGenderPostgresqls(gender) {
        switch (gender) {
            case 'male':
                gender ='Male';
                break;
            case 'female':
                gender ='Female';    
                break;
        }
        try {
            const result = await this.pool.query('SELECT * FROM data2 WHERE gender=$1',[gender]);

            const dataList = result.rows.map(row => {
                return new Data(row.id, row.first_name, row.last_name, row.email, row.gender, row.avatar);
            });
            return dataList; 
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        }    
    }

    async updateByIdPostgresqls(newData) {
        try {
            // Execute the SELECT query to retrieve all data from 'data2' table
            const result = await this.pool.query('UPDATE data2 SET First_name=$2, Last_name=$3, Email=$4, Gender=$5, Avatar=$6 WHERE ID=$1',[newData.id,newData.first_name,newData.last_name,newData.email,newData.gender,newData.avatar]).catch(error => {
                console.error('Error updating data:', error);
            });
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        }    
    }

    async deleteByIdPostgresqls(id) {
        try {
            // Execute the SELECT query to retrieve all data from 'data2' table
            const result = await this.pool.query('DELETE FROM data2 WHERE ID=$1',[id]).catch(error => {
                console.error('Error deleteing data:', error);
            });;

        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        }  
    }

    async deleteAllPostgresqls() {
        try {
            await this.pool.query('DELETE FROM data2');
            console.log('All data deleted from data2 table.');
        } catch (error) {
            console.error('Error deleting data from data2 table:', error);
            throw error;
        }
    }

    async createExecutionPostgresql(postgresqlData) {
        try {
            await this.pool.query('BEGIN');
            const listData = await this.getExecutionByNamePostgresqls(postgresqlData.nama);
            //console.log(postgresqlData.nama)
            //console.log(listData.length)
            if (listData.length>=30){
                await this.pool.query(
                    'DELETE FROM execution2 Where Nama=$1 AND Coba=$2',
                    [postgresqlData.nama, 1]
                    ).catch(error => {
                        console.error('Error inserting data:', error);
                });
                listData.splice(0,1);
                //console.log(listData)
                await listData.forEach(item => {
                    this.pool.query(
                        'UPDATE execution2 SET Coba=$3 WHERE Nama=$1 AND Coba=$2',
                        [item.nama, item.coba, item.coba--]
                        ).catch(error => {
                            console.error('Error inserting data:', error);
                    });
                });
                await this.pool.query(
                    'INSERT INTO execution2 (nama, masuk, keluar, duration, coba) VALUES($1, $2, $3, $4, $5)',
                    [postgresqlData.nama, postgresqlData.masuk, postgresqlData.keluar, postgresqlData.duration, 1]
                    ).catch(error => {
                        console.error('Error inserting data:', error);
                }); 
            }else {
                if (!listData.length){                    
                    await this.pool.query(
                        'INSERT INTO execution2 (nama, masuk, keluar, duration, coba) VALUES($1, $2, $3, $4, $5)',
                        [postgresqlData.nama, postgresqlData.masuk, postgresqlData.keluar, postgresqlData.duration, 1]
                        ).catch(error => {
                            console.error('Error inserting data:', error);
                    });                   
                }else {
                    await this.pool.query(
                        'INSERT INTO execution2 (nama, masuk, keluar, duration, coba) VALUES($1, $2, $3, $4, $5)',
                        [postgresqlData.nama, postgresqlData.masuk, postgresqlData.keluar, postgresqlData.duration, listData.length+1]
                        ).catch(error => {
                            console.error('Error inserting data:', error);
                    });
                }
            }            
            await this.pool.query('COMMIT');
        } catch (error) {
            await this.pool.query('ROLLBACK');
            throw new Error(`Error inserting data: ${error.message}`);
        }     
    }

    async getExecutionByNamePostgresqls(name) {
        try {
            // Execute the SELECT query to retrieve all data from 'data2' table
            const result = await this.pool.query(
                `SELECT * FROM execution2 WHERE nama = $1 ORDER BY coba`,
                [name]
              );

            // Map the selected rows to instances of the 'data' class
            const dataList = result.rows.map(row => {
                return new execution(row.nama, row.masuk, row.keluar, row.duration, row.coba);
            });

            //console.log(dataList);
            return dataList; // Return the list of 'data' instances
        } catch (error) {
            console.error('Error selecting all data from data2 table:', error);
            throw error;
        } 
    }
}

module.exports = PostgresqlDataRepository;
