const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/**
 * Build inventory by classification view
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  /** @type {Array} */
  const data = await invModel.getInventoryByClassificationId(classification_id);

  let grid;
  let className;
  if (data.length) {
    grid = await utilities.buildClassificationGrid(data);
    className = data[0].classification_name;
  } else {
    grid = "";
    className = "No";
  }
  let nav = await utilities.getNav();

  res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/**
 * Build the view to display a single vehicle
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventoryId = req.params.inventoryId;
  //const data = await invModel.getInventoryByInventoryId(inventoryId + 5); // Buggy code
  const data = await invModel.getInventoryByInventoryId(inventoryId); // Clean code
  const listing = await utilities.buildItemListing(data[0]);
  let nav = await utilities.getNav();
  const itemName = `${data[0].inv_make} ${data[0].inv_model}`;

  res.render("inventory/listing", {
    title: itemName,
    nav,
    listing,
  });
};


module.exports = invCont;
