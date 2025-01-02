const path = require('path');
// Placeholder controller
class PageController {
    constructor(itemUseCase) {
        this.itemUseCase = itemUseCase;
    }

    async showItems(req, res) {
        
        try {
            const items = await this.itemUseCase.getAllItems();

            // Send JSON response
            res.render('test', { items: JSON.stringify(items),});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PageController;
