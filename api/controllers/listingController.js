const Listing = require("../models/listingModel");

exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (e) {
    next(e);
  }
};
