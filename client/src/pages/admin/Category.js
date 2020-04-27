import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {Link} from "react-router-dom"
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
import { IconWrap } from "../../components/styled/utils";
import { Camera } from "@styled-icons/boxicons-solid/Camera";
import CategoryDetails from "../../components/admin/services/CategoryDetails";
import ServiceList from "../../components/admin/services/ServiceList";
import { Breadcrumb } from "semantic-ui-react";
import Spinner from "../../components/Spinner";
import Carousel, { Modal, ModalGateway } from "react-images";
import useWindowSize from "../../util/hooks/useWindowSize";
import toaster from "toasted-notes";
import Toasted from "../../components/Toasted";
import Page404 from "../Page404";

const Category = (props) => {
  const categoryId = props.match.params._id;
  const [category, setCategory] = useState({});

  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { width: wid } = useWindowSize();

  const { data, loading: dataLoading, error } = useQuery(FETCH_CATEGORY_QUERY, {
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
      addCategoryPhoto({ variables: { categoryId: categoryId, file } });
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

  if (error) {
    return <Page404 />;
  }

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
                <Breadcrumb.Section>
                  <Link to="/zeadmin/categories"> Category</Link>
                </Breadcrumb.Section>
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
                    grayzoom
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
                    <IconWrap
                      {...getRootProps()}
                      circle
                      bottomcenter
                      small
                      pad="2px"
                      bgcolor={({ theme }) => theme.bluer}
                    >
                      <Camera title="Upload" />
                      <input {...getInputProps()} />
                    </IconWrap>
                  </DCard>

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
                    <DCard dw="100%" dh="100%" p="10px 20px" overf>
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
    </Layout>
  );
};

const UPLOAD_CATEGORY_PHOTO = gql`
  mutation addCategoryPhoto($categoryId: ID!, $file: Upload) {
    addCategoryPhoto(_id: $categoryId, file: $file)
  }
`;

export default Category;
