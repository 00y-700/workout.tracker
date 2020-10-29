const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date()
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "What is your exercise type?"
        },
        name: {
          type: String,
          trim: true,
          required: "What is your excercise name?"
        },
        duration: {
          type: Number,
          required: "How long is your excercise (minutes)?"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    //from in class
    toJSON: {
      virtuals: true
    }
  }
);

// in class
workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
