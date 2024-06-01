const express = require("express");
const router = express.Router();
const wrapAsy = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router
  .route("/")
  .get( wrapAsy(listingController.index))
  .post(
      isLoggedIn,
      upload.single("listing[image]"),
      validateListing,
      wrapAsy( listingController.createListing)
   );
   

// new route
router.get( "/new",isLoggedIn,listingController.renderNewForm);   

router
    .route("/:id")
    .get(wrapAsy(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsy(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsy(listingController.destroyListing)
    );

       
// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsy(listingController.renderEditForm));

module.exports = router;