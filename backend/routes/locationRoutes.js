const express = require('express');
const {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController');

const router = express.Router();

router.route('/').get(getLocations).post(createLocation);
router
  .route('/:id')
  .get(getLocationById)
  .patch(updateLocation)
  .delete(deleteLocation);

module.exports = router;
