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
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="branding"
          >
            <h2>Z ESSENCE FACIAL AND SPA</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              rerum quaerat quasi dolore ex recusandae quas eligendi dolor?
              Dolores, provident.
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
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur, quae.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Contact</h3>
                <ul>
                  <li>zessence@gmail.com</li>
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
                <Link to="/">Terms</Link>
              </li>
              <li>
                <Link to="/">Privacy</Link>
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
