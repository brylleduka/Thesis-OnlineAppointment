import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { FETCH_CATEGORY_QUERY } from "../../util/graphql/service";
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
  const { employeeAuth } = useContext(AuthContext);
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
  const [addCategoryPhoto, { loading, data: dataCategImg }] = useMutation(
    UPLOAD_CATEGORY_PHOTO,
    {
      refetchQueries: [
        { query: FETCH_CATEGORY_QUERY, variables: { categoryId: categoryId } },
      ],
      onCompleted() {
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Upload Success
          </Toasted>
        ));
      },
    }
  );

  const onDrop = useCallback(
    ([file]) => {
      if (file) {
        addCategoryPhoto({ variables: { categoryId: categoryId, file } });
      } else {
        toaster.notify(({ onClose }) => (
          <Toasted warning onClick={onClose}>
            File size is to big
          </Toasted>
        ));
      }
    },
    [addCategoryPhoto]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const images = [
    {
      src: dataCategImg
        ? dataCategImg.addCategoryPhoto.Location
        : category.imageURL !== null
        ? category.imageURL
        : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg",
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
              bgcolor="#eee"
              rounded
              pad="3px 10px"
              height="5em"
            >
              <Breadcrumb size="big">
                <Breadcrumb.Section>File Maintenance</Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section as={Link} to="/zeadmin/categories">
                  Service Category
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
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
                            dataCategImg
                              ? dataCategImg.addCategoryPhoto.Location
                              : category.imageURL !== null
                              ? category.imageURL
                              : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg"
                          }
                          alt={category.name}
                          onClick={openLightbox}
                        />
                      </DImage>
                    )}
                    {(employeeAuth.role === "ADMIN" ||
                      employeeAuth.level >= 3) && (
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
                    )}
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
                        employeeAuthRole={employeeAuth.role}
                        employeeAuthLvl={employeeAuth.level}
                      />
                    </DCard>
                    <DCard dw="100%" dh="100%">
                      <ServiceList
                        categoryId={data.category._id}
                        employeeAuthRole={employeeAuth.role}
                        employeeAuthLvl={employeeAuth.level}
                      />
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
    addCategoryPhoto(_id: $categoryId, file: $file) {
      Location
    }
  }
`;

export default Category;
