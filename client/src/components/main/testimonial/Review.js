import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER_REVIEW } from "../../../util/graphql/testimonial";
import { AuthContext } from "../../../context/auth";
import { Content } from "../../styled/containers";
import { DTestimonialCard } from "../../styled/card";
import { DButton } from "../../styled/utils";
import { Rating, Icon, Popup } from "semantic-ui-react";
import Spinner from "../../Spinner";

const Review = () => {
  const { user } = useContext(AuthContext);
  const [userReview, setUserReview] = useState({});

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
      <DButton
        basic
        radius="25px"
        color={({ theme }) => theme.bluer}
        center
        bluer
      >
        <Icon name="pencil" />
        Write a review
      </DButton>
      {user && userReview ? (
        loadUserReview ? (
          <Spinner medium />
        ) : (
          <DTestimonialCard width="50%">
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 3,
              }}
            >
              <Popup
                content="Edit your review"
                trigger={
                  <Icon
                    name="edit"
                    fitted
                    size="large"
                    style={{ cursor: "pointer" }}
                    color="blue"
                  />
                }
              />
            </div>
            <figure className="testimonial">
              <div className="profile">
                <img
                  src={
                    userReview.user && userReview.user.photo !== null
                      ? `/images/users/${userReview.user.photo}`
                      : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg"
                  }
                  alt="profile-sample3"
                />
              </div>

              <figcaption>
                <h4>
                  {userReview.user &&
                    userReview.user.firstName + " " + userReview.user.lastName}
                </h4>
                <Rating
                  rating={userReview.rating}
                  maxRating={5}
                  icon="star"
                  disabled
                />
                <blockquote>{userReview.message}</blockquote>
              </figcaption>
            </figure>
          </DTestimonialCard>
        )
      ) : (
        ""
      )}
    </Content>
  );
};

export default Review;
