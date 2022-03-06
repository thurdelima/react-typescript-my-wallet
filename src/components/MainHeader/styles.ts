import styled from 'styled-components';

import ToggleComponent from '../Toogle'; 

export const Container = styled.div`
      grid-area: MH;
    /*  color: ${props => props.theme.color.white};  */
      background-color: ${props => props.theme.color.secondary};  
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      border-bottom: 1px solid ${props => props.theme.color.gray}
`;


export const Profile = styled.div`
      color: ${props => props.theme.color.white};

`;

export const Welcome = styled.h3``;

export const UserName = styled.span``;

export const Toggle = styled(ToggleComponent)`

    @media(max-width: 600px) { 
       visibility: hidden;
        
    }


`;