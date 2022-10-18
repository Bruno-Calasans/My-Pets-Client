import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  a {
    align-self: flex-start;
    margin-top: 5px;
    margin-bottom: 5px;
  }

`;

export const PetsList = styled.div`

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;

  margin-top: 5px;
  margin-bottom: 5px;

  .card {
    background-color: lightcyan;
    opacity: 0.9;

    width: 250px;

    &:hover{
      opacity: 1;
    }

    .cardArea{
      display: flex;
      flex-direction: column;
      height: 100%;

      .cardMedia{
        height: 200px;
        
      }

      .cardContent{
        width: 100%;
        flex-grow: 1;
      }
    }

    .petName {
      font-size: 1.5rem;
      text-transform: capitalize;
      text-align: center;
      font-weight: bold;
      color: var(--primaryColor);
    }
  
    .petInfo{
      display: flex;
      justify-content: center;
    }
  
    .petOwner {
      font-style: italic;
      font-weight: bold;
      text-align: left;
    }

    .petAdopter {
      font-style: italic;
      text-align: center;
    }

    .petAvaliable{
      color: red;
      font-weight: bold;
      text-align: center;
    }

    .petCreatedAt{
      text-align: left;
    }

    .cardActions {
      justify-content: center;
    }
  }

  @media (max-width: 1200px){
    grid-template-columns: 1fr 1fr 1fr;
    
  }

  @media (max-width: 850px){
    .card {
      justify-self: center;
    }
    grid-template-columns: 1fr 1fr;
    
  }

  @media (max-width: 520px){
    grid-template-columns: 1fr;
    grid-gap: 10px 0;
  }

`;
