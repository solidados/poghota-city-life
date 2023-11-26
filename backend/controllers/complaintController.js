const mongoose = require('mongoose')
const Complaint = require('../models/complaintModel')

// * GET all complaints
const getAllComplaints = async (req, res) => {
  const complaints = await Complaint
    .find({})
    .sort({createdAt: -1})

  res.status(200).json(complaints)
}

// * GET a single complaint
const getComplaint = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such complaint was found'})
  }

  const complaint = await Complaint.findById(id)

  if (!complaint) {
    return res.status(404).json({error: 'No such complaint was found'})
  }
  res.status(200).json(complaint)
}

// * POST a new complaint
const createComplaint = async (req, res) => {
  const {title, department, location, description} = req.body

  // start to create custom error messages:
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!department) {
    emptyFields.push('department')
  }
  if (!location) {
    emptyFields.push('location')
  }
  if (!description) {
    emptyFields.push('description')
  }
  // if (!images) {
  //   emptyFields.push('images')
  // }
  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'All fields are mandatory', emptyFields})
  }

  // * add document to DB
  try {
    const complaint = await Complaint.create({title, department, location, description})
    res.status(200).json(complaint)
  }
  catch (e) {
    res.status(400).json({error: e.message})
  }
}

// * DELETE a complaint
const deleteComplaint = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such complaint was found'})
  }

  const complaint = await Complaint.findOneAndDelete({_id: id})

  if (!complaint) {
    return res.status(400).json({error: 'No such complaint was found'})
  }

  res.status(200).json(complaint)
}

// * PATCH a complaint
const updateComplaint = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such complaint was found'})
  }

  const complaint = await Complaint.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!complaint) {
    return res.status(400).json({error: 'No such complaint was found'})
  }

  res.status(200).json(complaint)
}

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaint,
  deleteComplaint,
  updateComplaint
}
