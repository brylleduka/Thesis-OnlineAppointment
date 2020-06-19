import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../../util/hooks/useForm";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../util/graphql/employee";
import { Modal, Form } from "semantic-ui-react";
import { DButton } from "../../styled/utils";
import { DGrid, Content } from "../../styled/containers";
import CheckboxGroup from "react-checkbox-group";
import Spinner from "../../Spinner";
import Toasted from "../../Toasted";
import toaster from "toasted-notes";

const NewEmployee = ({ setOpen, open }) => {
  const [errors, setErrors] = useState({});
  const [days, setDays] = useState([]);

  const { values, setValues, handleChange, handleSubmit } = useForm(
    createEmployeeCallback,
    {
      title: "",
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      role: "",
      workStart: "",
      workLength: "",
      breakStart: "",
      breakLength: "",
    }
  );

  const [createEmployee, { loading }] = useMutation(CREATE_EMPLOYEE_MUTATION, {
    variables: {
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      contact: values.contact,
      email: values.email,
      role: values.role,
      workStart: values.workStart,
      workLength: parseInt(values.workLength) * 60,
      breakStart: values.breakStart,
      breakLength: parseInt(values.breakLength) * 60,
      day: days,
    },
    refetchQueries: [{ query: FETCH_EMPLOYEES_NOT_ADMIN_QUERY }],

    // update(cache, result) {
    //   setOpen(false);
    //   const data = cache.readQuery({
    //     query: FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
    //   });

    //   const newEmployee = result.data.createEmployee;
    //   cache.writeQuery({
    //     query: FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
    //     data: {
    //       aestheticiansReceps: [newEmployee, ...data.aestheticiansReceps],
    //     },
    //   });

    //   values.title = "";
    //   values.firstName = "";
    //   values.lastName = "";
    //   values.contact = "";
    //   values.email = "";
    //   values.role = "";
    //   values.workStart = "";
    //   values.workLength = "";
    //   values.breakStart = "";
    //   values.breakLength = "";
    //   days = [];
    // },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(res) {
      setOpen(false);
      setValues({
        title: "",
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        role: "",
        workStart: "",
        workLength: "",
        breakStart: "",
        breakLength: "",
      });
      setDays([]);
      toaster.notify(
        ({ onClose }) => (
          <Toasted success onClick={onClose}>
            New Employee Added
          </Toasted>
        ),
        { position: "bottom-right" }
      );
    },
  });

  // const handleDayChange = (val) => {
  //   setDays(val);
  // };

  function createEmployeeCallback() {
    createEmployee();
  }

  console.log(days);

  return (
    <Modal size={"large"} open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Add New Employee</Modal.Header>
      <Modal.Content>
        <Form noValidate>
          <DGrid two gap="10px">
            <Content width="100%">
              <Form.Group widths="equal">
                <Form.Field width="8">
                  <label>Title</label>
                  <select
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                  >
                    <option></option>
                    <option value="Dr">Dr</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                  </select>
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    placeholder="first Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Contact</label>
                <input
                  placeholder="Contact"
                  name="contact"
                  value={values.contact}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Role</label>
                <select name="role" onChange={handleChange} value={values.role}>
                  <option></option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="AESTHETICIAN">AESTHETICIAN</option>
                  <option value="RECEPTIONIST">RECEPTIONIST</option>
                </select>
              </Form.Field>
            </Content>
            <Content width="100%">
              <Form.Group inline>
                <CheckboxGroup name="days" value={days} onChange={setDays}>
                  {(Checkbox) => (
                    <>
                      <div class="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Sun" />
                        <div class="state p-info-o">
                          <label>Sun</label>
                        </div>
                      </div>
                      <div class="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Mon" />
                        <div class="state p-info-o">
                          <label>Mon</label>
                        </div>
                      </div>
                      <div class="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Tue" />
                        <div class="state p-info-o">
                          <label>Tue</label>
                        </div>
                      </div>
                      <div class="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Wed" />
                        <div class="state p-info-o">
                          <label>Wed</label>
                        </div>
                      </div>
                      <div class="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Thu" />
                        <div class="state p-info-o">
                          <label>Thu</label>
                        </div>
                      </div>
                      <div class="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Fri" />
                        <div class="state p-info-o">
                          <label>Fri</label>
                        </div>
                      </div>
                      <div class="pretty p-default p-curve p-thick p-smooth">
                        <Checkbox value="Sat" />
                        <div class="state p-info-o">
                          <label>Sat</label>
                        </div>
                      </div>
                    </>
                  )}
                </CheckboxGroup>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Start Time</label>
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
            </Content>
          </DGrid>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DButton alert onClick={() => setOpen(false)}>
          Cancel
        </DButton>
        <DButton confirm type="submit" onClick={handleSubmit}>
          {loading ? <Spinner small row content="Loading..." /> : "Add"}
        </DButton>
      </Modal.Actions>
    </Modal>
  );
};

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation createEmployee(
    $title: String!
    $firstName: String!
    $lastName: String!
    $contact: String
    $email: String!
    $role: String!
    $day: [String]
    $workStart: String
    $workLength: Int
    $breakStart: String
    $breakLength: Int
  ) {
    createEmployee(
      employeeInput: {
        title: $title
        firstName: $firstName
        lastName: $lastName
        contact: $contact
        email: $email
        role: $role
      }
      scheduleInput: {
        day: $day
        workStart: $workStart
        workLength: $workLength
        breakStart: $breakStart
        breakLength: $breakLength
      }
    ) {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      photo
      role
      bio
      schedule {
        _id
        day
        workStart
        workLength
        breakStart
        breakLength
      }
    }
  }
`;

export default NewEmployee;
