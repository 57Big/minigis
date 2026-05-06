function isValidLatitude(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= -90 && v <= 90;
}

function isValidLongitude(v) {
  return typeof v === 'number' && Number.isFinite(v) && v >= -180 && v <= 180;
}

function validateCoordinates(lat, lon) {
  if (!isValidLatitude(lat)) {
    return 'latitude -90 dan +90 gacha bo\'lgan raqam bo\'lishi kerak';
  }
  if (!isValidLongitude(lon)) {
    return 'longitude -180 dan +180 gacha bo\'lgan raqam bo\'lishi kerak';
  }
  return null;
}

module.exports = { isValidLatitude, isValidLongitude, validateCoordinates };
