import React from "react";
import { Link } from "react-router-dom";
import { DFooter, DFooterLinks } from "../../styled/containers";
const Footer = () => {
  return (
    <>
      <DFooterLinks>
        <div className="links-inner">
          <ul>
            <li>
              <h3>What's new</h3>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h3>What's new</h3>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h3>What's new</h3>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h3>What's new</h3>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h3>What's new</h3>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h3>What's new</h3>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
          </ul>
        </div>
      </DFooterLinks>
      <DFooter>
        <div className="footer-inner">
          <div>English (Philippines)</div>

          <ul>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beautiful and Pretty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">Beauty</Link>
            </li>
            <li>
              <Link to="/">
                &copy; Z Essence 2019-{new Date().getFullYear()}
              </Link>
            </li>
          </ul>
        </div>
      </DFooter>
    </>
  );
};

export default Footer;
