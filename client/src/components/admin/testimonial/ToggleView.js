import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_TESTIMONIALS } from "../../../util/graphql/testimonial";
import Spinner from "../../Spinner";
import { Popup } from "semantic-ui-react";

const ToggleView = ({ swid, tggl }) => {
  const [toggleValue, setToggleValue] = useState("");

  const [toggleTestimonial, { loading: loadToggle }] = useMutation(
    TOGGLE_REVIEW,
    {
      variables: {
        id: toggleValue,
      },
      refetchQueries: [{ query: FETCH_TESTIMONIALS }],
    }
  );

  const hoverSwitch = (e) => {
    setToggleValue(e.currentTarget.dataset.sid);
  };

  const handleSwitch = (e) => {
    toggleTestimonial();
  };

  return (
    <Popup
      content="Switch on to display testimonial in Home Page"
      style={style.popContent}
      inverted
      trigger={
        <div
          className="pretty p-switch p-fill"
          style={{
            height: "auto",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          {loadToggle ? (
            <Spinner tiny />
          ) : (
            <>
              <input
                type="checkbox"
                data-sid={swid}
                checked={tggl === true ? true : false}
                onMouseOver={hoverSwitch}
                onChange={handleSwitch}
              />
              <div className="state p-success">
                <label></label>
              </div>
            </>
          )}
        </div>
      }
    />
  );
};

const TOGGLE_REVIEW = gql`
  mutation toggleTestimonial($id: ID!) {
    toggleTestimonial(_id: $id) {
      _id
      view
    }
  }
`;

const style = {
  popContent: {
    borderRadius: 0,
    opacity: 0.7,
    padding: "2em",
    fontWeight: 500,
  },
};

export default ToggleView;
