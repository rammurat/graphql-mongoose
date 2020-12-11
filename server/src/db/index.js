const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/debenhams', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('eroor', console.error.bind(console, 'connection error'))

//notes collection
const notesCollectionSchema = new mongoose.Schema({
    name: String
});

const NotesCollection = mongoose.model(
    'products',
    notesCollectionSchema
);

// notes
const notesSchema = new mongoose.Schema({
    name: String,
    body: String,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
});

const Notes = mongoose.model('notes', notesSchema);

exports.isConnected = new Promise(resolve => db.once('open', resolve))
exports.NotesCollection = NotesCollection
exports.Notes = Notes