process.env.NODE_ENV = 'test';
require('../src/helpers/connectDatabase');
const { Information } = require('../src/models/information.model');

beforeEach('Remove database for test', async () => {
    await Information.remove({});
});
