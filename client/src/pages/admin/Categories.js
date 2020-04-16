import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../util/graphql/service";

import { Link } from "react-router-dom";
import Layout from "../../components/admin/layout/Layout";
import {
  Content,
  DGrid,
  DSection,
  DCard,
  Overlay,
  DImage,
} from "../../components/styled/containers";
import { JCard } from "../../components/styled/card";
import NewCategory from "../../components/admin/services/NewCategory";
import { DButton } from "../../components/styled/utils";
import Spinner from "../../components/Spinner";
import ReadMore from "../../components/main/utils/ReadMore";
import parser from "html-react-parser";

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { loading, data, error } = useQuery(FETCH_ALL_CATEGORIES_QUERY);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  if (error) {
    return <div>Something went wrong</div>;
  }

  const handleOpenModal = () => {
    setOpen(true);
  };

  function extractContent(html) {
    return new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent;
  }

  return (
    <Layout>
      <DSection
        mcenter
        flex
        justify="space-around"
        align="center"
        direct="column"
        width="90%"
        height="100%"
      >
        <Content flex justify="space-between" width="100%">
          <h2>Services</h2>
          <DButton onClick={handleOpenModal}>New Category</DButton>
        </Content>
        <h3>Category List</h3>
        <Content width="100%" height="100%">
          {loading ? (
            <Spinner content="Please wait while we fetch your data" />
          ) : (
            <DGrid three gap="15px" margin="40px 0">
              {categories.map((category) => (
                <DCard
                  dw={"90%"}
                  dh="250px"
                  mcenter
                  p="0px"
                  grayzoom
                  overlaying
                >
                  <DImage height="100%" width="100%" grayscaling>
                    <img
                      src={
                        category.photo
                          ? `/images/service/${category.photo}`
                          : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
                        <p>
                          {category.description.length > 80
                            ? parser(category.description.substr(0, 80) + "...")
                            : parser(category.description.substr(0, 80))}
                        </p>
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
        <NewCategory open={open} setOpen={setOpen} />
      </DSection>
    </Layout>
  );
};

export default Categories;
