import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { DGrid } from "../../styled/containers";
import { JCard4, JCard3 } from "../../styled/card";
import parser from "html-react-parser";
import ReadMore from "../../main/utils/ReadMore";

const TeamDetails = ({ employee, cardWidth, cardHeight }) => {
  const [open, setOpen] = useState(false);

  const handleModal = (event) => {
    setOpen(true);
  };

  return (
    <>
      <JCard4 data-emp={employee._id} width={cardWidth} height={cardHeight}>
        <div className="profile-image">
          <img
            src={
              employee.imageURL !== null
                ? employee.imageURL
                : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg"
            }
            alt={employee.photo}
          />
        </div>
        <figcaption>
          <h3>
            {employee.title} {employee.firstName} {employee.lastName}
          </h3>
          <h4>{employee.role}</h4>
          <p>
            {employee.bio.length > 100
              ? parser(employee.bio.substr(0, 100) + "...")
              : parser(employee.bio.substr(0, 100))}
          </p>
          <ReadMore
            hover={0}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onClick={handleModal}
          >
            Read More
          </ReadMore>
          {/* <div className="icons">
            <a href="#">
              <i className="ion-social-reddit"></i>
            </a>
            <a href="#">
              <i className="ion-social-twitter"></i>
            </a>
            <a href="#">
              <i className="ion-social-vimeo"></i>
            </a>
          </div> */}
        </figcaption>
      </JCard4>
      <Modal size="small" open={open} onClose={() => setOpen(false)} closeIcon>
        <DGrid two>
          <Modal.Content>
            <JCard4 top={"-60px"}>
              <div className="profile-image">
                <img
                  src={
                    employee.imageURL !== null
                      ? employee.imageURL
                      : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg"
                  }
                  alt={employee.photo}
                />
              </div>
            </JCard4>
          </Modal.Content>
          <Modal.Content scrolling className="modal-content2">
            <JCard3>
              <div className="description">
                <h1>
                  {employee.title} {employee.firstName} {employee.lastName}
                </h1>
                <h4>{employee.role}</h4>
                <p style={{ letterSpacing: "2px", lineHeight: 1.5 }}></p>
                <h4>Specialization</h4>

                <ul>
                  {employee.role === "AESTHETICIAN" &&
                    employee.categoryServices.map((category) => (
                      <li>{category.name}</li>
                    ))}
                </ul>
                <p style={{ letterSpacing: "2px", lineHeight: 1.2 }}>
                  {parser(employee.bio)}
                </p>
              </div>
            </JCard3>
          </Modal.Content>
        </DGrid>
      </Modal>
    </>
  );
};

export default TeamDetails;
