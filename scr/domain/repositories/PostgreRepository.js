// Placeholder interface for JsonRepository
class PostgresqlRepository {
    async createJson(jsonData) {
        throw new Error("Method not implemented");
    }

    async getAllJsons() {
        throw new Error("Method not implemented");
    }
}

module.exports = PostgresqlRepository;
