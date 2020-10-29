const Router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

Router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

Router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

Router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(DBex => {res.json(DBex);})
    .catch(err => {res.json(err);});
});

Router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then(DBex => {res.json(DBex);})
    .catch(err => {res.json(err);});
});

Router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(DBex => {res.json(DBex);})
    .catch(err => {res.json(err);});
});

Router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then(DBex => {res.json(DBex);})
    .catch(err => {res.json(err);});
});

module.exports = Router;
