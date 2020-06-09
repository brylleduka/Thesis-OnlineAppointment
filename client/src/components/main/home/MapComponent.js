import React from "react";
import { Content } from "../../styled/containers";
import GoogleMapReact from "google-map-react";
import { Marker } from "@styled-icons/foundation";

const MapComponent = ({ lat, lng, mapKey }) => {
  console.log(mapKey);
  return (
    <Content
      height="70vh"
      width="100%"
      bgcolor="#ccc"
      flex
      justify="center"
      align="center"
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: mapKey,
        }}
        defaultCenter={{ lat, lng }}
        defaultZoom={15}
      >
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%,-50%)",
          }}
          lat={14.326171}
          lng={120.9369621}
          text="MARKER"
        >
          <Marker color="#fe8c00" size="48px" />
        </div>
      </GoogleMapReact>
    </Content>
  );
};

export default MapComponent;
