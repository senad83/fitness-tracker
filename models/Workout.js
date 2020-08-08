const mongoose = require("mongoose");
const ExerciseSchema = require("./Exercise")

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [ExerciseSchema.schema],


  // fill up other functions
},
  {
    toJSON: { virtuals: true }
  });

WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  for (var i = 0; i < this.exercises.length; i++) {
    totalDuration = totalDuration + this.exercises[i].duration;
  }
  return totalDuration;
});


WorkoutSchema.methods.numExercises = function () {
  let numExercises = this.exercises.length;
  return numExercises;
};

WorkoutSchema.methods.totalWeight = function () {
  return 0;
};

WorkoutSchema.methods.totalSets = function () {
  return 0;
};

WorkoutSchema.methods.totalReps = function () {
  return 0;
};

WorkoutSchema.methods.totalDistance = function () {
  return 0;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

