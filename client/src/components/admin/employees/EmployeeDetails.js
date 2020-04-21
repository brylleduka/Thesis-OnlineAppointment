import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { Form, Label } from "semantic-ui-react";
import { Content, DGrid, DSection } from "../../styled/containers";
import { Toasted, DButton } from "../../styled/utils";
import toaster from "toasted-notes";
import JoditEditor from "jodit-react";
import CheckboxGroup from "react-checkbox-group";
import Spinner from "../../Spinner";

const config = {
  readonly: false,
};
let daay = [];

const EmployeeDetails = ({ employee }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const editor = useRef(null);
  const [content, setContent] = useState(employee.bio);
  const [days, setDays] = useState(employee.schedule.day);

  //   QUERY
  const { values, handleChange, handleSubmit } = useForm(
    updateEmployeeCallback,
    {
      title: employee.title,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      contact: employee.contact,
      role: employee.role,
      workStart: employee.schedule.workStart,
      workLength: employee.schedule.workLength / 60,
      breakStart: employee.schedule.breakStart,
      breakLength: employee.schedule.breakLength / 60,
    }
  );

  const [updateEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE_DETAILS, {
    variables: {
      employeeId: employee._id,
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contact: values.contact,
      role: values.role,
      workStart: values.workStart,
      breakStart: values.breakStart,
      workLength: parseInt(parseFloat(values.workLength) * 60),
      breakLength: parseInt(parseFloat(values.breakLength) * 60),
      day: days,
      bio: content,
    },
    onError(err) {
      console.log(err);
      //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(result) {
      toaster.notify(({ onClose }) => (
        <Toasted status={"success"}>
          <span className="description">Service Updated</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </Toasted>
      ));
    },
  });

  function updateEmployeeCallback() {
    updateEmployee();
  }

  return (
    <>
      <DSection margin="40px 0">
        <DGrid two gap="20px">
          <Content
            width="100%"
            pad="0 15px 15px 0"
            style={{ borderRight: "1px solid #ccc" }}
          >
            <h2>Employee Details</h2>
            <Form noValidate>
              <Form.Field width="six">
                <label>ID</label>
                <input value={employee.empId} readOnly />
              </Form.Field>
              <Form.Group width="equal">
                <Form.Field width="four">
                  <label>Title</label>
                  <select
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  >
                    <option value={employee.title}>{employee.title}</option>
                    <option disabled>-------</option>
                    <option value="Dr">Dr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mr">Mr</option>
                  </select>
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Form.Field>
              <Form.Field>
                <label>Contact</label>
                <input
                  name="contact"
                  onChange={handleChange}
                  value={values.contact}
                />
              </Form.Field>
              <Form.Field>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {}}
                />
              </Form.Field>
              <DButton>Change Password</DButton>
            </Form>
          </Content>
          <Content width="100%" flex direct="column">
            <h2>Schedule Details</h2>
            <Form style={{ padding: "40px 0 0 0" }}>
              <Form.Group inline>
                <CheckboxGroup name="days" value={days} onChange={setDays}>
                  {(Checkbox) => (
                    <>
                      <div className="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Sun" />
                        <div className="state p-info-o">
                          <label>Sun</label>
                        </div>
                      </div>
                      <div className="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Mon" />
                        <div className="state p-info-o">
                          <label>Mon</label>
                        </div>
                      </div>
                      <div className="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Tue" />
                        <div className="state p-info-o">
                          <label>Tue</label>
                        </div>
                      </div>
                      <div className="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Wed" />
                        <div className="state p-info-o">
                          <label>Wed</label>
                        </div>
                      </div>
                      <div className="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Thu" />
                        <div className="state p-info-o">
                          <label>Thu</label>
                        </div>
                      </div>
                      <div className="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Fri" />
                        <div className="state p-info-o">
                          <label>Fri</label>
                        </div>
                      </div>
                      <div className="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Sat" />
                        <div className="state p-info-o">
                          <label>Sat</label>
                        </div>
                      </div>
                    </>
                  )}
                </CheckboxGroup>
              </Form.Group>
              <Form.Group widths="equal" style={{ marginTop: "50px" }}>
                <Form.Field>
                  <label>Start Time</label>
                  <Label>{employee.schedule.workStart}</Label>
                  <select
                    name="workStart"
                    onChange={handleChange}
                    value={values.workStart}
                  >
                    <option></option>
                    <option value="6:00 AM">6:00 AM</option>
                    <option value="7:00 AM">7:00 AM</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                  </select>
                </Form.Field>

                <Form.Field>
                  <label>Work Length</label>
                  <Label>{employee.schedule.workLength / 60} hour</Label>
                  <select
                    className="ui dropdown"
                    onChange={handleChange}
                    value={values.workLength}
                    name="workLength"
                  >
                    <option></option>
                    <option value={"1"}>1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="5">5 hours</option>
                    <option value="6">6 hours</option>
                    <option value="7">7 hours</option>
                    <option value="8">8 hours</option>
                    <option value="9">9 hours</option>
                    <option value="10">10 hours</option>
                    <option value="11">11 hours</option>
                    <option value="12">12 hours</option>
                  </select>
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Break Time</label>
                  <Label>{employee.schedule.breakStart}</Label>
                  <select
                    className="ui dropdown"
                    name="breakStart"
                    onChange={handleChange}
                    value={values.breakStart}
                  >
                    <option></option>
                    <option value="6:00 AM">6:00 AM</option>
                    <option value="7:00 AM">7:00 AM</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                  </select>
                </Form.Field>

                <Form.Field>
                  <label>Break Length</label>
                  <Label>{employee.schedule.breakLength / 60} hour</Label>
                  <select
                    className="ui dropdown"
                    onChange={handleChange}
                    value={values.breakLength}
                    name="breakLength"
                  >
                    <option></option>
                    <option value={"1"}>1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="5">5 hours</option>
                    <option value="6">6 hours</option>
                  </select>
                </Form.Field>
              </Form.Group>
              <Content width="100%" flex justify="flex-end">
                <DButton confirm onClick={handleSubmit}>
                  {loading ? <Spinner small inverted /> : "Save"}
                </DButton>
                <DButton alert onClick={() => setOpen(true)}>
                  Delete
                </DButton>
              </Content>
            </Form>
          </Content>
        </DGrid>
      </DSection>
    </>
  );
};

export const UPDATE_EMPLOYEE_DETAILS = gql`
  mutation updateEmployee(
    $employeeId: ID!
    $title: String
    $firstName: String
    $lastName: String
    $email: String
    $contact: String
    $role: String
    $bio: String
    $day: [String]
    $workStart: String
    $workLength: Int
    $breakStart: String
    $breakLength: Int
  ) {
    updateEmployee(
      _id: $employeeId
      title: $title
      firstName: $firstName
      lastName: $lastName
      email: $email
      contact: $contact
      role: $role
      bio: $bio
      day: $day
      workStart: $workStart
      workLength: $workLength
      breakStart: $breakStart
      breakLength: $breakLength
    ) {
      _id
      empId
      title
      firstName
      lastName
      email
      contact
      role
      bio
      schedule {
        _id
        day
        workStart
        workLength
        breakLength
        breakStart
      }
    }
  }
`;

export default EmployeeDetails;
