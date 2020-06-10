import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_CONTACT_INFO } from "../../../util/graphql/contact";
import { DCard, Content } from "../../styled/containers";
import { DLabel, IconWrap, DInput, DButton } from "../../styled/utils";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
import Spinner from "../../Spinner";
import toaster from "toasted-notes";
import Toasted from "../../Toasted";
import { Eye, EyeSlash } from "@styled-icons/fa-regular";

import useWindowSize from "../../../util/hooks/useWindowSize";

const regexFloat = /^[+-]?\d+(\.\d+)?$/;

const ContactDetails = ({ contactInfo }) => {
  const { width: wid } = useWindowSize();
  const { employeeAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isEditContact, setIsEditContact] = useState(false);
  const [isReveal, setIsReveal] = useState(false);

  const [contactValue, setContactValue] = useState({
    address: contactInfo.address,
    lat: contactInfo.lat,
    lng: contactInfo.lng,
    mapKey: contactInfo.mapKey,
    phone: contactInfo.phone,
    mobile: contactInfo.mobile,
  });

  const [updateContact, { loading: loadingUpdateContact }] = useMutation(
    UPDATE_CONTACT,
    {
      variables: {
        contactId: contactInfo._id,
        address: contactValue.address,
        lat: contactValue.lat,
        lng: contactValue.lng,
        mapKey: contactValue.mapKey,
        phone: contactValue.phone,
        mobile: contactValue.mobile,
      },
      refetchQueries: [
        {
          query: FETCH_CONTACT_INFO,
        },
      ],

      onCompleted() {
        setIsEditContact(false);
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Info Updated
          </Toasted>
        ));
      },
    }
  );

  const handleContactValue = (e) => {
    setContactValue({ ...contactValue, [e.target.name]: e.target.value });
  };

  const handleEditContact = () => {
    setIsEditContact(!isEditContact);
  };

  const handleReveal = () => {
    setIsReveal(!isReveal);
  };

  const handleUpdateContact = () => {
    updateContact();
  };
  return (
    <DCard dw="100%" dh="100%" flex fcol justifyBetween overf>
      <Content
        flex
        width="100%"
        height="auto"
        justify="space-between"
        align="center"
      >
        <DLabel size={wid < 768 ? "18px !important" : "22px"} weight={700}>
          Contact Info Details
        </DLabel>
        {(employeeAuth.role === "ADMIN" || employeeAuth.level > 2) && (
          <>
            <IconWrap
              invisible={isEditContact ? true : null}
              bgcolor={({ theme }) => theme.blue}
              medium
              title={"Update Info"}
              topright
              circle
              shadow
              pad="3px"
              color="light"
            >
              <Edit onClick={handleEditContact} />
            </IconWrap>

            <IconWrap
              invisible={!isEditContact ? true : null}
              medium
              title={"Cancel Update"}
              topright
              circle
              shadow
              color="red"
            >
              <Cancel onClick={handleEditContact} />
            </IconWrap>
          </>
        )}
      </Content>

      <Content
        width={wid <= 768 ? "90%" : "80%"}
        height="100%"
        margin="0 auto"
        flex
        justify="flex-start"
        align="center"
        direct="column"
      >
        {/* ADDRESS */}
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel flex alignCenter weight={700} w={"40%"} size="14px">
            Location Address:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
          >
            <Content
              height="auto"
              width="100%"
              flex
              justify="flex-start"
              align="center"
              pad="5px 10px"
              direct="column"
              margin="0 auto"
            >
              {isEditContact ? (
                <>
                  {contactValue.address.trim() !== "" ? (
                    ""
                  ) : (
                    <DLabel rounded color="red" bglight>
                      Location address must not be empty
                    </DLabel>
                  )}

                  <DInput
                    error={contactValue.address.trim() !== "" ? null : true}
                    fluid
                    type="text"
                    name="address"
                    value={contactValue.address}
                    onChange={handleContactValue}
                  />
                </>
              ) : (
                <DLabel flex alignCenter weight={500} size="16px">
                  {contactInfo.address}
                </DLabel>
              )}
            </Content>
          </Content>
        </Content>
        {/* END ADDRESS */}
        {/* LATITUDE */}
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel flex alignCenter weight={700} w={"40%"} size="14px">
            Latitude:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
            direct="column"
          >
            {isEditContact ? (
              <>
                {regexFloat.test(contactValue.lat) ? (
                  ""
                ) : (
                  <DLabel rounded color="red" bglight>
                    Latitude must contain numbers only
                  </DLabel>
                )}

                <DInput
                  error={regexFloat.test(contactValue.lat) ? null : true}
                  fluid
                  type="text"
                  name="lat"
                  value={contactValue.lat}
                  onChange={handleContactValue}
                />
              </>
            ) : (
              <DLabel flex alignCenter weight={500} size="16px">
                {contactInfo.lat}
              </DLabel>
            )}
          </Content>
        </Content>
        {/* END LATITUDE */}
        {/* LONGITUDE */}
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel flex alignCenter weight={700} w={"40%"} size="14px">
            Longitude:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
            direct="column"
          >
            {isEditContact ? (
              <>
                {regexFloat.test(contactValue.lng) ? (
                  ""
                ) : (
                  <DLabel rounded color="red" bglight>
                    Longitude must contain numbers only
                  </DLabel>
                )}

                <DInput
                  error={regexFloat.test(contactValue.lng) ? null : true}
                  fluid
                  type="text"
                  name="lng"
                  value={contactValue.lng}
                  onChange={handleContactValue}
                />
              </>
            ) : (
              <DLabel flex alignCenter weight={500} size="16px">
                {contactInfo.lng}
              </DLabel>
            )}
          </Content>
        </Content>
        {/* END LONGITUDE */}
        {/* MAP KEY */}

        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel flex alignCenter weight={700} w={"40%"} size="14px">
            Google Map API KEY:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="center"
            align="center"
            pad="5px 10px"
            margin="0 auto"
          >
            {isEditContact ? (
              <>
                {/* {contactValue.mapKey.trim() !== "" ? (
                  ""
                ) : (
                  <DLabel rounded color="red" bglight>
                    Google Map API Key must not be empty
                  </DLabel>
                )} */}

                <DInput
                  //   error={contactValue.mapKey.trim() !== "" ? null : true}
                  fluid
                  type={isReveal ? "text" : "password"}
                  name="mapKey"
                  value={contactValue.mapKey}
                  onChange={handleContactValue}
                />
                {isReveal ? (
                  <Eye
                    onClick={handleReveal}
                    size="22px"
                    style={{
                      cursor: "pointer",
                      margin: "0 5px",
                      color: "#0f9b0f",
                    }}
                  />
                ) : (
                  <EyeSlash
                    onClick={handleReveal}
                    size="22px"
                    style={{
                      cursor: "pointer",
                      margin: "0 5px",
                      color: "#2980B9",
                    }}
                  />
                )}
              </>
            ) : (
              <DLabel flex alignCenter weight={500} size="16px">
                {isReveal
                  ? contactInfo.mapKey
                  : contactInfo.mapKey.replace(/./g, "*")}
                {isReveal ? (
                  <Eye
                    onClick={handleReveal}
                    size="22px"
                    style={{
                      cursor: "pointer",
                      margin: "0 5px",
                      color: "#0f9b0f",
                    }}
                  />
                ) : (
                  <EyeSlash
                    onClick={handleReveal}
                    size="22px"
                    style={{
                      cursor: "pointer",
                      margin: "0 5px",
                      color: "#2980B9",
                    }}
                  />
                )}
              </DLabel>
            )}
          </Content>
        </Content>
        {/* END MAPKEY */}
        {/* PHONE */}
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel flex alignCenter weight={700} w={"40%"} size="14px">
            Phone Number:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
            direct="column"
            margin="0 auto"
          >
            {isEditContact ? (
              <>
                <DInput
                  fluid
                  type="text"
                  name="phone"
                  value={contactValue.phone}
                  onChange={handleContactValue}
                />
              </>
            ) : (
              <DLabel flex alignCenter weight={500} size="14px" breakWord>
                {contactInfo.phone}
              </DLabel>
            )}
          </Content>
        </Content>
        {/* END PHONE */}
        {/* MOBILE */}
        <Content
          height="auto"
          width="100%"
          flex
          justify="flex-start"
          align="center"
        >
          <DLabel flex alignCenter weight={700} w={"40%"} size="14px">
            Mobile Number:
          </DLabel>
          <Content
            height="auto"
            width="100%"
            flex
            justify="flex-start"
            align="center"
            pad="5px 10px"
            direct="column"
            margin="0 auto"
          >
            {isEditContact ? (
              <>
                <DInput
                  fluid
                  type="text"
                  name="mobile"
                  value={contactValue.mobile}
                  onChange={handleContactValue}
                />
              </>
            ) : (
              <DLabel flex alignCenter weight={500} size="14px" breakWord>
                {contactInfo.phone}
              </DLabel>
            )}
          </Content>
        </Content>
        {/* END PHONE */}
      </Content>
      {isEditContact && (
        <Content flex width="100%" justify="flex-end" align="center">
          <DButton confirm onClick={handleUpdateContact}>
            {loadingUpdateContact ? (
              <Spinner inverted row small content="Loading..." />
            ) : (
              "Update"
            )}
          </DButton>
        </Content>
      )}
    </DCard>
  );
};

const UPDATE_CONTACT = gql`
  mutation updateContact(
    $contactId: ID
    $address: String
    $lat: Float
    $lng: Float
    $mapKey: String
    $phone: String
    $mobile: String
  ) {
    updateContact(
      _id: $contactId
      address: $address
      lat: $lat
      lng: $lng
      mapKey: $mapKey
      phone: $phone
      mobile: $mobile
    ) {
      _id
      address
      lat
      lng
      mapKey
      phone
      mobile
    }
  }
`;

export default ContactDetails;
