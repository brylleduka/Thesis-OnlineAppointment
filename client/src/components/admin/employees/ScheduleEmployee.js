import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { DGrid, DCard, Content } from "../../styled/containers";
import {
  DLabel,
  IconWrap,
  DSelect,
  DButton,
  CheckLabel,
} from "../../styled/utils";
import CheckboxGroup from "react-checkbox-group";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
import { Save } from "@styled-icons/boxicons-solid/Save";
import useWindowSize from "../../../util/hooks/useWindowSize";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";

const ScheduleEmployee = ({ employee }) => {
  const { width: wid } = useWindowSize();
  const { employeeAuth } = useContext(AuthContext);
  const [days, setDays] = useState(employee.schedule.day);
  const [isEditSched, setIsEditSched] = useState(false);
  const [schedValues, setSchedValues] = useState({
    workStart: employee.schedule.workStart,
    workLength: employee.schedule.workLength / 60,
    breakStart: employee.schedule.breakStart,
    breakLength: employee.schedule.breakLength / 60,
  });

  const [updateSchedule, { loading: loadSchedule }] = useMutation(
    UPDATE_EMPLOYEE_SCHEDULE,
    {
      variables: {
        employeeId: employee._id,
        workStart: schedValues.workStart,
        breakStart: schedValues.breakStart,
        workLength: parseInt(parseFloat(schedValues.workLength) * 60),
        breakLength: parseInt(parseFloat(schedValues.breakLength) * 60),
        day: days,
      },
      refetchQueries: [
        {
          query: FETCH_EMPLOYEE_QUERY,
          variables: { employeeId: employee._id },
        },
      ],
      onError(err) {
        console.log(err);
        //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      onCompleted() {
        setIsEditSched(false);
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Schedule Updated
          </Toasted>
        ));
      },
    }
  );

  const handleEditSched = () => {
    setIsEditSched(!isEditSched);
  };

  const handleSchedChange = (e) => {
    setSchedValues({ ...schedValues, [e.target.name]: e.target.value });
  };

  const handleUpdateSched = () => {
    updateSchedule();
  };

  return (
    <Content width="100%" height="100%">
      <DGrid gap="10px" med10="1fr" med7="1fr">
        <DCard dw="100%" dh="100%" p="10px" flex fcol justifyBetween>
          <Content
            flex
            width="100%"
            height="auto"
            justify="space-between"
            align="center"
          >
            <DLabel
              size={wid < 768 ? "18px !important" : "22px"}
              weight={700}
              pad="0"
            >
              Schedule Details
            </DLabel>
            {(employeeAuth.role === "ADMIN" || employeeAuth.level > 2) && (
              <>
                <IconWrap
                  invisible={isEditSched ? true : null}
                  bgcolor={({ theme }) => theme.blue}
                  medium
                  title={"Update Info"}
                  topright
                  circle
                  shadow
                  pad="3px"
                >
                  <Edit onClick={handleEditSched} />
                </IconWrap>

                <IconWrap
                  invisible={!isEditSched ? true : null}
                  medium
                  title={"Cancel Update"}
                  topright
                  circle
                  shadow
                  color="red"
                >
                  <Cancel onClick={handleEditSched} />
                </IconWrap>
              </>
            )}
          </Content>
          <Content height="100%" width="100%">
            <DGrid custom="1fr 2fr">
              <Content
                flex
                width="90%"
                height="300px"
                flex
                justify="center"
                align="center"
                direct="column"
                margin="0 auto"
                style={
                  wid < 768
                    ? { borderBottom: "1px solid #ccc" }
                    : { borderRight: "1px solid #ccc" }
                }
              >
                <DLabel
                  size={wid < 768 ? "14px !important" : "18px"}
                  weight={700}
                >
                  Work Days
                </DLabel>
                <Content
                  width="100%"
                  height="100%"
                  flex
                  justify="space-around"
                  align="flex-start"
                  direct="column"
                  pad="0 20px"
                  margin="0 auto"
                >
                  <CheckboxGroup
                    name="days"
                    value={days}
                    onChange={setDays}
                    style={{ position: "relative" }}
                  >
                    {(Checkbox) => (
                      <>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox
                            value="Sun"
                            disabled={isEditSched ? false : true}
                          />
                          <div className="state p-info-o p-on">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "bluer" : "blue"}
                            >
                              Sunday
                            </CheckLabel>
                          </div>
                          <div className="state p-off">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "dark" : "grey"}
                            >
                              Sunday
                            </CheckLabel>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox
                            value="Mon"
                            disabled={isEditSched ? false : true}
                          />
                          <div className="state p-info-o p-on">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "bluer" : "blue"}
                            >
                              Monday
                            </CheckLabel>
                          </div>
                          <div className="state p-off">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "dark" : "grey"}
                            >
                              Monday
                            </CheckLabel>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox
                            value="Tue"
                            disabled={isEditSched ? false : true}
                          />
                          <div className="state p-info-o p-on">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "bluer" : "blue"}
                            >
                              Tuesday
                            </CheckLabel>
                          </div>
                          <div className="state p-off">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "dark" : "grey"}
                            >
                              Tuesday
                            </CheckLabel>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox
                            value="Wed"
                            disabled={isEditSched ? false : true}
                          />
                          <div className="state p-info-o p-on">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "bluer" : "blue"}
                            >
                              Wednesday
                            </CheckLabel>
                          </div>
                          <div className="state p-off">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "dark" : "grey"}
                            >
                              Wednesday
                            </CheckLabel>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox
                            value="Thu"
                            disabled={isEditSched ? false : true}
                          />
                          <div className="state p-info-o p-on">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "bluer" : "blue"}
                            >
                              Thursday
                            </CheckLabel>
                          </div>
                          <div className="state p-off">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "dark" : "grey"}
                            >
                              Thursday
                            </CheckLabel>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox
                            value="Fri"
                            disabled={isEditSched ? false : true}
                          />
                          <div className="state p-info-o p-on">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "bluer" : "blue"}
                            >
                              Friday
                            </CheckLabel>
                          </div>
                          <div className="state p-off">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "dark" : "grey"}
                            >
                              Friday
                            </CheckLabel>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox
                            value="Sat"
                            disabled={isEditSched ? false : true}
                          />
                          <div className="state p-info-o p-on">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "bluer" : "blue"}
                            >
                              Saturday
                            </CheckLabel>
                          </div>
                          <div className="state p-off">
                            <CheckLabel
                              textt="uppercase"
                              color={isEditSched ? "dark" : "grey"}
                            >
                              Saturday
                            </CheckLabel>
                          </div>
                        </div>
                      </>
                    )}
                  </CheckboxGroup>
                </Content>
              </Content>
              <Content
                height="300px"
                width="100%"
                margin="0 auto"
                flex
                justify="flex-start"
                align="center"
                direct="column"
              >
                <DLabel
                  size={wid < 768 ? "14px !important" : "18px"}
                  weight={700}
                >
                  Work Hours
                </DLabel>
                <Content
                  height="auto"
                  width="100%"
                  flex
                  justify="space-around"
                  align="center"
                  margin="5px auto"
                >
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                    pad="5px 10px"
                  >
                    <DLabel weight={500} size="13px" rounded color="bluer">
                      Start of Work
                    </DLabel>
                    {isEditSched ? (
                      <DSelect
                        name="workStart"
                        onChange={handleSchedChange}
                        value={schedValues.workStart}
                      >
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
                      </DSelect>
                    ) : (
                      <DLabel weight={700} size="16px" flex justifyCenter>
                        {employee.schedule.workStart}
                      </DLabel>
                    )}
                  </Content>
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                  >
                    <DLabel weight={500} size="13px" rounded color="bluer">
                      Work Length
                    </DLabel>
                    {isEditSched ? (
                      <DSelect
                        onChange={handleSchedChange}
                        value={schedValues.workLength}
                        name="workLength"
                      >
                        <option></option>
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
                      </DSelect>
                    ) : (
                      <DLabel weight={700} size="16px" flex justifyCenter>
                        {employee.schedule.workLength / 60 === 0.5
                          ? employee.schedule.workLength
                          : employee.schedule.workLength / 60}{" "}
                        {employee.schedule.workLength / 60 === 0.5
                          ? "mins"
                          : employee.schedule.workLength / 60 === 1
                          ? "hour"
                          : "hours"}
                      </DLabel>
                    )}
                  </Content>
                </Content>
                <Content
                  height="auto"
                  width="100%"
                  flex
                  justify="space-around"
                  align="center"
                  margin="5px auto"
                >
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                  >
                    <DLabel weight={500} size="13px" rounded color="bluer">
                      Start of Break
                    </DLabel>
                    {isEditSched ? (
                      <DSelect
                        onChange={handleSchedChange}
                        value={schedValues.breakStart}
                        name="breakStart"
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
                      </DSelect>
                    ) : (
                      <DLabel weight={700} size="16px" flex justifyCenter>
                        {employee.schedule.breakStart}
                      </DLabel>
                    )}
                  </Content>
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                  >
                    <DLabel weight={500} size="13px" rounded color="bluer">
                      Break Length
                    </DLabel>
                    {isEditSched ? (
                      <DSelect
                        onChange={handleSchedChange}
                        value={schedValues.breakLength}
                        name="breakLength"
                      >
                        <option></option>
                        <option value={"0.5"}>30 mins</option>
                        <option value={"1"}>1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                      </DSelect>
                    ) : (
                      <DLabel weight={700} size="16px" flex justifyCenter>
                        {employee.schedule.breakLength / 60 === 0.5
                          ? employee.schedule.breakLength
                          : employee.schedule.breakLength / 60}{" "}
                        {employee.schedule.breakLength / 60 === 0.5
                          ? "mins"
                          : employee.schedule.breakLength / 60 === 1
                          ? "hour"
                          : "hours"}
                      </DLabel>
                    )}
                  </Content>
                </Content>
              </Content>
            </DGrid>
          </Content>

          <Content
            flex
            width="100%"
            height="100%"
            justify="flex-end"
            align="center"
            invisible={isEditSched ? false : true}
          >
            <DButton confirm flex onClick={handleUpdateSched}>
              {loadSchedule ? (
                <Spinner tiny row inverted content="Loading..." />
              ) : (
                <>
                  <Save size="22px" title="Update Content" />
                  Save
                </>
              )}
            </DButton>
          </Content>
        </DCard>
      </DGrid>
    </Content>
  );
};

const UPDATE_EMPLOYEE_SCHEDULE = gql`
  mutation updateSchedule(
    $employeeId: ID!
    $day: [String]
    $workStart: String
    $workLength: Int
    $breakStart: String
    $breakLength: Int
  ) {
    updateSchedule(
      _id: $employeeId
      day: $day
      workStart: $workStart
      workLength: $workLength
      breakStart: $breakStart
      breakLength: $breakLength
    ) {
      _id
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

export default ScheduleEmployee;
