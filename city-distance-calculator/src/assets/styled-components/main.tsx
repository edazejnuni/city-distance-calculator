import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bg from "../images/bg.png";
import dots from "../images/dots.png";
import add from "../images/add.png";

export const StyledSearchForm = styled("div")`
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  @media (max-width: 768px) {
    display: block;
    padding: 100px 20px;
  }
`;
export const StyledFormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 80px;
  margin: auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
export const StyledSearchBar = styled("div")`
  display: flex;
  margin-bottom: 10px;
`;
export const DirectionalBox = styled("div")`
  display: block;
  text-align: left;
  margin-left: 30px;
`;
export const FlexDirectionalBox = styled("div")`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const LocationIcon = styled.div`
  background-image: url(${dots});
  background-size: 13px 100%;
  background-position-y: 0;
  position: relative;
  left: -1px;
  top: 36px;
  width: 20px;
  background-repeat: no-repeat;
`;

export const StyledForm = styled("form")`
  width: 100% !important;
  text-align: center;
  margin-top: 8px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

export const StyledSearch = styled("div")`
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const StyledTextField = styled(TextField)`
  input {
    padding: 0 15px;
    width: 100%; /* Use full width for mobile */
    height: 32px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    @media (max-width: 768px) {
      margin-bottom: 10px; /* Add some space between inputs */
    }
  }
`;

export const StyledText = styled("p")`
  && {
    margin-top: 16px;
    color: rgb(38, 49, 111);
  }
`;
export const StyledLink = styled("a")`
  && {
    display:inline-flex;
    position: relative;
    left: -4px;
    font-size: 12px;
    color: #7786d2;
    font-weight: 500;
    text-align: left;
    width:100%;
    cursor:pointer;
  }
  &:hover{
    span{
      background:#7786d2;
      color:#ffffff;
    }
  }
  span{
    display: inline-block;
    border: 1px solid;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 0.6;
    margin-right: 40px;
    font-size: 17px;
}
  }
`;
export const AddIcon = styled("div")`
  && {
    background-image: url(${add});
  }
`;

export const StyledCloseButton = styled(Button)`
  && {
    position: absolute;
    right: 0;
    top: 5px;
  }
`;
export const StyledButton = styled(Button)`
  && {
    width: 72px;
    height: 32px;
    background: #374151;
    color: #ffffff;
    border-radius: 4px;
    justify-content: center;
    text-transform: capitalize;
    margin-top: 40px;
    &:hover {
      background: #374151;
    }
    &:disabled {
      background: var(--grey, #e5e7eb);
      color: white;
      cursor: not-allowed;
    }
    a {
      color: #ffffff;
      text-decoration: none;
    }
  }
`;
export const StyledButtonDiv = styled("div")`
  && {
    width: 100%;
    text-align: center;
  }
`;

export const InputFieldsLabel = styled("label")`
  line-height: 1.8;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
`;
