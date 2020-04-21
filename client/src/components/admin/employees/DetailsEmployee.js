import React from "react";

import { DGrid, Content } from "../../styled/containers";
import { DButton, IconWrap } from "../../styled/utils";
import { Delete } from "@styled-icons/material/Delete";
import { Question } from "@styled-icons/remix-fill/Question";
import { Popup } from "semantic-ui-react";

import PersonalCard from "./PersonalCard";
import EmployeeCard from "./EmployeeCard";

const DetailsEmployee = ({ employee }) => {
  return (
    <Content width="100%" height="100%">
      <DGrid gap="10px">
        <PersonalCard employee={employee} />
        <EmployeeCard employee={employee} />

        <Content flex width="100%" justify="flex-end" align="center">
          <DButton flex alert>
            <IconWrap small mcenter title="Delete Employee Info">
              <Delete />
            </IconWrap>
            Delete
          </DButton>
          <Popup
            trigger={
              <IconWrap
                circle
                shadow
                color={({ theme }) => theme.bluer}
                tiny
                mcenter
                title="Info"
              >
                <Question />
              </IconWrap>
            }
            content="Store in archive or permanently delete this employee information."
            inverted
            position="top right"
            size="tiny"
          />
        </Content>
      </DGrid>
    </Content>
  );
};

export default DetailsEmployee;
