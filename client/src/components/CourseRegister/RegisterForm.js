import React from "react";

function RegisterForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <p>Here</p>
      <label>Course Title</label>
      <input
        type="text"
        value={props.CourseName}
        onChange={props.handleChange}
      />
      <button> Register</button>
    </form>
  );
}
export default RegisterForm;
