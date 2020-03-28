import React, { useState } from "react";
import { Modal, Icon, Form, TextArea } from "semantic-ui-react";
import { DButton, DIconCustom } from "../../../../styled/utils";
import { DGrid, DImage, Content } from "../../../../styled/containers";
import "./modal.custom.css";

const NewSlide = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DButton onClick={() => setOpen(true)}>
        <Icon name="add" />
        New Slide
      </DButton>
      <Modal size={"large"} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Add New Slide</Modal.Header>
        <DGrid two>
          <Modal.Content>
            <Content pad="10px" width="100%" margin="0 auto" height="auto">
              <DImage bordered dashed></DImage>
            </Content>
            <Content
              width="80%"
              margin="0 auto"
              flex
              justify="center"
              align="center"
            >
              <DIconCustom name="camera" size="large" color="teal" pointer />
            </Content>
          </Modal.Content>
          <Modal.Content>
            <Content pad="10px" width="100%" height="100%">
              <Form>
                <Form.Field>
                  <label>Title</label>
                  <input placeholder="title" />
                </Form.Field>
                <Form.Field>
                  <label>Subtitle</label>
                  <input placeholder="title" />
                </Form.Field>
                <Form.Field>
                  <label>Paragraph</label>
                  <TextArea style={{ minHeight: 100 }} />
                </Form.Field>
                <Form.Field>
                  <label>Text Positioning</label>
                  <Content
                    flex
                    justify="space-around"
                    align="center"
                    margin="0 auto"
                    width="80%"
                    height="10vh"
                  >
                    <div className="pretty p-default  p-curve p-pulse">
                      <input type="radio" name="switch1" value="left" />
                      <div className="state  p-info-o">
                        <label>Left</label>
                      </div>
                    </div>
                    <div className="pretty p-default  p-curve p-pulse">
                      <input type="radio" name="switch1" value="center" />
                      <div className="state  p-info-o">
                        <label>Center</label>
                      </div>
                    </div>
                    <div className="pretty p-default p-curve p-pulse">
                      <input type="radio" name="switch1" value="right" />
                      <div className="state  p-info-o">
                        <label>Right</label>
                      </div>
                    </div>
                  </Content>
                </Form.Field>
                <Form.Field>
                  <label>
                    Background-color{" "}
                    <DIconCustom
                      name="question circle outline"
                      customSize="16px"
                      pointer
                    />
                  </label>
                  <input placeholder="hex" />
                </Form.Field>
                <Form.Field>
                  <label>
                    Overlay{" "}
                    <DIconCustom
                      name="question circle outline"
                      customSize="16px"
                      pointer
                    />
                  </label>
                  <Content
                    flex
                    align="center"
                    margin="0 auto"
                    width="80%"
                    height="10vh"
                  >
                    <div class="pretty p-switch p-fill">
                      <input type="checkbox" />
                      <div class="state p-info">
                        <label>Dark</label>
                      </div>
                    </div>
                  </Content>
                </Form.Field>
              </Form>
            </Content>
          </Modal.Content>
        </DGrid>
      </Modal>
    </>
  );
};

export default NewSlide;
