
import React, { useState} from 'react';


import logoImg from '../../assets/logo.svg';

import {useAuth} from '../../hooks/auth';

import {Container, Logo, Form, FormTitle} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';



const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');  

    const { signIn } = useAuth();

    return (
       <Container>
           <Logo>
               <img src={logoImg} alt="Minha Carteira" />
               <h2>My Wallet</h2>
           </Logo>

           <Form onSubmit={() => signIn(email, password)}>
               <FormTitle>
                  Enter
               </FormTitle>

               

                <Input
                    type="email"
                    placeholder="e-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
               
                <Input 
                    type="password"
                    placeholder="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />


               <Button type="submit">Access</Button>


           </Form>
       </Container>
    );
}

export default SignIn;