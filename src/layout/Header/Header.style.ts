
import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  background-image: var(--gradient2);

  padding: 5px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;

  @media (min-width: 1200px) {
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
  }

`;

export const Logo = styled.a`
  display: flex;
  /* justify-content: center; */
  
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`;



