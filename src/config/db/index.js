const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/luva_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conneted');
    } catch (error) {
        console.log('Connect fail');
    }
}

module.exports = { connect };
