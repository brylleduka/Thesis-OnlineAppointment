import React, { useState, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";

import { DCard, Content, DGrid } from "../../styled/containers";
import { DLabel, IconWrap, DButton, CheckLabel } from "../../styled/utils";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Save } from "@styled-icons/boxicons-solid/Save";
import { Cross } from "@styled-icons/entypo/Cross";
import { Modal, Popup } from "semantic-ui-react";
import CheckboxGroup from "react-checkbox-group";

import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import useWindowSize from "../../../util/hooks/useWindowSize";

const ServiceCard = ({ employee }) => {
  const { employeeAuth } = useContext(AuthContext);
  const { width: wid } = useWindowSize();
  const [openAddService, setOpenAddService] = useState(false);
  const [isCategories, setIsCategories] = useState(
    employee.categoryServices.map((categServ) => categServ._id)
  );
  const [categories, setCategories] = useState([]);

  const { data: categoryData, loading: loadCategory } = useQuery(
    FETCH_ALL_CATEGORIES_QUERY
  );

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
        toaster.notify("Success");
      },
    }
  );

  const handleAddService = () => {
    addService();
  };

  return (
    <>
      <DCard dw="100%" dh="100%" flex fcol justifyBetween overf>
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
            >
              <Plus />
            </IconWrap>
          )}
        </Content>
        <Content
          width="90%"
          height="80%"
          flex
          justify="flex-start"
          align="center"
          flow={wid <= 768 ? "column nowrap" : "column wrap"}
        >
          {categories.map((categ) => (
            <Content width="auto" height="50px" margin="5px" key={categ._id}>
              <DLabel rounded bluer>
                <DGrid
                  custom="7fr 1fr"
                  med5={"7fr 1fr"}
                  med7={"7fr 1fr"}
                  med10={"7fr 1fr"}
                >
                  {categ.name}
                  <IconWrap tiny margin="0 2px">
                    <Cross />
                  </IconWrap>
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
                <Content width="100%" height="200px" flex flow="column wrap">
                  {categories.map((category) => (
                    <Content
                      width="50px"
                      height="50px"
                      margin="5px"
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
                <Spinner small inverted content="Loadin..." />
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
