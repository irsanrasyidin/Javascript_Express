// Import the ItemRepository class
const ItemRepository = require('../../domain/repositories/ItemRepository');
const Item = require('../../domain/entities/Item');

class ItemDataRepository extends ItemRepository {
    constructor() {
        super();
        this.items = [];
    }

    async createItem(itemData) {
        const newItem = new Item(itemData.name, itemData.description, itemData.price);
        this.items.push(newItem);
        return newItem;
    }

    async getAllItems() {
        return this.items;
    }
}

module.exports = ItemDataRepository;
