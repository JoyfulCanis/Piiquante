const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    name: String,
    value: String,
});

const Config = mongoose.model('secrets', configSchema);

async function getSecretKey() {
    const secretKeyDoc = await Config.findOne({ name: 'secret_key' });
    return secretKeyDoc ? secretKeyDoc.value : null;
}

module.exports = {
    getSecretKey,
};
