const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    doc_id: String,
    data: Object,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Document', documentSchema);