import React from "react";
import { DSection } from "../../../styled/containers";

import ArchServCateg from "./ArchServCateg";
import ArchServSub from "./ArchServSub";

const ArchServ = () => {
  return (
    <DSection
      width="100%"
      height="100%"
      mcenter
      flex
      justify="center"
      align="center"
      direct="column"
    >
      <ArchServCateg />
      <ArchServSub />
    </DSection>
  );
};

export default ArchServ;
