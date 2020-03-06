import CSS from "csstype";
/////////////////////////////Basic Card////////////////////////////////////
export const basicCardStyle: CSS.Properties = {
  width: "100%",
  height: "95%"
  // margin: "20px",
  // padding: "20px"
};
export const basicCardImgStyle: CSS.Properties = {
  width: "100%"
};

export const basicCardBodyStyle: CSS.Properties = {
  padding: "5px 5px 20px 5px"
};
export const basicCardBodyImgStyle: CSS.Properties = {
  padding: 0
  // width: "100%"
};

export const basicCardTitleStyle: CSS.Properties = {
  fontSize: "1.2rem",
  textAlign: "left",
  padding: "10px 10px 20px 0",
  fontWeight: "bold"
};
/////////////////////////////NavBar////////////////////////////////////
export const navBarLinkStyle: CSS.Properties = {
  padding: "5px",
  margin: "0 30px",
  color: "rgb(140,140,140)",
  fontSize: "1.5rem"
};

export const navBarSearchButtonStyle: CSS.Properties = {
  padding: "0.375rem 0.75rem",
  color: "#28a745",
  border: "1px solid",
  borderRadius: "0.25rem",
  cursor: "pointer"
};
export const navBarBrandStyle: CSS.Properties = {
  width: "200px",
  borderRightColor: "gray",
  borderRightStyle: "solid",
  borderWidth: "0.2px",
  textAlign: "center",
  fontSize: "2rem"
};

/////////////////////////////Detail Card////////////////////////////////////
export const detailCardStyle: CSS.Properties = {
  width: "100%",
  padding: "10px"
};
export const detailCardTitleStyle: CSS.Properties = { fontSize: "2rem" };
export const detailCardImgStyle: CSS.Properties = { width: "100%" };
export const detailCardColStyle1: CSS.Properties = { textAlign: "right" };
export const detailCardBodyTitleStyle: CSS.Properties = {
  textAlign: "right",
  padding: "5px"
};
/////////////////////////////Favorite Component////////////////////////////////////
export const favoriteStylEnable: CSS.Properties = {
  cursor: "pointer",
  fontSize: "2rem",
  padding: "5px 0 0 50px",
  color: "red"
};
export const favoriteStylDisable: CSS.Properties = {
  cursor: "pointer",
  fontSize: "2rem",
  padding: "5px 0 0 50px"
};
/////////////////////////////Login Component////////////////////////////////////
export const UserModeLabelStyle: CSS.Properties = {
  fontSize: "2rem",
  textAlign: "center"
};
