import { AllTodoState } from "./reducers";
import PFilter from "./pFilter";
import { visibilityFilters, SetVisibilityFilterCreate } from "./actionUtils";
import { connect } from "react-redux";

const mapStateToProps = (state: AllTodoState) => {
  return {
    vsFilter: state.vsFilter
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleChangeVsFilter: (vsFilter: visibilityFilters) => {
      dispatch(SetVisibilityFilterCreate(vsFilter));
    }
  };
};

const CFilter = connect(mapStateToProps, mapDispatchToProps)(PFilter);

export default CFilter;
