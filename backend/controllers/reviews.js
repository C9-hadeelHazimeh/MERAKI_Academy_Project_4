const reviewsModel = require("../models/reviews");
const clinic = require("../models/clinic");

// create a new review for a specific clinic/doctor by clinicId

const createnewReview = (req, res) => {
 console.log("req.params",req.params)
 const {clinicId} = req.params;
  const {review ,doctor} = req.body;
  const reviewer = req.token.userId;

  const newReview = new reviewsModel({
    review,
    reviewer,
    doctor
  });
  newReview
    .save()
    .then((result) => {
      console.log("res:",result)
      clinic
        .findByIdAndUpdate(
          { _id: clinicId},
          { $push: { reviews: result._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Review added`,
            review: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
 const updateReviewById=(req,res)=>{
  const {reviewId}=req.params;
  const filter=req.body;

  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  reviewsModel
    .findOneAndUpdate({ _id: reviewId }, req.body, { new: true })
    .then((result) => {
     console.log("result",result)
        if (!result) {
        return res.status(404).json({
          success: false,
          message: "no reviews were added",
        });
      }
      res.status(202).json({
        success: true,
        message: "the review updated",
        upatedreview:result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });




 }



module.exports = {
  createnewReview,
  updateReviewById
};
