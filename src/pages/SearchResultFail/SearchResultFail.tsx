import React from "react";
import {
  StyledSearchForm,
  StyledFormContainer,
  StyledButton,
  StyledButtonDiv,
} from "../../assets/styled-components/main";

interface SearchResultFailProps {}

const SearchResultFail: React.FC<SearchResultFailProps> = () => {
  return (
    <StyledSearchForm>
      <StyledFormContainer>
        <div className="results-container">
          <p className="error-page">Oops, something went wrong!</p>
          <StyledButtonDiv>
            <StyledButton type="submit">
              <a href="/">Back</a>
            </StyledButton>
          </StyledButtonDiv>
        </div>
      </StyledFormContainer>
    </StyledSearchForm>
  );
};

export default SearchResultFail;
