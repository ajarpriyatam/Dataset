const Data = require("../models/DataModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
exports.newData = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    phone_no,
    email,
    hobbies
  } = req.body;
  const data = await Data.create({
    name:name,
    phone_no:phone_no,
    email:email,
    hobbies:hobbies,
  });

  res.status(201).json({
    success: true,
    data
  });
});

exports.deletedata = catchAsyncErrors(async (req, res, next) => {
  const data = await Data.findById(req.params.id);

  if (!data) {
    return next(new ErrorHander("Data not found with this Id", 404));
  }
  await data.remove();
  res.status(200).json({
    success: true,
    message:"Data Deleted",
  });
});

exports.getSingledata = catchAsyncErrors(async (req, res, next) => {
  const data = await Data.findById(req.params.id);

  if (!data) {
    return next(new ErrorHander("Data not found with this Id", 404));
  }
  res.status(200).json({
    success: true,
    data
  });
});

exports.AllData = catchAsyncErrors(async (req, res, next) => {
  const data = await Data.find();
  res.status(200).json({
    success: true,
    data,
  });
});

exports.updateData = catchAsyncErrors(async (req, res, next) => {
  const newData ={
    name: req.body.name,
    phone_no:req.body.phone_no,
    hobbies:req.body.hobbies
  };
  if (req.body.email) {
    return next(new ErrorHander("Email does not Change", 400));
  }
  const data = await Data.findByIdAndUpdate(req.body.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
   res.status(200).json({
   success: true,
   data
  });
});



exports.SendData = catchAsyncErrors(async (req, res, next) => {
  const message = req.body.message;
  try {
    await sendEmail({
      email: "info@redpositive.in",
      subject: `Data from Data store`,
      message,
    });
    res.status(200).json({
      success: true,
      message:`Email is send on info@redpositive.in`,
      msg:message
    });
  } catch (error) {
    return next(new ErrorHander(error.message, 500));
  }
});