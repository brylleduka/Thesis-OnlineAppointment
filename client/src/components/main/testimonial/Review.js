import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER_REVIEW } from "../../../util/graphql/testimonial";
import { AuthContext } from "../../../context/auth";
import { Content } from "../../styled/containers";
import { DTestimonialCard } from "../../styled/card";
import { DButton } from "../../styled/utils";
import { Icon } from "semantic-ui-react";
import ModalReview from "./ModalReview";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";

const Review = () => {
  const { user } = useContext(AuthContext);
  const [userReview, setUserReview] = useState({});
  const [openReview, setOpenReview] = useState(false);

  const { data: dataUserReview, loading: loadUserReview } = useQuery(
    FETCH_USER_REVIEW,
    {
      variables: { userId: user ? user.userId : "" },
    }
  );

  useEffect(() => {
    if (dataUserReview) {
      setUserReview(dataUserReview.userTestimonial);
    }
  }, [dataUserReview]);

  const handleOpenReview = () => {
    if (user) {
      setOpenReview(true);
    } else {
      toaster.notify("You must sign in n order to write a review. Thank you!");
    }
  };

  return (
    <Content
      width="100%"
      height="auto"
      flex
      justify="center"
      align="center"
      direct="column"
      margin="1rem auto"
    >
      {loadUserReview ? (
        <Spinner medium />
      ) : (
        <>
          <DButton
            radius="25px"
            center
            color="bluer"
            onClick={handleOpenReview}
          >
            <Icon name="pencil" />
            Write a review
          </DButton>
          <ModalReview
            openReview={openReview}
            setOpenReview={setOpenReview}
            userReview={dataUserReview && dataUserReview.userTestimonial}
            user={user}
          />
        </>
      )}
    </Content>
  );
};

export default Review;
