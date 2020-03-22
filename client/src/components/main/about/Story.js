import React from "react";
import { DGrid, DSection, Content, DImage } from "../../styled/containers";

const Story = ({ content }) => {
  return (
    <>
      <DSection
        height="100%"
        width="90%"
        margin="24px auto 0 auto"
        ref={content}
      >
        <DGrid two>
          <Content
            flex
            justify="flex-start"
            align="center"
            width="100%"
            height="100%"
            direct="column"
            pad="24px"
          >
            <h3>Our Mission</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
              quia at alias reiciendis voluptatum illo quidem natus quod porro
              voluptatem? Obcaecati totam libero rerum nihil nemo, iusto aliquid
              repellendus repudiandae?
            </p>
            <h3>Our Vision</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
              quia at alias reiciendis voluptatum illo quidem natus quod porro
              voluptatem? Obcaecati totam libero rerum nihil nemo, iusto aliquid
              repellendus repudiandae?
            </p>
          </Content>
          <Content
            flex
            justify="flex-start"
            align="center"
            direct="column"
            width="90%"
            height="100%"
            margin="0 auto"
            pad="24px"
          >
            <DGrid gap="20px">
              <DImage height="200px">
                <img
                  src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="about"
                />
              </DImage>
              <DImage height="200px">
                <img
                  src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="about"
                />
              </DImage>
            </DGrid>
          </Content>
        </DGrid>
      </DSection>
      <DSection height="100%" width="90%" mcenter>
        <DGrid two>
          <Content
            flex
            justify="flex-start"
            align="center"
            direct="column"
            width="90%"
            height="100%"
            margin="0 auto"
            pad="24px"
          >
            <DGrid gap="20px">
              <DImage height="200px">
                <img
                  src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="about"
                />
              </DImage>
              <DImage height="200px">
                <img
                  src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="about"
                />
              </DImage>
            </DGrid>
          </Content>
          <Content
            flex
            justify="flex-start"
            align="center"
            width="100%"
            height="100%"
            direct="column"
            pad="20px"
          >
            <h3>Our Story</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
              quia at alias reiciendis voluptatum illo quidem natus quod porro
              voluptatem? Obcaecati totam libero rerum nihil nemo, iusto aliquid
              repellendus repudiandae? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Minima officiis nobis, nam voluptatem saepe
              quidem aspernatur harum qui, esse quasi delectus, ipsa culpa velit
              eveniet obcaecati optio maxime odit dicta!
            </p>
          </Content>
        </DGrid>
      </DSection>
    </>
  );
};

export default Story;
