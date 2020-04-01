import React from "react";
import { visibilityFilters } from "./actionUtils";
import { Form } from "react-bootstrap";
import _ from "lodash";

type vsFilterOptionLabel =
  | "Show active TODO"
  | "Show completed TODO"
  | "Show all TODO";
interface vsFilterOptionObj {
  vsFilter: visibilityFilters;
  label: vsFilterOptionLabel;
}
const vsFilterOptionArray: vsFilterOptionObj[] = [
  { vsFilter: "SHOW_ACTIVE", label: "Show active TODO" },
  { vsFilter: "SHOW_COMPLETED", label: "Show completed TODO" },
  { vsFilter: "SHOW_ALL", label: "Show all TODO" }
];

export interface PFilterProps {
  vsFilter: visibilityFilters;
  handleChangeVsFilter: (vsFilter: visibilityFilters) => void;
}

const PFilter: React.SFC<PFilterProps> = ({
  vsFilter,
  handleChangeVsFilter
}) => {
  const labelToFilter: (
    label: vsFilterOptionLabel
  ) => visibilityFilters | undefined = label => {
    return _.find(vsFilterOptionArray, obj => {
      return obj.label === label;
    })?.vsFilter;
  };

  const filterToLabel: (
    vsFilter: visibilityFilters
  ) => vsFilterOptionLabel | undefined = vsFilter => {
    return _.find(vsFilterOptionArray, obj => {
      return obj.vsFilter === vsFilter;
    })?.label;
  };

  const handleOnChange = (label: vsFilterOptionLabel) => {
    let vsFilterOption: visibilityFilters | undefined = labelToFilter(label);
    if (vsFilterOption) handleChangeVsFilter(vsFilterOption);
  };

  return (
    <Form>
      <Form.Control
        onChange={(e: any) => {
          handleOnChange(e.target.value);
        }}
        as="select"
        value={filterToLabel(vsFilter)}
      >
        {vsFilterOptionArray.map((obj: vsFilterOptionObj, id: number) => (
          <option key={id}>{obj.label}</option>
        ))}
      </Form.Control>
    </Form>
  );
};

export default PFilter;
