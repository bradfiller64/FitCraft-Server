import { RequestHandler } from "express";
import { Workout } from "../models/workout";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllWorkouts: RequestHandler = async (req, res, next) => {
    let workouts = await Workout.findAll();
    res.status(200).json(workouts);
}

export const getUserWorkouts: RequestHandler = async (req, res, next) => {
    let username = req.params.username;

    let workouts = await Workout.findAll({
        where: {
            username: username
        }
    })
    if (workouts) {
        res.status(200).json(workouts);
    } else {
        res.status(404).json({});
    }
}

export const createWorkout: RequestHandler = async (req, res, next) => {
    // user authentication
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newWorkout: Workout = req.body;
    newWorkout.username = user.username;

    // checking if workout has a title
    if (newWorkout.title) {
        let created = await Workout.create(newWorkout);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getWorkout: RequestHandler = async (req, res, next) => {
    let workoutId = req.params.id;

    let workout = await Workout.findByPk(workoutId);

    // checking for a workout
    if (workout) {
        res.status(200).json(workout);
    }
    else {
        res.status(404).json({});
    }
}

export const updateWorkout: RequestHandler = async (req, res, next) => {
    // user authentication
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    // extract the workout ID from the request parameters
    let workoutId = req.params.id;

    //updated workout object
    let newWorkout: Workout = req.body;

    // New workout username set to current user
    newWorkout.username = user.username

    // finding workout that is to be edited by its id
    let workoutFound = await Workout.findByPk(workoutId);

    // checking for a workout, workoutFound username matches username of updated workout, current user matches username of workoutFound, new workout has a title.
    if (workoutFound && workoutFound.username == newWorkout.username && user.username == workoutFound.username && newWorkout.title) {

        await Workout.update(newWorkout, {
            where: { workoutId: workoutId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}

export const deleteWorkout: RequestHandler = async (req, res, next) => {
    // user authentication
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let workoutId = req.params.id;

    let workoutFound = await Workout.findByPk(workoutId);

    // checking if current user matches the username of workout
    if (workoutFound && workoutFound.username == user.username) {
        await Workout.destroy({
            where: { workoutId: workoutId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}