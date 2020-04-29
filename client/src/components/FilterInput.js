import React from "react";
import { Input, Icon } from "semantic-ui-react";
import { DInput, DButton } from "./styled/utils";
import { Content } from "./styled/containers";

const FilterInput = ({ filterText, onFilter, onClear, isPrint }) => (
  <Content width="350px" height="100%" flex justify="flex-end" align="center">
    <Content width="100%" height="100%">
      <Input
        id="search"
        type="text"
        icon={
          <Icon
            name={filterText.trim() === "" ? "search" : "close"}
            inverted
            circular
            link
            onClick={onClear}
          />
        }
        value={filterText}
        onChange={onFilter}
        placeholder="Filter by date/service/status/last name..."
        fluid
      />
    </Content>
    {isPrint && (
      <DButton onClick={() => window.print()}>
        <Icon name="print" fitted />
      </DButton>
    )}
  </Content>
);

export default FilterInput;
