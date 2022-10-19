import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const PetsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .card {
    display: flex;
    margin: 20px 0px;

    .cardArea {
      display: flex;

      .petAvatar {
        width: 120px;
        height: 100px;
      }

      .cardContent {
        width: 100%;
        flex-grow: 1;

        .petName {
          color: var(--primaryColor);
          text-transform: capitalize;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .adoptionInfo {
          font-style: italic;
          padding: 5px;
        }
      }
    }

    .cardBtns {
      width: 300px;
      flex-direction: column;
      justify-content: center;

      .actionBtn {
        font-size: 0.6rem;
        justify-content: center;
        margin: 0;
        margin-bottom: 5px;
        width: 100%;
      }
    }
  }

  @media (max-width: 600px) {
    justify-content: center;
    align-items: center;

    .card {
      flex-direction: column;
      width: 300px;

      .cardArea {
        flex-direction: column;

        .cardContent {
          .petName {
            text-align: center;
          }
        }
      }
    }
  }
`;



