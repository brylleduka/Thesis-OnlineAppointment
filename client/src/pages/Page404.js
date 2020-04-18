import React from "react";
import { DContainer, DSection, Content } from "../components/styled/containers";

const Page404 = () => {
  return (
    <DSection
      height="100vh"
      flex
      justify="center"
      align="center"
      bgcolor={({ theme }) => theme.dark}
      className="dark"
    >
      <h1 style={{ fontSize: "100px" }} s>
        PAGE 404
      </h1>
    </DSection>
  );
};

export default Page404;
