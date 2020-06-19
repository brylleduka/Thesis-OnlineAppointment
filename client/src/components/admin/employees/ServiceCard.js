import React, { useState, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";

import { DCard, Content, DGrid } from "../../styled/containers";
import { DLabel, IconWrap, DButton, CheckLabel } from "../../styled/utils";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Save } from "@styled-icons/boxicons-solid/Save";

import { Modal } from "semantic-ui-react";
import CheckboxGroup from "react-checkbox-group";

import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import useWindowSize from "../../../util/hooks/useWindowSize";
import RemoveService from "./RemoveService";

const ServiceCard = ({ employee }) => {
  const { employeeAuth } = useContext(AuthContext);
  const { width: wid } = useWindowSize();
  const [openAddService, setOpenAddService] = useState(false);

  const [isCategories, setIsCategories] = useState(
    employee.categoryServices.map((categServ) => categServ._id)
  );
  const [categories, setCategories] = useState([]);

  const {
    data: categoryData,
    loading: loadCategory,
  } = useQuery(FETCH_ALL_CATEGORIES_QUERY, { variables: { active: true } });

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.categories);
    }
  }, [categoryData]);

  const [addService, { loading: loadAdd }] = useMutation(
    ADD_SERVICES_MUTATION,
    {
      variables: {
        employeeId: employee._id,
        categoryId: isCategories,
      },
      refetchQueries: [{ query: FETCH_ALL_CATEGORIES_QUERY }],
      onCompleted() {
        setOpenAddService(false);
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Service Added
          </Toasted>
        ));
      },
    }
  );

  const handleAddService = () => {
    addService();
  };

  return (
    <>
      <DCard dw="100%" dh="100%" maxh={wid < 768 ? "300px" : "400px"} flex fcol>
        <Content
          flex
          width="100%"
          height="auto"
          justify="space-between"
          align="center"
        >
          <DLabel size={wid < 768 ? "18px !important" : "22px"} weight={700}>
            Services
          </DLabel>
          {(employeeAuth.role === "ADMIN" || employeeAuth.level > 2) && (
            <IconWrap
              small
              title={"Add Services"}
              topright
              circle
              shadow
              bgcolor={({ theme }) => theme.bluer}
              onClick={() => setOpenAddService(true)}
              color="light"
            >
              <Plus />
            </IconWrap>
          )}
        </Content>
        <Content
          width="90%"
          height="100%"
          flex
          justify="flex-start"
          align="flex-start"
          hoverflow
          margin="0 auto"
          flow={wid <= 768 ? "column wrap" : "column wrap"}
          pad="10px"
        >
          {employee.categoryServices.map((categ) => (
            <Content
              width="auto"
              height={wid < 768 ? "20px" : "25px"}
              margin={wid < 1024 ? "10px 3px" : "5px"}
              key={categ._id}
            >
              <DLabel rounded pad="3px 5px">
                <DGrid
                  custom="7fr 1fr"
                  med5={"7fr 1fr"}
                  med7={"7fr 1fr"}
                  med10={"7fr 1fr"}
                >
                  {categ.name}

                  <RemoveService
                    categId={categ._id}
                    employeeId={employee._id}
                    refetchCategories={FETCH_ALL_CATEGORIES_QUERY}
                  />
                </DGrid>
              </DLabel>
            </Content>
          ))}
        </Content>
      </DCard>
      <Modal
        size="tiny"
        open={openAddService}
        onClose={() => setOpenAddService(false)}
        closeIcon
      >
        <Modal.Header>Add Services</Modal.Header>
        <Modal.Content>
          {loadCategory ? (
            <Spinner medium content="Fetching Data..." />
          ) : (
            <CheckboxGroup
              name="categories"
              value={isCategories}
              onChange={setIsCategories}
            >
              {(Checkbox) => (
                <Content
                  width="100%"
                  height="100%"
                  maxh={wid < 768 ? "350px" : "200px"}
                  flex
                  flow="column wrap"
                  hoverflow
                >
                  {categories.map((category) => (
                    <Content
                      width="auto"
                      height="30px"
                      margin={wid < 1024 ? "8px 3px" : "5px"}
                      key={category._id}
                    >
                      <div className="pretty p-default p-round p-smooth">
                        <Checkbox value={category._id} key={category._id} />
                        <div className="state p-warning-o">
                          <CheckLabel textt="uppercase" color="dark">
                            {category.name}
                          </CheckLabel>
                        </div>
                      </div>
                    </Content>
                  ))}
                </Content>
              )}
            </CheckboxGroup>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-end"
            align="center"
          >
            <DButton confirm flex onClick={handleAddService}>
              {loadAdd ? (
                <Spinner small row inverted content="Loading..." />
              ) : (
                <>
                  <Save size="22px" title="Update Content" />
                  Save
                </>
              )}
            </DButton>
          </Content>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const ADD_SERVICES_MUTATION = gql`
  mutation addService($employeeId: ID!, $categoryId: [ID]) {
    addService(employeeId: $employeeId, categoryId: $categoryId) {
      _id
      categoryServices {
        _id
        name
      }
    }
  }
`;

export default ServiceCard;
