import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../util/graphql/employee";
import { IconWrap } from "../../styled/utils";
import { Cross } from "@styled-icons/entypo/Cross";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import Page404 from "../../../pages/Page404";
import Spinner from "../../Spinner";

const RemoveService = ({ categId, employeeId, refetchCategories }) => {
  const [categValue, setCategValue] = useState("");

  const [removeService, { loading: loadRemoving }] = useMutation(
    REMOVE_SERVICE,
    {
      variables: {
        categoryId: categValue,
        employeeId,
      },
      refetchQueries: [{ query: refetchCategories }],
      onCompleted() {
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Service Removed
          </Toasted>
        ));
      },
      onError() {
        return <Page404 />;
      },
    }
  );

  const handleCategoryValue = (e) => {
    setCategValue(e.currentTarget.dataset.categid);
  };

  const handleRemoveService = () => {
    removeService();
  };
  return (
    <div data-categid={categId} onMouseOver={handleCategoryValue}>
      {loadRemoving ? (
        <Spinner mini inverted />
      ) : (
        <IconWrap tiny margin="0 2px" onClick={handleRemoveService}>
          <Cross />
        </IconWrap>
      )}
    </div>
  );
};

const REMOVE_SERVICE = gql`
  mutation removeService($employeeId: ID!, $categoryId: ID!) {
    removeService(employeeId: $employeeId, categoryId: $categoryId) {
      _id
      categoryServices {
        _id
        name
      }
    }
  }
`;

export default RemoveService;
