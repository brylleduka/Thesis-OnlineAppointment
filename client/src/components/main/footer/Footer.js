import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { DFooter, DFooterLinks } from "../../styled/containers";
import {
  LinkedinSquare,
  FacebookCircle,
  Twitter,
} from "@styled-icons/boxicons-logos";

import { Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <>
      <DFooterLinks>
        <div className="footer-container">
          <div className="branding">
            <div className="brand-content">
              <div className="brand-container">
                <img
                  src={"/images/logo.png"}
                  alt="Z Essence"
                  className="brand"
                />
              </div>
              <h3>Z ESSENCE FACIAL AND SPA</h3>
            </div>

            <p>
              Specialize on facial treatments & spa services. ensuring our
              clients the best quality of services with satisfying result as
              much as possible,with modern machines for aesthetics and a
              friendly accommodating staffs.
            </p>
          </div>
          <div className="inner-links">
            <ul>
              <li>
                <h3>Explore</h3>
              </li>
              <li>
                <Link to="/#home">Home</Link>
              </li>
              <li>
                <Link to="/services&rates/#services">Services</Link>
              </li>
              <li>
                <Link to="/about/#about">About Us</Link>
              </li>

              <li>
                <Link to="/about/#team">Our Team</Link>
              </li>
              <li>
                <Link to="/gallery/#gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/testimonials/#tstmnl">Testimonials</Link>
              </li>
              <li>
                <Link to="/appointment">Appointment</Link>
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <h3>Visit</h3>
                <p>114 Malihan St, Dasmariñas, Cavite</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Contact</h3>
                <ul>
                  <li>zessence.spa@gmail.com</li>
                  <li>09876543121</li>
                  <li>431-4031</li>
                </ul>
              </div>
            </div>
            <ul>
              <li>
                <h3>Follow</h3>
              </li>
              <li>
                <a href="https://www.facebook.com/zessencedasma">
                  <FacebookCircle size="28px" color="#4267B2" />
                </a>
              </li>
              <li>
                <a href="/">
                  <Icon name="instagram" size="big" className="logo-ig" />
                </a>
              </li>
              <li>
                <a href="/">
                  <Twitter size="28px" color="#00acee" />
                </a>
              </li>
              <li>
                <a href="/">
                  <LinkedinSquare size="28px" color="#0e76a8" />
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <h3>Legal</h3>
              </li>
              <li>
                <Link to="/terms&conditions/#tc">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </DFooterLinks>
      <DFooter>
        <div className="footer-inner">
          <div>English (Philippines)</div>

          <div>
            &copy; Z Essence 2019-{new Date().getFullYear()}. All Rights
            Reserved
          </div>
        </div>
      </DFooter>
    </>
  );
};

export default Footer;
