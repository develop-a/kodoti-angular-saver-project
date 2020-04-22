const db = require('../db/database'),
    { v4: uuidv4 } = require('uuid');

class OutcomeService {
    getAll(userId, year, month) {
        return db.outcomes.filter(
            x => x.userId === userId
                && x.created_at.getMonth() + 1 == month
                && x.created_at.getFullYear() == year
        );
    }

    find(id) {
        return db.outcomes.find(x => x.id === id);
    }

    create(obj) {
        let entry = {
            "id": uuidv4(),
            "userId": obj.userId,
            "created_at": new Date(),
            "updated_at": null,
            "detail": obj.detail,
            "amount": obj.amount
        };

        db.outcomes.push(entry);

        return entry;
    }

    update(id, obj) {
        let entry = db.outcomes.find(x => id === id);

        entry.updated_at = new Date();
        entry.detail = obj.detail;
        entry.amount = obj.amount;
    }

    remove(id) {
        db.outcomes = db.outcomes.filter(x => x.id !== id);
    }
}

module.exports = new OutcomeService();