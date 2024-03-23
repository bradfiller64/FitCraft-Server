import { Router } from 'express';
import { createWorkout, deleteWorkout, getWorkout, getUserWorkouts, updateWorkout } from '../controllers/workoutController';


const router = Router();

router.post('/', createWorkout);

router.get('/detail/:id', getWorkout);

router.put('/detail/:id', updateWorkout);

router.delete('/detail/:id', deleteWorkout);

router.get('/:username', getUserWorkouts);

export default router;