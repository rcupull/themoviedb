import * as React from "react";
import { Form } from "react-bootstrap";
import { VsFilter } from "../utils/todoStateControl";
import _ from "lodash";

type TextOption = "View all TODO" | "View active TODO" | "View completed TODO";

const textOption: { vsFilter: VsFilter; text: TextOption }[] = [
  { vsFilter: "VIEW_ALL", text: "View all TODO" },
  { vsFilter: "VIEW_ACTIVE", text: "View active TODO" },
  { vsFilter: "VIEW_COMPLETED", text: "View completed TODO" }
];

const TextToVsFilter: (text: TextOption) => VsFilter = text => {
  let index: number | undefined = _.findIndex(textOption, obj => {
    return obj.text === text;
  });

  return typeof index === "number" ? textOption[index].vsFilter : "VIEW_ALL";
};

const VsFilterToText: (vsFilter: VsFilter) => TextOption = vsFilter => {
  let index: number | undefined = _.findIndex(textOption, obj => {
    return obj.vsFilter === vsFilter;
  });

  return typeof index === "number" ? textOption[index].text : "View all TODO";
};

export interface StateFilterP {
  vsFilter: VsFilter;
}
export interface DispatchFilterP {
  handleChangeFilter: (filterOption: VsFilter) => void;
}

export interface FilterPProps extends StateFilterP, DispatchFilterP {}
const FilterP: React.SFC<FilterPProps> = ({ vsFilter, handleChangeFilter }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Control
          onChange={(event: any) => {
            handleChangeFilter(TextToVsFilter(event.target.value));
          }}
          as="select"
          value={VsFilterToText(vsFilter)}
        >
          {textOption.map((obj, id) => (
            <option key={id}>{obj.text}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default FilterP;
