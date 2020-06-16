import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { Content } from "../../styled/containers";
import styled from "styled-components";

const TermSpan = styled.span`
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.secondary};
  z-index: 1;
  height: 100%;
  &:hover,
  &:active {
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }
`;

const TermsConditionsModal = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  return (
    <>
      <p>
        I agree to the{" "}
        <TermSpan onClick={() => setIsTermsOpen(true)}>
          terms and conditions
        </TermSpan>
      </p>

      <Modal
        size="small"
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      >
        <Modal.Content scrolling>
          <Content
            width="100%"
            margin="0 auto"
            height="100%"
            flex
            direct="column"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Terms of Use</h3>
              <p>
                This website is operated by Z Essence Facial and Spa. All
                inquiries may be directed to:
              </p>
              <ul styke={{ listStyle: "none" }}>
                <li>Z ESSENCE FACIAL AND SPA</li>
                <li>114 Malihan St, Dasmariñas, Cavite</li>
                <li>09876543121</li>
                <li>431-4031</li>
                <li>zessence.spa@gmail.com</li>
              </ul>
              <p>
                All users of this website will be governed by these terms and
                conditions. Your use of this website constitutes your agreement
                to follow these rules and be bound by them. Otherwise, you will
                be limited to the full functionalities of the website.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Change in Terms and Conditions</h3>
              <p>
                Z Essence Facial and Spa reserves the right to update or modify
                these terms and conditions at any time without prior notice. The
                website will continue to implement on changes to improve the
                overall shopping experience of our customers. All user
                activities will be bound by the terms and conditions as soon as
                the changes are applied.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Compliances with Laws</h3>
              <p>
                You agree to comply with all applicable laws regarding your use
                of the Site.
              </p>
              <p>
                You further agree that information provided by you is truthful
                and accurate to the best of you knowledge. Z Essence Facial and
                Spa shall have the right, but not the obligation, to monitor the
                content of the Site to determine compliance with these Terms of
                Use and any applicable law, regulation, or authorized government
                request. Z Essence Facial and Spa shall have the right to remove
                any material that Z Essence Facial and Spa, in its sole
                discretion, finds to be in violation of the provisions hereof or
                otherwise objectionable.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Copyright Notice</h3>
              <p>
                All content including banners, images, headers, graphics and
                design, audio & video clips and text is the exclusive property
                of Z Essence Facial and Spa and/or is subject to trademark,
                service mark, trade item, copyright and/or other intellectual
                property rights or licenses held by Z Essence Facial and Spa, by
                one of its affiliates or by third parties who have licensed or
                assigned their rights, interests and/or materials to Z Essence
                Facial and Spa. The content of zessencefacialandspa.com is
                intended solely for the personal and non-commercial use of the
                users of our site. As such a user, you may download, print and
                store selected portions of the Content only for your own
                personal and non-commerical use. Any form of plagiarism such as
                copying content is prohibited. Flawless Face and Body reserves
                complete full intellectual property rights in any Content you
                download from this Web site. Except as noted above, you may not
                copy, download, reproduce, modify, publish, distribute,
                transmit, transfer or create derivative works from the Content
                without first obtaining the express written permission of Z
                Essence Facial and Spa.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Customer Satisfaction</h3>
              <p>
                At Z Essence Facial and Spa, we prioritize on customer
                satisfaction by making every purchase of our customer a positive
                experience. Shipments are carefully inspected prior to leaving
                the warehouse, but in the event you are not satisfied with your
                purchase, feel free to contact us.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Disclaimer</h3>
              <p>
                This site and all contents of this site are provided on an "as
                is" basis without warranties of any kind, either express or
                implied, including without limitation warranties of title or
                implied warranties of merchantability or fitness for a
                particular purpose. You acknowledge, by your use of this site,
                that your use of this site is at your sole risk, that you assume
                full responsibility for all costs associated with all necessary
                servicing or repairs of any equipment you use in connection with
                your use of our site, and that Z Essence Facial and Spa shall
                not be liable for any damages of any kind related to your use of
                this site.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Pricing & Sales tax</h3>
              <p>All prices are subject to change without prior notice.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Privacy</h3>
              <p>
                Z Essence Facial and Spa assures that the user’s personal
                information is confidential and we will not rent, sell, barter
                or trade any of the personal details gathered such as the name,
                address, telephone number, email address, credit card
                information and other contact details.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Security</h3>
              <p>
                At Z Essence Facial and Spa, we prioritize in protecting your
                personal information which includes your name, address, contact
                numbers and credit or debit card details. All user information
                is secured by the system and will not be disclosed to any other
                entity other than the user himself/herself.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Termination</h3>
              <p>
                You agree that Z Essence Facial and Spa, in its sole discretion,
                may terminate your password, account (or any part thereof) or
                use of the Site, and remove and discard any Information within
                the Site, for any reason, including, without limitation, for
                lack of use, failure to timely pay any fees or other moneys due
                Flawless Face and Body, or if Z Essence Facial and Spa believes
                that you have violated or acted inconsistently with the letter
                or spirit of the Terms of Use. Z Essence Facial and Spa may also
                in its sole discretion and at any time discontinue providing any
                services, or any part thereof, with or without notice. You agree
                that any termination of your access to the Site under any
                provision of these Terms of Use may be effected without prior
                notice. You further acknowledge and agree that Z Essence Facial
                and Spa may immediately deactivate or delete your account and
                all related Information and files in your account and/or bar any
                further access to such files or the Site. Further, you agree
                that Flawless Face and Body shall not be liable to you or any
                third-party for any termination of your access to the Site.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Trademark Information</h3>
              <p>
                Z Essence Facial and Spa trademarks and service marks, and other
                Z Essence Facial and Spa logos and product and service names are
                owned by and are the exclusive property of Z Essence Facial and
                Spa. Without Z Essence Facial and Spa express prior written
                permission, you agree not to display or use in any manner.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Use of Website</h3>
              <p>
                The website is mainly for individuals and entities wishing to
                review, consider, purchase or otherwise engage in retail
                transactions involving Z Essence Facial and Spa’ goods and
                services and/or to otherwise transact business with or contact Z
                Essence Facial and Spa, on their own behalf. Information about
                the products and services of Z Essence Facial and Spa are
                provided on the website to guide customers on their purchase. No
                information concerning the transactional preferences of an
                individual customer (whether such customer is a person or an
                entity) can be entered, altered, modified or otherwise affected,
                by any third party on behalf of such individual customer.
              </p>
            </div>
          </Content>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TermsConditionsModal;
