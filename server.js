const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// var fileId = mongoose.Types.ObjectId();

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", { useNewUrlParser: true });
app.get("/test/:id", async (req, res) => {
  var test = req.params.id;
  console.log(req.params);
  var workouts = await db.Workout.findOne(({ "_id": mongoose.Types.ObjectId(test) }))
  workouts.exercises.push("exercises");
  workouts.save();
  res.json(workouts);
})

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
})

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// route for homepage
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", async (req, res) => {
  var id = req.params.id;
  var body = req.body;
  db.Workout.findById(id).then(dbWorkout => {
    dbWorkout.exercises.push(body);
    dbWorkout.save(error => {
      if (error) console.log(error);
      res.json(dbWorkout);
    })
  })
/*   db.Exercise.create(body)
    .then((dbExercise) => {
      db.Workout.findOne().then(dbWorkout => {
        dbWorkout.exercises.push(dbExercise);
      })
      return db.Workout.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(params) }, { $push: { exercises: dbExercise.id } }, { new: true })
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    }); */
  //var workouts = await db.Workout.findOne({"_id" : mongoose.Types.ObjectId(params)});
  //workouts.exercises.push(body);
  // workouts.save ();
  // res.json(workouts);
  //person.friends.push(friend);
  //person.save(done);

});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});