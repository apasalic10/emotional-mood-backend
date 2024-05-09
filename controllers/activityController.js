const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");

//@desc Get all activities
//@route GET /api/activities
//@access Private
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

//@desc Get activity by id
//@route GET /api/activities/:id
//@access Private
const getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  res.json(activity);
});

//@desc Create activity
//@route POST /api/activities
//@access Private
const createActivity = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const activity = new Activity({
    name,
  });

  const createdActivity = await activity.save();

  res.status(201).json(createdActivity);
});

//@desc Update activity
//@route PUT /api/activities/:id
//@access Private
const updateActivity = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  activity.name = name;

  const updatedActivity = await activity.save();

  res.json(updatedActivity);
});

//@desc Delete activity
//@route DELETE /api/activities/:id
//@access Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  await activity.deleteOne();

  res.json({ message: "Activity removed" });
});

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
