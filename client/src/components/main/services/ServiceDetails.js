import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { ReadMore } from "../../styled/utils";
import { DImage, DGrid } from "../../styled/containers";
import { JCard3 } from "../../styled/card";
import parser from "html-react-parser";

const ServiceDetails = ({ service }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ReadMore onClick={() => setOpen(true)}>
        <span>Read More</span>
      </ReadMore>
      <Modal open={open} onClose={() => setOpen(false)} closeIcon>
        <DGrid custom="1fr 2fr" gap="10px">
          <Modal.Content>
            <DImage height="auto" rounded pad={"10px"}>
              <img
                src={`/images/service/${service.photo}`}
                alt={service.photo}
              />
            </DImage>
          </Modal.Content>
          <Modal.Content scrolling>
            <JCard3>
              <div className="description">
                <h1>{service.name}</h1>
                <h4>{service.duration} mins</h4>
                <h4>Php {service.price}</h4>
                <p>{parser(service.description)}</p>
              </div>
            </JCard3>
          </Modal.Content>
        </DGrid>
      </Modal>
    </>
  );
};

export default ServiceDetails;
