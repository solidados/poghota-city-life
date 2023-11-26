const express = require('express')
const Complaint = require('../models/complaintModel')

const router = express.Router()

// GET all complaints:
router.get('/', (req, res) => {
  res.json({message: 'GET all complaints'})
})

// GET single complaint
router.get('/:id', (req, res) => {
  res.json({message: 'GET single complaint'})
})

// POST a new complaint
router.post('/', async (req, res) => {
  const {title, department, location, description, images} = req.body

  try {
    const complaint = await Complaint.create({title, department, location, description, images})
    res.status(200).json(complaint)
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
  res.json({message: 'POST a complaint'})
})

// DELETE a complaint
router.delete('/:id', (req, res) => {
  res.json({message: 'DELETE a complaint'})
})

// UPDATE a complaint
router.patch('/:id', (req, res) => {
  res.json({message: 'UPDATE a complaint'})
})

module.exports = router
