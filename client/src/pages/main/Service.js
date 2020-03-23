import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CATEGORY_QUERY } from "../../util/graphql/service";
import {
  DContainer,
  DSection,
  DGrid,
  Content,
  Overlay
} from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import { JCard2 } from "../../components/styled/card";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";
import { Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
// import ServiceDetails from "../../components/main/services/ServiceDetails";
import ReadMore from "../../components/main/utils/ReadMore";
import Spinner from "../../components/Spinner";

const Service = props => {
  const categoryId = props.match.params._id;
  const history = useHistory();
  const [isReadMore, setIsReadMore] = useState(false);

  const [isServices, setIsServices] = useState([]);

  const { data, loading } = useQuery(FETCH_CATEGORY_QUERY, {
    variables: {
      categoryId
    }
  });

  useEffect(() => {
    if (data) {
      setIsServices(data.category.services);
    }
  }, [data]);

  const backHist = () => {
    history.goBack();
  };

  return (
    <DContainer>
      <DSection
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        height="50vh"
        fixed
      >
        <Content
          flex
          justify="center"
          direct="column"
          align="center"
          fluid
          height="100%"
          className="dark"
        >
          {!data ? (
            <Spinner inverted />
          ) : (
            <>
              <h1 style={{ fontSize: "22px" }}>{data.category.name}</h1>
              <p style={{ width: "50%", margin: "0 auto" }}>
                {parser(data.category.description)}
              </p>
            </>
          )}
        </Content>
        <Overlay />
      </DSection>
      <Content flex width="90%" height="50px" margin="20px auto">
        <DButton onClick={backHist}>
          <Icon name="arrow left" /> <span>Back to Services</span>
        </DButton>
      </Content>
      {loading ? (
        <DGrid three gap="15px">
          <Skeleton width={300} height={475} />
          <Skeleton width={300} height={475} />
          <Skeleton width={300} height={475} />
        </DGrid>
      ) : (
        <DSection
          width="80%"
          flex
          justify="flex-start"
          align="flex-start"
          direct="column"
          mcenter
          pad="24px"
          height="100%"
        >
          <Content width="100%" margin="0 auto" style={{ minHeight: "100vh" }}>
            <DGrid three gap="15px">
              {isServices &&
                isServices.map(service => (
                  <JCard2
                    key={service._id}
                    oflow={isReadMore ? true : false}
                    onPointerLeave={() => setIsReadMore(false)}
                  >
                    <div className="thumbnail">
                      <img
                        src={
                          service.photo !== null
                            ? `/images/service/${service.photo}`
                            : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"
                        }
                      />
                    </div>
                    <div className="post-content">
                      <div className="category">{service.name}</div>
                      <h4 className="title">{service.duration} mins</h4>
                      <h4 className="title">Php {service.price}</h4>
                      <div className="description">
                        {isReadMore ? (
                          <p>{parser(service.description)}</p>
                        ) : (
                          <p>
                            {service.description.length > 100
                              ? parser(
                                  service.description.substr(0, 100) + "..."
                                )
                              : parser(service.description.substr(0, 100))}
                          </p>
                        )}
                        {service.description.length <= 100 ? (
                          ""
                        ) : (
                          <ReadMore onClick={() => setIsReadMore(!isReadMore)}>
                            {isReadMore ? "Read Less" : "Read More"}
                          </ReadMore>
                        )}

                        {/* <ServiceDetails service={service} /> */}
                      </div>
                    </div>
                  </JCard2>
                ))}
            </DGrid>
          </Content>
        </DSection>
      )}
    </DContainer>
  );
};

export default Service;
