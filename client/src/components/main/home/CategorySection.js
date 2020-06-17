import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";
import { FETCH_HOME_SECTION } from "../../../util/graphql/cms";
import { Link } from "react-router-dom";
import {
  DGrid,
  DSection,
  Content,
  Overlay,
  DCard,
  DImage,
} from "../../styled/containers";
import FancyText from "../../FancyText";
import Spinner from "../../Spinner";
import parser from "html-react-parser";
import ReadMore from "../utils/ReadMore";
import useWindowSize from "../../../util/hooks/useWindowSize";

const CategorySection = ({ setRef }) => {
  const { width: wid } = useWindowSize();
  const [isCategories, setIsCategories] = useState([]);
  const [categorySection, setCategorySection] = useState({});

  const {
    data: dataCategories,
    loading: loadingCategories,
  } = useQuery(FETCH_ALL_CATEGORIES_QUERY, { variables: { active: true } });

  useEffect(() => {
    if (dataCategories) {
      setIsCategories(dataCategories.categories);
    }
  }, [dataCategories]);

  const { data: sectionCategory, loading: loadSectionCategory } = useQuery(
    FETCH_HOME_SECTION,
    {
      variables: {
        sectionName: "CATEGORY",
      },
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
              <FancyText size="28px" alt={categorySection.dark ? true : false}>
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
            <Content width="100%" height="80vh" margin="0 auto">
              <Spinner />
            </Content>
          ) : (
            <DGrid
              two={categorySection.grid === 2 ? true : false}
              three={categorySection.grid === 3 ? true : false}
              four={categorySection.grid === 4 ? true : false}
              gap="20px"
            >
              {isCategories.map((category) => (
                <DCard
                  key={category._id}
                  dw={wid < 524 ? "70%" : "90%"}
                  dh="250px"
                  mcenter
                  p="0px"
                  grayzoom
                  overlaying
                >
                  <DImage height="100%" width="100%" grayscaling>
                    <img
                      src={
                        category.imageURL !== null
                          ? category.imageURL
                          : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/logo.png"
                      }
                      alt={category.name}
                    />
                  </DImage>

                  <Overlay
                    bgc
                    width="100%"
                    height="100%"
                    flex
                    justify="center"
                    align="center"
                    initbox
                  >
                    <div className="overlay-box">
                      <div className="overlay-box__content dark">
                        <h3 className="title">{category.name}</h3>

                        {category.description.length > 100
                          ? parser(category.description.substr(0, 100) + "...")
                          : parser(category.description.substr(0, 100))}

                        <ReadMore center size="14px">
                          Learn More
                        </ReadMore>
                      </div>
                    </div>
                  </Overlay>
                  <Link to={`/zeadmin/category/${category._id}`} />
                </DCard>
              ))}
            </DGrid>
          )}
        </Content>
      </Content>
    </DSection>
  );
};

export default CategorySection;
