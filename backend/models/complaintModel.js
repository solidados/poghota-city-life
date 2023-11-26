const mongoose = require('mongoose')

const Schema = mongoose.Schema

const complaintSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  }
}, {timestamps: true})

module.exports = mongoose.model('Complaint', complaintSchema)
