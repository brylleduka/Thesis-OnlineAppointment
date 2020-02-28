import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_CATEGORY_QUERY,
  FETCH_ALL_CATEGORIES_QUERY
} from "../../util/graphql/service";
import Layout from "../../components/admin/layout/Layout";
import {
  Content,
  DGrid,
  DSection,
  Overlay
} from "../../components/styled/containers";
import CategoryDetails from "../../components/admin/services/CategoryDetails";
import ServiceList from "../../components/admin/services/ServiceList";
import Skeleton from "../../components/Skeleton";
import Spinner from "../../components/Spinner";

const Category = props => {
  const categoryId = props.match.params._id;
  const [category, setCategory] = useState({});

  const { data, loading: dataLoading, error } = useQuery(FETCH_CATEGORY_QUERY, {
    variables: {
      categoryId
    }
  });

  useEffect(() => {
    if (data) {
      setCategory(data.category);
    }
  }, [data]);

  // DROPZONE
  const [addCategoryPhoto, { loading }] = useMutation(UPLOAD_CATEGORY_PHOTO, {
    refetchQueries: [{ query: FETCH_ALL_CATEGORIES_QUERY }]
  });

  const onDrop = useCallback(
    ([file]) => {
      addCategoryPhoto({ variables: { categoryId, file } });
    },
    [addCategoryPhoto]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (error) {
    return (
      <DSection>
        <h2>Something went wrong</h2>
      </DSection>
    );
  }

  const historyCallback = () => {
    props.history.push("/zeadmin/categories");
  };

  return (
    <Layout>
      {dataLoading ? (
        <>
          <Skeleton width="100%" />
        </>
      ) : (
        <DSection margin="20px 0">
          <h2>{data.category.name}</h2>
          <DGrid>
            <DSection width="100%" height="100%">
              <DGrid
                custom="450px 1fr"
                gap="10px"
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "20px"
                }}
              >
                <Content
                  height="100%"
                  width="100%"
                  flex
                  justify="center"
                  align="center"
                  imgHeight="350px"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Overlay
                      flex
                      justify="center"
                      align="center"
                      bg="rgba(0, 0, 0, 0.6)"
                    >
                      <h3>Drop Image</h3>
                    </Overlay>
                  ) : (
                    <>
                      {loading ? (
                        <Spinner medium inverted />
                      ) : (
                        <img
                          src={
                            data.category.photo !== null
                              ? `/images/category/${data.category.photo}`
                              : // `/images/${photo}`
                                "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                          }
                          alt="Category"
                        />
                      )}

                      <Overlay
                        opac="0"
                        hovOpac="1"
                        pointer
                        className="dark"
                        flex
                        justify="center"
                        align="center"
                        bg="rgba(0, 0, 0, 0.6)"
                      >
                        <h2>Click or Drop an Image</h2>
                      </Overlay>
                    </>
                  )}
                </Content>

                <CategoryDetails
                  category={data.category}
                  historyCallback={historyCallback}
                />
              </DGrid>
            </DSection>
            <ServiceList categoryId={data.category._id} />
          </DGrid>
        </DSection>
      )}
    </Layout>
  );
};

const UPLOAD_CATEGORY_PHOTO = gql`
  mutation addCategoryPhoto($categoryId: ID!, $file: Upload) {
    addCategoryPhoto(_id: $categoryId, file: $file)
  }
`;

export default Category;
