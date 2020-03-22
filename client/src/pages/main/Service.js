import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CATEGORY_QUERY } from "../../util/graphql/service";
import {
  DContainer,
  DSection,
  DGrid,
  Content
} from "../../components/styled/containers";
import { JCard2 } from "../../components/styled/card";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";
import { Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
// import ServiceDetails from "../../components/main/services/ServiceDetails";
import ReadMore from "../../components/main/utils/ReadMore";

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
        width="80%"
        flex
        justify="flex-start"
        align="flex-start"
        direct="column"
        mcenter
        pad="24px"
        height="100%"
      >
        {loading ? (
          <>
            <Skeleton width={500} height={100} />
            <br />
            <DGrid three gap="15px">
              <Skeleton width={300} height={475} />
              <Skeleton width={300} height={475} />
              <Skeleton width={300} height={475} />
            </DGrid>
          </>
        ) : (
          <>
            <Content
              bgcolor={({ theme }) => theme.bluer}
              flex
              pad="10px"
              margin="16px 0"
              justify="space-between"
              align="center"
              br1
              bs
              className="dark"
            >
              <div
                style={{
                  width: "10%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "2%",
                  borderRight: "1px solid #fff",
                  cursor: "pointer"
                }}
                onClick={backHist}
              >
                <Icon name="arrow left" />
              </div>
              <div style={{ width: "90%", display: "flex", flex: "1" }}>
                <h2>{data.category.name}</h2>
              </div>
            </Content>

            <Content
              width="100%"
              margin="0 auto"
              style={{ minHeight: "100vh" }}
            >
              <DGrid four gap="15px">
                {isServices &&
                  isServices.map(service => (
                    <JCard2
                      key={service._id}
                      oflow={isReadMore ? true : false}
                      onPointerLeave={() => setIsReadMore(false)}
                    >
                      <div class="thumbnail">
                        <img
                          src={
                            service.photo !== null
                              ? `/images/service/${service.photo}`
                              : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"
                          }
                        />
                      </div>
                      <div class="post-content">
                        <div class="category">{service.name}</div>
                        <h4 class="title">{service.duration} mins</h4>
                        <h4 class="title">Php {service.price}</h4>
                        <div class="description">
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
                          <ReadMore onClick={() => setIsReadMore(!isReadMore)}>
                            {isReadMore ? "Read Less" : "Read More"}
                          </ReadMore>
                          {/* <ServiceDetails service={service} /> */}
                        </div>
                      </div>
                    </JCard2>
                  ))}
              </DGrid>
            </Content>
          </>
        )}
      </DSection>
    </DContainer>
  );
};

export default Service;
