const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/debenhams', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('eroor', console.error.bind(console, 'connection error'))

// Schemas
const ProductsSchema = new mongoose.Schema({
    name: String
});

const CategoriesSchema = new mongoose.Schema({
    name: String,
    body: String,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' }
});

// Models
const ProductsCollection = mongoose.model('products',ProductsSchema);
const CategoriesCollection = mongoose.model('categories', CategoriesSchema);

exports.isConnected = new Promise(resolve => db.once('open', resolve))
exports.ProductsCollection = ProductsCollection
exports.CategoriesCollection = CategoriesCollection