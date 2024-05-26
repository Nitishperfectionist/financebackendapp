const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
     amount:{
             type: Number,
              required: true 
            },
     type: { 
        type: String, 
        required: true 
    },
  categoryId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
       required: true 
    },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true 
    },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
