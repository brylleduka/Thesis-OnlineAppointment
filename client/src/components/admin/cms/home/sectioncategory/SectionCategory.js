import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_HOME_SECTION } from "../../../../../util/graphql/cms";
import { DSection, Content } from "../../../../styled/containers";
import { DButtonFree } from "../../../../styled/utils";
import { Icon, Popup } from "semantic-ui-react";
import FancyText from "../../../../FancyText";
import CategoryCards from "./CategoryCards";
import UpdateSectCategory from "./UpdateSectCategory";

const SectionCategory = () => {
  const [sectCategory, setSectCategory] = useState({});
  const [openCatSec, setOpenCatSec] = useState(false);

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
      setSectCategory(sectionCategory.homeCMS);
    }
  }, [sectionCategory]);

  return (
    <>
      <DSection
        flex
        justify="center"
        align="center"
        direct="column"
        height="100%"
        width="100%"
        margin="48px auto"
        pad="10px"
        bgcolor={sectCategory.bgColor}
      >
        <Popup
          content="Update Category Section"
          trigger={
            <DButtonFree top={0} right={0} onClick={() => setOpenCatSec(true)}>
              <Icon name="edit" fitted />
            </DButtonFree>
          }
          position="top right"
        />

        <Content
          flex
          justify="center"
          align="center"
          direct="column"
          height="100%"
          width="100%"
          margin="0 auto"
        >
          <Content
            width="auto"
            height="auto"
            margin="0 auto"
            flex
            justify="center"
            align="center"
            direct="column"
            className={sectCategory.dark ? "dark" : ""}
          >
            <FancyText alt={sectCategory.dark ? true : false}>
              {sectCategory.title}
            </FancyText>
            <p style={{ fontSize: "16px" }}>
              {sectCategory.subtitle !== "" ? sectCategory.subtitle : "Content"}
            </p>
          </Content>
          {!loadSectionCategory && (
            <UpdateSectCategory
              openCatSec={openCatSec}
              setOpenCatSec={setOpenCatSec}
              categorySectionInfo={sectionCategory.homeCMS}
            />
          )}

          <CategoryCards gridCount={sectCategory.grid} />
        </Content>
      </DSection>
    </>
  );
};

export default SectionCategory;
