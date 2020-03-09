const path = require('path');
const dbPath = path.join(__dirname, '..', 'db/database', 'database.sqlite3');

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: dbPath
    }
};
