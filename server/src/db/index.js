const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/debenhams', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('eroor', console.error.bind(console, 'connection error'))

// Schemas
const ProductsSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String,
    sizes: Array,
    tags: Array,
    related_products: Array,
    delivery_options: Array,
    images: Object,
    cat_id: Number,
    sub_cat_id: Number,
    sub_cat_name: String
});

const CategoriesSchema = new mongoose.Schema({
    name: String,
    sub_categories: Array
});

// Models
const ProductsCollection = mongoose.model('products',ProductsSchema);
const CategoriesCollection = mongoose.model('categories', CategoriesSchema);

exports.isConnected = new Promise(resolve => db.once('open', resolve))
exports.ProductsCollection = ProductsCollection
exports.CategoriesCollection = CategoriesCollection