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
  DImage
} from "../../components/styled/containers";
import NewCategory from "../../components/admin/services/NewCategory";
import { DButton } from "../../components/styled/utils";
import parse from "html-react-parser";

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
      <DSection margin="20px 0">
        <Content flex justify="space-between" width="100%">
          <h2>Services</h2>
          <DButton onClick={handleOpenModal}>New Category</DButton>
        </Content>
        <h3>Category List</h3>
        <DGrid four gap="15px" margin="40px 0">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            data.categories &&
            data.categories.map(category => (
              <DCard key={category._id}>
                <DImage height="250px" width="250px">
                  <img
                    src={
                      category.photo !== null
                        ? `/images/category/${category.photo}`
                        : "https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    }
                    alt="category"
                  />
                </DImage>

                <div className="card-details">
                  <h3>{category.name}</h3>
                  <p className="des">{parse(category.description)}</p>
                  <Link to={`/zeadmin/category/${category._id}`}>
                    <DButton basic>View</DButton>
                  </Link>
                </div>
              </DCard>
            ))
          )}
        </DGrid>
        <NewCategory open={open} setOpen={setOpen} />
      </DSection>
    </Layout>
  );
};

export default Categories;
