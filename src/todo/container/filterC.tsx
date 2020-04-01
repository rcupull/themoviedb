import * as React from "react";
import { connect } from "react-redux";
import FilterP, {
  DispatchFilterP,
  StateFilterP
} from "../presentational/filterP";
import { StateTodoReducer, VsFilter } from "../utils/todoStateControl";
import { ActionChangeVsFilter } from "../utils/actions";

export const mapStateToProps: (
  state: StateTodoReducer
) => StateFilterP = state => {
  return { vsFilter: state.vsFilter };
};

export const mapDispatchToProps: (
  dispatch: any
) => DispatchFilterP = dispatch => {
  return {
    handleChangeFilter: (filterOption: VsFilter) => {
      dispatch(ActionChangeVsFilter(filterOption));
    }
  };
};

const FilterC = connect(mapStateToProps, mapDispatchToProps)(FilterP);

export default FilterC;
