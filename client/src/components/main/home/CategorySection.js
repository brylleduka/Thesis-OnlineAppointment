import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";
import { FETCH_HOME_SECTION } from "../../../util/graphql/cms";
import { Link } from "react-router-dom";
import { DGrid, DSection, Content } from "../../styled/containers";
import { JCard } from "../../styled/card";
import FancyText from "../../FancyText";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";
import ReadMore from "../utils/ReadMore";

const CategorySection = ({ setRef }) => {
  const [isCategories, setIsCategories] = useState([]);
  const [categorySection, setCategorySection] = useState({});

  const { data: dataCategories, loading: loadingCategories } = useQuery(
    FETCH_ALL_CATEGORIES_QUERY
  );

  useEffect(() => {
    if (dataCategories) {
      setIsCategories(dataCategories.categories);
    }
  }, [dataCategories]);

  const { data: sectionCategory, loading: loadSectionCategory } = useQuery(
    FETCH_HOME_SECTION,
    {
      variables: {
        sectionName: "CATEGORY"
      }
    }
  );

  useEffect(() => {
    if (sectionCategory) {
      setCategorySection(sectionCategory.homeCMS);
    }
  }, [sectionCategory]);

  return (
    <DSection
      flex
      justify="center"
      align="center"
      direct="column"
      height="100%"
      width="100%"
      pad="20px 0"
      bgcolor={categorySection.bgColor}
      ref={setRef}
    >
      <Content
        height="100%"
        width="90%"
        flex
        justify="center"
        align="center"
        direct="column"
        margin="0 auto"
        className={categorySection.dark ? "dark" : ""}
      >
        {categorySection && (
          <>
            {categorySection.title !== "" && (
              <FancyText size="38px" alt={categorySection.dark ? true : false}>
                {categorySection.title}
              </FancyText>
            )}
            {categorySection.subtitle !== "" && (
              <h3>{categorySection.subtitle}</h3>
            )}
          </>
        )}

        <Content height="100%" width="100%">
          {loadingCategories ? (
            <DGrid four gap="20px">
              <Skeleton width="100%" height={300} />
              <Skeleton width="100%" height={300} />
              <Skeleton width="100%" height={300} />
              <Skeleton width="100%" height={300} />
            </DGrid>
          ) : (
            <DGrid
              two={categorySection.grid === 2 ? true : false}
              three={categorySection.grid === 3 ? true : false}
              four={categorySection.grid === 4 ? true : false}
              gap="20px"
            >
              {isCategories.map(category => (
                <JCard key={category._id}>
                  <img
                    src={
                      category.photo !== null
                        ? `/images/service/${category.photo}`
                        : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample108.jpg"
                    }
                    alt={category.name}
                  />
                  <figcaption>
                    <h3>{parser(category.name)}</h3>
                    <div className="description">
                      <p>
                        {category.description.length > 50
                          ? parser(category.description.substr(0, 50) + "...")
                          : parser(category.description.substr(0, 50))}
                      </p>
                      <ReadMore hover={0}>View Services</ReadMore>
                    </div>
                  </figcaption>
                  <Link to={`/zessence/service/${category._id}`}></Link>
                </JCard>
              ))}
            </DGrid>
          )}
        </Content>
      </Content>
    </DSection>
  );
};

export default CategorySection;
