process.env.NODE_ENV = 'test';
require('../src/helpers/connectDB');
const { Information } = require('../src/models/information.model');

beforeEach('Remove database for test', async () => {
    await Information.remove({});
});
