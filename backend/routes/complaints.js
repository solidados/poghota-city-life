const express = require('express')

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
router.post('/', (req, res) => {
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
