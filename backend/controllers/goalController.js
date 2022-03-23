import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';
import User from '../models/userModel.js';

// @desc   Get goals
// @route  GET /api/goals
// @access Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });

  res.status(200).json(goals);
});

// @desc   Set goal
// @route  POST /api/goals
// @access Private
export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user._id });

  res.status(200).json(goal);
});

// @desc   Update goal
// @route  PUT /api/goals/:id
// @access Private
export const updateGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text');
  }
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user._id);

  // check for user

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Make sure logged in user matcher goal user
  console.log(user._id, user.id);
  if (goal.user.toString() !== user.id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});

// @desc   Delete goal
// @route  DELETE /api/goals/:id
// @access Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user._id);

  // check for user

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Make sure logged in user matcher goal user
  if (goal.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.remove();

  res.status(200).json({
    id: req.params.id,
  });
});
