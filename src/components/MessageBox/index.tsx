import React from 'react';

import {
Container
} from './styles';



interface IMessageBoxProps {
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

const MessageBox: React.FC<IMessageBoxProps> = ({
    title,
    description,
    footerText,
    icon
}) => {

    return (

        <Container>
            <header>
                <h1>
                    {title}
                {/* Very good ! */}
                 <img src={icon} alt={title} />
                </h1>
                <p>
                    {description}
                     {/* Your wallet is positive! */}
                </p>
            </header>
          
            <footer>
                <span>
                    {footerText}
                    {/* Keep it up. Consider to invert in your balance */}
                </span>
            </footer>

          
        </Container>
         
    );
}

export default MessageBox;