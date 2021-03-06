const bcrypt = require("bcryptjs");
const saltRounds = 10;
const db = require("../models");
const jwt = require("jsonwebtoken");
const studentController = {
  studentSignup: async (req, res) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      campus,
      password,
      confirmPassword
    } = req.body;
    // compare input passwords
    if (password != confirmPassword) {
      console.log("dont match");
      res.status(403).json({ message: "passwords dont match" });
      return;
    }
    //check if student already exists in the database
    //If does not exist go ahead and create a new prof
    checkforStudent = await db.Student.findOne({
      where: {
        email: email
      }
    });
    if (checkforStudent) {
      res.status(403).json({ message: "person Already exists" });
      return;
    }
    //hash password and confirmpassword before storing to db
    const hashedpassword = bcrypt.hashSync(password, saltRounds);
    const hashedconfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);
    //writing to the student table
    let result;
    try {
      result = await db.Student.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        campus,
        password: hashedpassword,
        confirmPassword: hashedconfirmPassword
      });
      res.status(200).json({
        message: "Student has been created",
        message: result
      });
    } catch (error) {
      res.status(403).json({
        error: "forbidden",
        message: "Your request was not processed",
        message: error
      });
      return;
    }
  },
  signIn: async (req, res) => {
    userId = req.user.id;
    res.json(userId);
    // jwt.sign(
    //   { userId: req.user.id },
    //   "secretkey",
    //   { expiresIn: "2hrs" },
    //   (err, token) => {
    //     if (err) {
    //       res.sendStatus(500);
    //       return;
    //     }

    //     res.json({ token });

    //     return;
    //   }
    // );
  },

  updatestudent: async (req, res) => {
    const { email } = req.body;
    const student = await db.Student.findOne({
      where: {
        email: email
      }
    });

    if (!student) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    let result;
    try {
      result = await db.Student.update(req.body, {
        where: {
          email: req.body.email
        }
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
      return;
    }
  },
  searchallcourses: async (req, res) => {
    let result;
    try {
      result = await db.Course.findAll();
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  },
  registerforclass: async (req, res) => {
    // check if course exists
    //if it does check the count of sits
    // signup
    const { courseName } = req.body;

    const checkcourse = await db.Course.findOne({
      where: {
        id: req.params.c_id
      }
    });

    let classAvailable = checkcourse.dataValues.availableseats;
    const course_id = checkcourse.dataValues.id;
    console.log(course_id);
    // check if there are available seats

    if (!classAvailable) {
      res.status(403).json({ message: "class is full" });
      return;
    }

    //check if student is already registered
    let studentcheck;
    try {
      studentcheck = await db.StudentCourse.findOne({
        where: {
          student_id: req.params.s_id,
          course_id: req.params.c_id
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
      return;
    }
    if (studentcheck) {
      res
        .status(403)
        .json({ message: "You are already registered for this class" });
      return;
    }
    let results;

    try {
      results = await db.StudentCourse.create({
        course_id: req.params.c_id,
        student_id: req.params.s_id
      });
      // console.log(results);
      res.send(results);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    //decrease seat count
    classAvailable -= 1;

    try {
      const updateseatcount = await db.Course.update(
        { availableseats: classAvailable },
        {
          where: {
            id: req.params.c_id
          }
        }
      );
      res.status(201).json({ message: "You are registered" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Server error" });
      return;
    }
  },
  searchtitle: async (req, res) => {
    console.log(req, "REQ");
    let result;
    try {
      result = await db.Course.findAll({
        where: {
          courseName: req.params.name
        }
      });
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
  },
  searchprof: async (req, res) => {
    let result;
    try {
      result = await db.Course.findAll({
        where: {
          prof_id: req.params.id
        }
      });
      res.send(result);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  },
  studentinfo: async (req, res) => {
    let results;
    try {
      results = await db.Student.findOne({
        where: {
          id: req.params.id
        }
      });
      res.send(results);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  },
  registeredcourses: async (req, res) => {
    let results;
    try {
      results = await db.StudentCourse.findAll({
        where: {
          student_id: req.params.id
        }
      });
      res.send(results);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  },
  mycoursesandprof: async (req, res) => {
    let result;
    try {
      console.log("***********BLAH********", req.params.id);
      result = await db.StudentCourse.findAll({
        where: {
          student_id: req.params.id
        },
        attributes: ["course_id"],
        include: [
          {
            model: db.Course,
            attributes: ["courseName", "level"],
            include: [
              {
                model: db.Professor,
                attributes: ["firstName", "LastName"]
              }
            ]
          }
        ]
      });
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = studentController;
