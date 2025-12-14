const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    drink: { 
        type: String, 
        required: true 
    },
    size: { 
        type: String, 
        required: true,
        enum: ['Small', 'Medium', 'Large']
    },
    milk: { 
        type: String, 
        required: true,
        enum: ['Whole', 'Skim', 'Soy', 'Almond', 'Oat', '2%', 'Low-fat', 'None']
    },
    sugarPercentage: { 
        type: Number, 
        required: true,
        min: 0,
        max: 100
    },
    price: { 
        type: Number, 
        required: true,
        min: 0
    },
    orderTime: { 
        type: Date, 
        default: Date.now 
    },
    notes: { 
        type: String 
    }
});

// Index for fast sorting by order time
orderSchema.index({ orderTime: -1 });

// Create and export the model
module.exports = mongoose.model('Order', orderSchema);