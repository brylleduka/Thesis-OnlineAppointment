import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { DCard, Content } from "../../styled/containers";
import { DLabel, IconWrap, DInput, DSelect, DButton } from "../../styled/utils";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
// import { Cancel } from "@styled-icons/typicons/Cancel";

import DatePicker from "react-datepicker";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import DTextArea from "../../DTextArea";
import moment from "moment";
import parser from "html-react-parser";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import useWindowSize from "../../../util/hooks/useWindowSize";

const regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
const regexNum = /^\d+$/;

const PersonalCard = ({ employee }) => {
  const { width: wid } = useWindowSize();
  const { employeeAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isEditPersonal, setIsEditPersonal] = useState(false);
  const [startDate, setStartDate] = useState(
    employee.dateOfBirth ? new Date(parseInt(employee.dateOfBirth)) : new Date()
  );
  const [content, setContent] = useState(employee.bio);
  const [personalValue, setPersonalValue] = useState({
    title: employee.title,
    firstName: employee.firstName,
    lastName: employee.lastName,
    contact: employee.contact,
    email: employee.email,
  });

  const [updatePersonalEmployee, { loading }] = useMutation(
    UPDATE_EMPLOYEE_PERSONAL,
    {
      variables: {
        employeeId: employee._id,
        title: personalValue.title,
        firstName: personalValue.firstName,
        lastName: personalValue.lastName,
        contact: personalValue.contact,
        email: personalValue.email,
        bio: content,
        dob: startDate,
      },
      refetchQueries: [
        {
          query: FETCH_EMPLOYEE_QUERY,
          variables: { employeeId: employee._id },
        },
      ],
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      onCompleted() {
        setIsEditPersonal(false);
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Info Updated
          </Toasted>
        ));
      },
    }
  );

  const handlePersonalValue = (e) => {
    setPersonalValue({ ...personalValue, [e.target.name]: e.target.value });
  };

  const handleDateChanged = (date) => {
    setStartDate(date);
  };

  const handleEditPersonal = () => {
    setIsEditPersonal(!isEditPersonal);
  };

  const handleUpdatePersonal = () => {
    updatePersonalEmployee();
  };

  return (
    <DCard dw="100%" dh="100%" flex fcol justifyBetween overf>
      <Content
        flex
        width="100%"
        height="auto"
        justify="space-between"
        align="center"
      >
        <DLabel size={wid < 768 ? "18px !important" : "22px"} weight={700}>
          Personal Details
        </DLabel>
        {(employeeAuth.role === "ADMIN" || employeeAuth.level > 2) && (
          <>
            <IconWrap
              invisible={isEditPersonal ? true : null}
              bgcolor={({ theme }) => theme.blue}
              medium
              title={"Update Info"}
              topright
              circle
              shadow
              pad="3px"
            >
              <Edit onClick={handleEditPersonal} />
            </IconWrap>

            <IconWrap
              invisible={!isEditPersonal ? true : null}
              medium
              title={"Cancel Update"}
              topright
              circle
              shadow
              color="red"
            >
              <Cancel onClick={handleEditPersonal} />
            </IconWrap>
          </>
        )}
      </Content>

      <Content
        width={wid <= 768 ? "90%" : "80%"}
        height="100%"
        margin="0 auto"
        flex
        justify="flex-start"
        align="center"
        direct="column"
      >
        {isEditPersonal ? (
          <>
            <Content
              height="auto"
              width="100%"
              flex
              justify="flex-start"
              align="center"
            >
              <DLabel
                flex
                justifyEnd
                alignCenter
                weight={700}
                w={"40%"}
                size="14px"
              >
                Title:
              </DLabel>
              <Content
                height="auto"
                width="100%"
                flex
                justify="flex-start"
                align="center"
                pad="5px 10px"
              >
                <DSelect
                  name="title"
                  value={personalValue.title}
                  onChange={handlePersonalValue}
                >
                  <option>Dr</option>
                  <option>Mr</option>
                  <option>Ms</option>
                </DSelect>
              </Content>
            </Content>
            <Content
              height="auto"
              width="100%"
              flex
              justify="flex-start"
              align="center"
            >
              <DLabel
                flex
                justifyEnd
                alignCenter
                weight={700}
                w={"40%"}
                size="14px"
              >
                First Name:
              </DLabel>
              <Content
                height="auto"
                width="100%"
                flex
                justify="flex-start"
                align="center"
                pad="5px 10px"
                direct="column"
              >
                {personalValue.firstName.trim() !== "" ? (
                  ""
                ) : errors.firstName ? (
                  <DLabel rounded pointer color={"red"}>
                    {errors.firstName}
                  </DLabel>
                ) : (
                  ""
                )}

                <DInput
                  fluid
                  error={
                    personalValue.firstName.trim() !== ""
                      ? null
                      : errors.firstName
                      ? true
                      : null
                  }
                  type="text"
                  name="firstName"
                  value={personalValue.firstName}
                  onChange={handlePersonalValue}
                />
              </Content>
            </Content>
            <Content
              height="auto"
              width="100%"
              flex
              justify="flex-start"
              align="center"
            >
              <DLabel
                flex
                justifyEnd
                alignCenter
                weight={700}
                w={"40%"}
                size="14px"
              >
                Last Name:
              </DLabel>
              <Content
                height="auto"
                width="100%"
                flex
                justify="flex-start"
                align="center"
                pad="5px 10px"
                direct="column"
              >
                {personalValue.lastName.trim() !== "" ? (
                  ""
                ) : errors.lastName ? (
                  <DLabel rounded pointer color={"red"}>
                    {errors.lastName}
                  </DLabel>
                ) : (
                  ""
                )}
                <DInput
                  error={
                    personalValue.lastName.trim() !== ""
                      ? null
                      : errors.lastName
                      ? true
                      : null
                  }
                  fluid
                  type="text"
                  name="lastName"
                  value={personalValue.lastName}
                  onChange={handlePersonalValue}
                />
              </Content>
            </Content>
          </>
        ) : (
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
          >
            <DLabel
              flex
              justifyEnd
              alignCenter
              weight={700}
              w={"40%"}
              size="14px"
            >
              Name:
            </DLabel>
            <Content
              height="auto"
              width="100%"
              flex
              justify="flex-start"
              align="center"
              pad="5px 10px"
            >
              <DLabel flex justifyEnd alignCenter weight={500} size="16px">
                {employee.title}. {employee.firstName} {employee.lastName}
              </DLabel>
            </Content>
          </Content>
        )}

        <Content
          width="100%"
          flex
          justify="center"
          align="center"
          style={{ zIndex: 10 }}
        >
          <DLabel
            flex
            justifyEnd
            alignCenter
            weight={700}
            w={"40%"}
            size="14px"
          >
            Date of Birth:
          </DLabel>
          <Content
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
          >
            {isEditPersonal ? (
              <DatePicker
                selected={startDate}
                onChange={handleDateChanged}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="datepicker"
              />
            ) : (
              <DLabel flex justifyEnd alignCenter weight={500} size="16px">
                {employee.dateOfBirth &&
                  moment(parseInt(employee.dateOfBirth)).format("LL")}
              </DLabel>
            )}
          </Content>
        </Content>

        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel
            flex
            justifyEnd
            alignCenter
            weight={700}
            w={"40%"}
            size="14px"
          >
            Contact:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="flex-start"
            pad="5px 10px"
            direct="column"
          >
            {isEditPersonal ? (
              <>
                {regexNum.test(personalValue.contact) &&
                personalValue.contact.length === 11 ? (
                  ""
                ) : errors.contactX || errors.contactNum ? (
                  <DLabel rounded pointer color={"red"}>
                    Contact number must only contain number and must be 11
                    digits
                  </DLabel>
                ) : (
                  ""
                )}

                <DInput
                  error={
                    regexNum.test(personalValue.contact) &&
                    personalValue.contact.length === 11
                      ? null
                      : errors.contactX || errors.contactNum
                      ? true
                      : null
                  }
                  fluid
                  type="text"
                  name="contact"
                  value={personalValue.contact}
                  onChange={handlePersonalValue}
                />
              </>
            ) : (
              <DLabel flex justifyEnd alignCenter weight={500} size="16px">
                {employee.contact}
              </DLabel>
            )}
          </Content>
        </Content>
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel
            flex
            justifyEnd
            alignCenter
            weight={700}
            w={"40%"}
            size="14px"
          >
            Email:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="flex-start"
            pad="5px"
            direct="column"
          >
            {isEditPersonal ? (
              <>
                {personalValue.email.match(regex) ? (
                  ""
                ) : errors.emailX || errors.email ? (
                  <DLabel rounded pointer color={"red"}>
                    {errors.emailX || errors.email}
                  </DLabel>
                ) : (
                  ""
                )}

                <DInput
                  error={
                    personalValue.email.match(regex)
                      ? null
                      : errors.emailX || errors.email
                      ? true
                      : null
                  }
                  fluid
                  type="text"
                  name="email"
                  value={personalValue.email}
                  onChange={handlePersonalValue}
                />
              </>
            ) : (
              <DLabel
                flex
                justifyEnd
                alignCenter
                weight={500}
                size="14px"
                breakWord
              >
                {employee.email}
              </DLabel>
            )}
          </Content>
        </Content>

        <Content
          width="100%"
          height="100%"
          flex
          justify="flex-start"
          align="flex-start"
          direct="column"
          margin="12px auto"
        >
          <DLabel
            flex
            justifyEnd
            alignCenter
            weight={700}
            w={"40%"}
            size="14px"
          >
            Bio:
          </DLabel>
          <Content
            width="100%"
            height="auto"
            flex
            justify="center"
            align="center"
            pad="3px 15px"
          >
            <DTextArea border active={isEditPersonal ? true : null}>
              <CKEditor
                onInit={(editor) => {
                  // Insert the toolbar before the editable area.
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                editor={DecoupledEditor}
                data={content}
              />
            </DTextArea>

            <DTextArea
              border
              active={!isEditPersonal ? true : null}
              color={!content ? "#ccc" : null}
            >
              {content
                ? parser(content)
                : `Write something about ${employee.title}. ${employee.firstName} ${employee.lastName} ...`}
            </DTextArea>
          </Content>
        </Content>
      </Content>
      {isEditPersonal && (
        <Content flex width="100%" justify="flex-end" align="center">
          <DButton confirm onClick={handleUpdatePersonal}>
            {loading ? (
              <Spinner inverted row small content="Loading..." />
            ) : (
              "Update"
            )}
          </DButton>
        </Content>
      )}
    </DCard>
  );
};

export const UPDATE_EMPLOYEE_PERSONAL = gql`
  mutation updatePersonalEmployee(
    $employeeId: ID!
    $title: String
    $firstName: String
    $lastName: String
    $email: String
    $contact: String
    $dob: String
    $bio: String
  ) {
    updatePersonalEmployee(
      _id: $employeeId
      title: $title
      firstName: $firstName
      lastName: $lastName
      email: $email
      contact: $contact
      dateOfBirth: $dob
      bio: $bio
    ) {
      _id
      empId
      title
      firstName
      lastName
      email
      contact
      dateOfBirth
      bio
    }
  }
`;

export default PersonalCard;
