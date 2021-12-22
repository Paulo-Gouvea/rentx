import React from 'react';
import { StatusBar } from 'react-native';

import {
 Container,
 Header,
 SubTitle,
 Title,
 Footer,
} from './styles';

import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';

export function SignIn(){
   const theme = useTheme();
   
    return (
    <Container>
        <StatusBar
            translucent
            barStyle='dark-content'
            backgroundColor='transparent'
        />

        <Header>
            <Title>
                Estamos {'\n'}quase lá.
            </Title>
            <SubTitle>
                Faça seu login para começar {'\n'}uma experiência incrivel.
            </SubTitle>
        </Header>

        <Footer>
            <Button 
                title='Login'
                onPress={() => {}}
                enabled={false}
                loading={false}
            />
            <Button 
                title='Criar conta gratuita'
                light
                onPress={() => {}}
                enabled={false}
                loading={false}
                color={theme.colors.background_secondary}
            />
        </Footer>
    </Container>
   );
}