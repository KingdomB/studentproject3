import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

function CreateCourse() {
  const [coursecreate, setcoursecreate] = useState({
    courseName: '',
    availableseats: '',
    startdate: '',
    enddate: '',
    level: '',
    prereq: '',
    prof_id: ''
  });

  //handle errors
  const [anyerrrors, setanyerrrors] = useState({
    errorsFlag: false,
    actualErrors: ''
  });

  //grab and set prof_id from localstorage
  useEffect(() => {
    coursecreate.prof_id = localStorage.getItem('profid');
  }, [coursecreate.prof_id]);
  const handlSubmit = async e => {
    e.preventDefault();
    //Reset form and errors
    setanyerrrors({
      errorsFlag: false,
      actualErrors: ''
    });

    let results;
    try {
      URL = 'http://localhost:8080/createcourse';
      results = await Axios({
        method: 'post',
        url: URL,
        data: {
          courseName: coursecreate.courseName,
          availableseats: coursecreate.availableseats,
          startdate: coursecreate.startdate,
          enddate: coursecreate.enddate,
          level: coursecreate.level,
          prereq: coursecreate.prereq,
          prof_id: coursecreate.prof_id
        }
      });
      console.log({ message: results });

      setcoursecreate({
        courseName: '',
        availableseats: '',
        startdate: '',
        enddate: '',
        level: '',
        prereq: '',
        prof_id: ''
      });
    } catch (error) {
      setanyerrrors({
        errorsFlag: true,
        actualErrors: error.response.data.message
      });
      return;
    }
  };
  return (
    <div>
      {/* <p>Blah{coursecreate.courseName}</p> */}
      <Form onSubmit={handlSubmit} style={{ backgroundColor: '#a8e5ee' }}>
        <Form.Field Required>
          <label>Course title</label>
          <input
            name={coursecreate.courseName}
            placeholder="Enter Course Title"
            onChange={e =>
              setcoursecreate({
                ...coursecreate,
                courseName: e.target.value
              })
            }
            type="text"
          />
        </Form.Field>
        <Form.Field Required>
          <label>Available Seats</label>
          <input
            value={coursecreate.availableseats}
            name="availableseats"
            placeholder="Enter Available Seats"
            onChange={e =>
              setcoursecreate({
                ...coursecreate,
                availableseats: e.target.value
              })
            }
          />
        </Form.Field>
        <Form.Field Required>
          <label>Course Level</label>
          <input
            value={coursecreate.level}
            name="level"
            placeholder="Enter phone"
            onChange={e =>
              setcoursecreate({ ...coursecreate, level: e.target.value })
            }
          />
        </Form.Field>

        <Form.Field Required>
          <label>PreRequisite</label>
          <input
            value={coursecreate.prereq}
            name="prereq"
            placeholder=" Required Prerequistes "
            onChange={e =>
              setcoursecreate({ ...coursecreate, prereq: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <input
            type="hidden"
            value={coursecreate.prof_id}
            name="prof_id"
            // placeholder="Enter Your ID"
            onChange={e =>
              setcoursecreate({ ...coursecreate, prof_id: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field Required>
          <label>Start Date </label>
          <input
            value={coursecreate.startdate}
            name="startdate"
            placeholder="Start Date"
            onChange={e =>
              setcoursecreate({ ...coursecreate, startdate: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field Required>
          <label>End Date: </label>
          <input
            value={coursecreate.enddate}
            name="enddate"
            placeholder=" End Date"
            onChange={e =>
              setcoursecreate({ ...coursecreate, enddate: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field Required>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button primary>Submit</Button>
      </Form>

      {/* <form onSubmit={handlSubmit}>
        <input
          type="text"
          name={coursecreate.courseName}
          placeholder="Course title"
          onChange={e =>
            setcoursecreate({
              ...coursecreate,
              courseName: e.target.value
            })
          }
        />
        <input
          name="availableseats"
          value={coursecreate.availableseats}
          placeholder=" Available seats"
          onChange={e =>
            setcoursecreate({ ...coursecreate, availableseats: e.target.value })
          }
        />
        <input
          name="level"
          value={coursecreate.level}
          placeholder=" Course Level"
          onChange={e =>
            setcoursecreate({ ...coursecreate, level: e.target.value })
          }
        />
        <input
          name="prereq"
          value={coursecreate.prereq}
          placeholder=" Required Prerequistes "
          onChange={e =>
            setcoursecreate({ ...coursecreate, prereq: e.target.value })
          }
        />
        <input
          name="prof_id"
          value={coursecreate.prof_id}
          // placeholder=" Cant populate this"
          onChange={e =>
            setcoursecreate({ ...coursecreate, prof_id: e.target.value })
          }
        />
        <input
          name="startdate"
          value={coursecreate.startdate}
          placeholder="Start Date"
          onChange={e =>
            setcoursecreate({ ...coursecreate, startdate: e.target.value })
          }
        />
        <input
          name="enddate"
          value={coursecreate.enddate}
          placeholder=" End Date"
          onChange={e =>
            setcoursecreate({ ...coursecreate, enddate: e.target.value })
          }
        />
        <button>Submit</button>
      </form> */}
    </div>
  );
}

export default CreateCourse;
