import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_BRANDS } from "../../../../util/graphql/brand";
import { Overlay } from "../../../styled/containers";
import Spinner from "../../../Spinner";

import styled from "styled-components";

const BrandGroup = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  position: relative;

  .input-hidden {
    position: absolute;
    left: -9999px;
  }

  input[type="radio"]:checked + label > img {
    border: 1px solid #fff;
    box-shadow: 0 0 3px 3px ${({ theme }) => theme.secondary};
  }

  input[type="radio"] + label > img {
    border: 1px dashed ${({ theme }) => theme.secondary};
    width: 150px;
    height: auto;
    transition: 500ms all;
    margin: 5px;
    cursor: pointer;
  }
`;

const BrandList = () => {
  const [isBrands, setIsBrands] = useState([]);
  const [imageID, setImageID] = useState("");

  const { data: dataBrands, loading: loadBrands } = useQuery(FETCH_BRANDS);

  useEffect(() => {
    if (dataBrands) setIsBrands(dataBrands.brands);
  }, [dataBrands]);

  const [updateActiveBrand, { loading: loadUpdateActiveBrand }] = useMutation(
    UPDATE_BRAND_ACTIVE,
    {
      variables: { id: imageID },
      refetchQueries: [{ query: FETCH_BRANDS }],
    }
  );

  const updateLOGO = (e) => {
    updateActiveBrand();
  };

  return (
    <BrandGroup>
      {isBrands.map((brand) => (
        <>
          <input
            type="radio"
            name="zessence"
            id={brand._id}
            className="input-hidden"
            checked={brand.active ? true : false}
          />
          <label
            for={brand._id}
            onMouseOver={() => setImageID(brand._id)}
            onClick={updateLOGO}
          >
            <img src={brand.imageURL} alt={brand.image} />
          </label>
          {loadUpdateActiveBrand && (
            <Overlay bg="rgba(0,0,0,0.2)" flex justify="center" align="center">
              <Spinner medium inverted />
            </Overlay>
          )}
        </>
      ))}
    </BrandGroup>
  );
};

const UPDATE_BRAND_ACTIVE = gql`
  mutation updateActiveBrand($id: ID) {
    updateActiveBrand(_id: $id) {
      _id
      image
      imageURL
      active
    }
  }
`;

export default BrandList;
