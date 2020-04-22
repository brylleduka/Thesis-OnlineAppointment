import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { DGrid, DCard, Content } from "../../styled/containers";
import { DLabel, IconWrap, DInput, DSelect, DButton } from "../../styled/utils";
import CheckboxGroup from "react-checkbox-group";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
import useWindowSize from "../../../util/hooks/useWindowSize";

const ScheduleEmployee = ({ employee }) => {
  const { width: wid } = useWindowSize();
  const { employeeAuth } = useContext(AuthContext);
  const [days, setDays] = useState(employee.schedule.day);
  const [isEditSched, setIsEditSched] = useState(false);

  const handleEditSched = () => {
    setIsEditSched(!isEditSched);
  };

  return (
    <Content width="100%" height="100%">
      <DGrid gap="10px" med10="1fr" med7="1fr">
        <DCard dw="100%" dh="100%" p="10px 20px">
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
                  color={"green"}
                  medium
                  title={"Update Info"}
                  topright
                >
                  <Edit onClick={handleEditSched} />
                </IconWrap>

                <IconWrap
                  invisible={!isEditSched ? true : null}
                  color={"red"}
                  medium
                  title={"Cancel Update"}
                  topright
                >
                  <Cancel onClick={handleEditSched} />
                </IconWrap>
              </>
            )}
          </Content>
          <Content height="100%" width="100%">
            <DGrid two gap="10px">
              <Content
                flex
                width="80%"
                height="300px"
                flex
                justify="flex-start"
                align="flex-start"
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
                          <Checkbox value="Sun" />
                          <div className="state p-info-o p-on">
                            <label
                              style={{ fontWeight: 700, color: "#2193b0" }}
                            >
                              Sunday
                            </label>
                          </div>
                          <div className="state p-off">
                            <label
                              style={{ fontWeight: 700, color: "#D3CCE3" }}
                            >
                              Sunday
                            </label>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox value="Mon" />
                          <div className="state p-info-o p-on">
                            <label
                              style={{ fontWeight: 700, color: "#2193b0" }}
                            >
                              Monday
                            </label>
                          </div>
                          <div className="state p-off">
                            <label
                              style={{ fontWeight: 700, color: "#D3CCE3" }}
                            >
                              Monday
                            </label>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox value="Tue" />
                          <div className="state p-info-o p-on">
                            <label
                              style={{ fontWeight: 700, color: "#2193b0" }}
                            >
                              Tuesday
                            </label>
                          </div>
                          <div className="state p-off">
                            <label
                              style={{ fontWeight: 700, color: "#D3CCE3" }}
                            >
                              Tuesday
                            </label>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox value="Wed" />
                          <div className="state p-info-o p-on">
                            <label
                              style={{ fontWeight: 700, color: "#2193b0" }}
                            >
                              Wednesday
                            </label>
                          </div>
                          <div className="state p-off">
                            <label
                              style={{ fontWeight: 700, color: "#D3CCE3" }}
                            >
                              Wednesday
                            </label>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox value="Thu" />
                          <div className="state p-info-o p-on">
                            <label
                              style={{ fontWeight: 700, color: "#2193b0" }}
                            >
                              Thursday
                            </label>
                          </div>
                          <div className="state p-off">
                            <label
                              style={{ fontWeight: 700, color: "#D3CCE3" }}
                            >
                              Thursday
                            </label>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox value="Fri" />
                          <div className="state p-info-o p-on">
                            <label
                              style={{ fontWeight: 700, color: "#2193b0" }}
                            >
                              Friday
                            </label>
                          </div>
                          <div className="state p-off">
                            <label
                              style={{ fontWeight: 700, color: "#D3CCE3" }}
                            >
                              Friday
                            </label>
                          </div>
                        </div>
                        <div className="pretty p-default p-curve p-thick p-smooth p-toggle">
                          <Checkbox value="Sat" />
                          <div className="state p-info-o p-on">
                            <label
                              style={{ fontWeight: 700, color: "#2193b0" }}
                            >
                              Saturday
                            </label>
                          </div>
                          <div className="state p-off">
                            <label
                              style={{ fontWeight: 700, color: "#D3CCE3" }}
                            >
                              Saturday
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </CheckboxGroup>
                </Content>
              </Content>
              <Content
                height="auto"
                width="90%"
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
                >
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                  >
                    <DLabel weight={500} size="13px" rounded bgcolor="#ccc">
                      Start of Work
                    </DLabel>
                    <DSelect>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                    </DSelect>
                  </Content>
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                  >
                    <DLabel weight={500} size="13px" rounded bgcolor="#ccc">
                      Start of Work
                    </DLabel>
                    <DSelect>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                    </DSelect>
                  </Content>
                </Content>
                <Content
                  height="auto"
                  width="100%"
                  flex
                  justify="space-around"
                  align="center"
                >
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                  >
                    <DLabel weight={500} size="13px" rounded bgcolor="#ccc">
                      Start of Break
                    </DLabel>
                    <DSelect>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                    </DSelect>
                  </Content>
                  <Content
                    height="auto"
                    width="100%"
                    flex
                    justify="center"
                    align="center"
                    direct="column"
                  >
                    <DLabel weight={500} size="13px" rounded bgcolor="#ccc">
                      Break Hour(s)
                    </DLabel>
                    <DSelect>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                      <option>9:00 AM</option>
                    </DSelect>
                  </Content>
                </Content>
              </Content>
            </DGrid>
          </Content>
        </DCard>
      </DGrid>
    </Content>
  );
};

export default ScheduleEmployee;
