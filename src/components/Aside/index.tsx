import React, {useState} from 'react';

import {
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter
} from './styles';

import {
    BrowserRouter,

    Route,
    Link,

} from "react-router-dom";

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu

} from 'react-icons/md';

import Toggle from '../Toogle';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';



const Aside: React.FC = () => {

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

    const { signOut } = useAuth();
    const {toggleTheme, theme} = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);


    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }


    const handleToggleMenu = () => {

        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    return (

        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu /> }
                </ToggleMenu>

                <LogImg src={logoImg} alt="Logo Minha Carteira" />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>

               
                    <MenuItemLink to="/">
                        <MdDashboard />
                        Dashboard
                    </MenuItemLink>

              

               

               
                    <MenuItemLink to="/list/entry-balance">
                        <MdArrowUpward />
                        Gains
                    </MenuItemLink>

             

             

                    <MenuItemLink to="/list/exit-balance">
                        <MdArrowDownward />
                        Expenses
                    </MenuItemLink>

               




                <MenuItemButton onClick={signOut} >
                    <MdExitToApp />
                    Quit
                </MenuItemButton>
            </MenuContainer>
            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
            <Toggle 
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            
            />

            </ThemeToggleFooter>
        </Container>

    );
}

export default Aside;