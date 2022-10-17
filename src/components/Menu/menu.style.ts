import styled from 'styled-components'

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  #toggleMenu {
    display: none;
  }

  .toggle {
    display: initial;
  }

  #menuContent {
    & a,
    button {
      color: black;
      font-weight: bold;
      margin-left: 2px;

      &:hover {
        color: white;
        background-color: var(--primaryColor);
      }
    }

    #logoutBtn {
      align-self: flex-start;
    }

    #closeBtn {
      display: none;
      width: fit-content;
      margin-bottom: 5px;
    }
  }

  @media (max-width: 800px) {

    #toggleMenu {
      display: flex;
    }

    #logoutBtn {
      width: 100%;
    }

    #menuContent {
      position: fixed;
      right: 0;
      top: 0;
      z-index: 10;
      flex-direction: column;
      background-color: var(--secondaryColor);

      padding-top: 10px;
      width: 200px;
      height: 100%;

      & a {
        justify-content: flex-start;
        padding-bottom: 10px;
      }

      #closeBtn {
        display: flex;
      }
    }

    .toggle {
      display: none;
    }
  }
`;
