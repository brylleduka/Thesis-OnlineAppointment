import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_CATEGORY_QUERY,
  FETCH_ALL_CATEGORIES_QUERY,
} from "../../util/graphql/service";
import Layout from "../../components/admin/layout/Layout";
import {
  Content,
  DGrid,
  DSection,
  DCard,
  DImage,
} from "../../components/styled/containers";
import CategoryDetails from "../../components/admin/services/CategoryDetails";
import ServiceList from "../../components/admin/services/ServiceList";
import { Breadcrumb } from "semantic-ui-react";
import Spinner from "../../components/Spinner";
import Carousel, { Modal, ModalGateway } from "react-images";
import DCamera from "../../components/DCamera";
import useWindowSize from "../../util/hooks/useWindowSize";
import toaster from "toasted-notes";
import Toasted from "../../components/Toasted";

const Category = (props) => {
  const categoryId = props.match.params._id;
  const [category, setCategory] = useState({});

  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { width: wid } = useWindowSize();

  const { data, loading: dataLoading } = useQuery(FETCH_CATEGORY_QUERY, {
    variables: {
      categoryId,
    },
  });

  useEffect(() => {
    if (data) {
      setCategory(data.category);
    }
  }, [data]);

  // LIGHT BOX
  const openLightbox = () => {
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  // DROPZONE
  const [addCategoryPhoto, { loading }] = useMutation(UPLOAD_CATEGORY_PHOTO, {
    refetchQueries: [{ query: FETCH_ALL_CATEGORIES_QUERY }],
    onCompleted() {
      toaster.notify(({ onClose }) => (
        <Toasted success onClick={onClose}>
          Upload Success
        </Toasted>
      ));
    },
  });

  const onDrop = useCallback(
    ([file]) => {
      addCategoryPhoto({ variables: { categoryId, file } });
    },
    [addCategoryPhoto]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const images = [
    {
      src: category.photo
        ? `/images/service/${category.photo}`
        : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  const historyCallback = () => {
    props.history.push("/zeadmin/categories");
  };

  return (
    <Layout>
      <DSection
        width="90%"
        height="100%"
        mcenter
        justify="flex-start"
        align="center"
        direct="column"
      >
        {dataLoading ? (
          <Spinner content="Please wait while we fetch the data..." />
        ) : (
          <>
            <Content
              flex
              justify="space-between"
              align="center"
              width="100%"
              margin="24px auto"
            >
              <Breadcrumb size={"huge"}>
                <Breadcrumb.Section link>Category</Breadcrumb.Section>
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
                <Breadcrumb.Section active>{category.name}</Breadcrumb.Section>
              </Breadcrumb>
            </Content>
            <Content width="100%" height="100%" margin="24px auto">
              <DGrid
                custom="1fr 3fr"
                med10="2fr 4fr"
                med7="2fr 4fr"
                gap={wid < 768 ? "10px" : "20px"}
              >
                <Content
                  width="100%"
                  height="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  mcenter
                  direct="column"
                >
                  <DCard
                    dw={wid < 524 ? "50%" : "100%"}
                    dh="250px"
                    mcenter
                    p="0px"
                  >
                    {loading ? (
                      <Spinner content="Loading..." medium />
                    ) : (
                      <DImage height="100%" width="100%">
                        <img
                          src={
                            category.photo
                              ? `/images/service/${category.photo}`
                              : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                          }
                          alt={category.name}
                          onClick={openLightbox}
                        />
                      </DImage>
                    )}
                  </DCard>
                  <DCamera {...getRootProps()} color="green" size="22px">
                    <input {...getInputProps()} />
                  </DCamera>
                  <ModalGateway>
                    {viewerIsOpen ? (
                      <Modal onClose={closeLightbox}>
                        <Carousel views={images} />
                      </Modal>
                    ) : null}
                  </ModalGateway>
                </Content>
                <Content width="100%" height="100%">
                  <DGrid gap="10px">
                    <DCard dw="100%" dh="100%" p="10px 20px">
                      <CategoryDetails
                        category={data.category}
                        historyCallback={historyCallback}
                      />
                    </DCard>
                    <DCard dw="100%" dh="100%">
                      <ServiceList categoryId={data.category._id} />
                    </DCard>
                  </DGrid>
                </Content>
              </DGrid>
            </Content>
          </>
        )}
      </DSection>

      {/* {dataLoading ? (
        <>
          <Spinner content="Please wait while we fetch our data" />
        </>
      ) : (
        <>
          <DGrid>
            <DSection
              flex
              mcenter
              justify="space-around"
              align="center"
              direct="column"
              pad="24px 0"
              width="90%"
              height="100%"
            >
              <h2>{data.category.name}</h2>
              <DGrid
                custom="450px 1fr"
                gap="10px"
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "20px",
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
                              ? `/images/service/${data.category.photo}`
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
        </>
      )} */}
    </Layout>
  );
};

const UPLOAD_CATEGORY_PHOTO = gql`
  mutation addCategoryPhoto($categoryId: ID!, $file: Upload) {
    addCategoryPhoto(_id: $categoryId, file: $file)
  }
`;

export default Category;
