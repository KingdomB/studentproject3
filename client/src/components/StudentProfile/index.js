import React, { Component, Redirect } from "react";
import jwt from "jsonwebtoken";
import Axios from "axios";
import Auth from "../Auth";

class StudentProfile extends Component {
  state = {
    student: {},
    classes: [],
    toSignIn: false
  };
  componentDidMount() {
    this.mycoursesandprof();
    this.registeredCourses();
  }
  studentData = () => {
    const userid = localStorage.getItem("id");

    const URL = `http://localhost:8080/studentinfo/${userid}`;
    Axios({
      url: URL,
      method: "GET"
    })
      .then(res => {
        // console.log(res.data);
        this.setState({
          student: res.data
        });
      })
      .catch(err => console.log(err));
  };
  // *************NEED THIS TO WORK**************
  registeredCourses = () => {
    const userid = localStorage.getItem("id");
    const URL = `http://localhost:8080/registeredcourses/${userid}`;
    Axios({
      url: URL,
      method: "GET"
    })
      .then(res => {
        // console.log(res.data);
        this.setState({
          classes: res.data
        });
      })
      .catch(err => console.log(err));
  };

  mycoursesandprof = () => {
    const userid = localStorage.getItem("id");
    const URL = `http://localhost:8080/mycoursesandprof/${userid}`;
    Axios({
      url: URL,
      method: "GET"
    })
      .then(res => {
        // console.log(res.data);
        console.log(res.data[3].Course.courseName);
        console.log(res.data[3].Course.level);
        this.setState({
          classes: res.data
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    // console.log(this.state.classes);
    return (
      <div>
        <p>First Name: {this.state.student.firstName}</p>
        <p>Lirst Name: {this.state.student.lastName}</p>

        <p> email: {this.state.student.email}</p>
        <p> phone: {this.state.student.phoneNumber}</p>
      </div>
    );
  }
}

export default StudentProfile;
