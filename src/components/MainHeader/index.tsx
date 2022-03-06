import React, { useMemo, useState } from 'react';
import Toggle from '../Toogle';

import emojis from '../../utils/emojis';


import {
    Container,
    Profile,
    Welcome,
    UserName
} from './styles';

import { useTheme} from '../../hooks/theme';

const MainHeader: React.FC = () => {

    const {toggleTheme, theme} = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }
    
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    }, []);

    return (

        <Container>
            <Toggle 
                labelLeft="Light"
                labelRight="Dark"
                checked={darkTheme}
                onChange={handleChangeTheme}
            
            />

             <Profile>
                 <Welcome>Hello, {emoji}</Welcome>
                 <UserName>Arthur Lima</UserName>

             </Profile>
        </Container>
         
    );
}

export default MainHeader;