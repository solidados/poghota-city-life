const express = require('express')
const {
  createComplaint,
  getAllComplaints,
  getComplaint,
  deleteComplaint,
  updateComplaint
} = require("../controllers/complaintController");
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// REQUIRE Auth for all Complaint routes
router.use(requireAuth)

// GET all complaints:
router.get('/', getAllComplaints)

// GET single complaint
router.get('/:id', getComplaint)

// POST a new complaint
router.post('/', createComplaint)

// DELETE a complaint
router.delete('/:id', deleteComplaint)

// UPDATE a complaint
router.patch('/:id', updateComplaint)

module.exports = router
