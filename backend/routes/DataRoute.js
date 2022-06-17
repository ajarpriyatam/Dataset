const express = require("express");
const {
  newData,
  AllData,
  deletedata,
  updateData,
  getSingledata,
  SendData
} = require("../controller/DataCont");
const router = express.Router();

router.route("/data/new").post(newData);
router.route("/data_delete/:id").delete(deletedata);
router.route("/data/:id").get(getSingledata);
router.route("/data_update").put(updateData);
router.route("/all/data").get(AllData);
router.route("/send_data").post(SendData);

module.exports = router;