
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
  width: 100%;

  .searchText {
    flex-grow: 3;
  }

  .searchType {
    flex-grow: 1;
    margin-left: 10px;
    padding-bottom: 0;
  }

`;