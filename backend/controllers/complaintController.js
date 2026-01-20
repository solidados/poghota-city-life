const Complaint = require('../models/complaintModel')

// * GET all complaints
const getAllComplaints = async (req, res) => {
  const user_id = req.user.id

  const complaints = await Complaint.findAll({
    where: { user_id },
    order: [['createdAt', 'DESC']]
  })

  res.status(200).json(complaints)
}

// * GET a single complaint
const getComplaint = async (req, res) => {
  const { id } = req.params

  if (!id || isNaN(id)) {
    return res.status(404).json({ error: 'No such complaint was found' })
  }

  const complaint = await Complaint.findByPk(id)

  if (!complaint) {
    return res.status(404).json({ error: 'No such complaint was found' })
  }
  res.status(200).json(complaint)
}

// * POST a new complaint
const createComplaint = async (req, res) => {
  // TODO: add images here:
  const { title, department, location, description } = req.body

  // start to create custom error messages:
  let emptyFields = []

  if (!title) { emptyFields.push('title') }
  if (!department) { emptyFields.push('department') }
  if (!location) { emptyFields.push('location') }
  if (!description) { emptyFields.push('description') }

  // TODO: if (!images) { emptyFields.push('images') }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'All fields are mandatory', emptyFields })
  }

  // * add document to DB
  try {
    const user_id = req.user.id
    const complaint = await Complaint.create({ title, department, location, description, user_id })
    res.status(200).json(complaint)
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// * DELETE a complaint
const deleteComplaint = async (req, res) => {
  const { id } = req.params

  if (!id || isNaN(id)) {
    return res.status(404).json({ error: 'No such complaint was found' })
  }

  const complaint = await Complaint.findByPk(id)

  if (!complaint) {
    return res.status(400).json({ error: 'No such complaint was found' })
  }

  await complaint.destroy()

  res.status(200).json(complaint)
}

// * PATCH a complaint
const updateComplaint = async (req, res) => {
  const { id } = req.params

  if (!id || isNaN(id)) {
    return res.status(404).json({ error: 'No such complaint was found' })
  }

  const complaint = await Complaint.findByPk(id)

  if (!complaint) {
    return res.status(400).json({ error: 'No such complaint was found' })
  }

  await complaint.update(req.body)

  res.status(200).json(complaint)
}

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaint,
  deleteComplaint,
  updateComplaint
}
