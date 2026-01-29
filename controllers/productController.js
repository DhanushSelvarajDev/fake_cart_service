const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

// Helper to get products from JSON file
const getProductsData = () => {
    try {
        const data = fs.readFileSync(productsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products data:', error);
        return [];
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
    try {
        const products = getProductsData();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
    try {
        const products = getProductsData();
        const product = products.find(p => p._id === req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
