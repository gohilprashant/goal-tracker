import express from 'express';
import { deleteGoal, getGoals, setGoal, updateGoal } from '../controllers/goalController.js';

const router = express.Router();

router.route('/').get(getGoals);

router.route('/').post(setGoal);

router.route('/:id').put(updateGoal);

router.route('/:id').delete(deleteGoal);

export default router;
