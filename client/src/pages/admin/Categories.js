import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../util/graphql/service";

import { Link } from "react-router-dom";
import Layout from "../../components/admin/layout/Layout";
import { Content, DGrid, DSection } from "../../components/styled/containers";
import { JCard } from "../../components/styled/card";
import NewCategory from "../../components/admin/services/NewCategory";
import { DButton } from "../../components/styled/utils";
import Spinner from "../../components/Spinner";
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
                <JCard>
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
                    <p>{parser(category.description)}</p>
                  </figcaption>
                  <Link to={`/zeadmin/category/${category._id}`} />
                </JCard>
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
