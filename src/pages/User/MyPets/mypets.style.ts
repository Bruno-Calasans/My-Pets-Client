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
  margin-left: auto;
  margin-right: auto;
  width: 80%;

  .card {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    padding: 10px;

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
      width: 100%;
      /* flex-direction: column; */
      justify-content: center;

      .actionBtn {
        font-size: 0.6rem;
        justify-content: center;
        margin: 0;
        margin-left: 5px;
        margin-right: 5px;
        width: 80%;
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



