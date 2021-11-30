import React from 'react';
import { useNavigation } from '@react-navigation/native'

import { NavigationProps } from '../Home';

import { useWindowDimensions, StatusBar } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
 Container,
 Content, 
 Title,
 Message,
 Footer,
} from './styles';

interface SchedulingCompleteProps extends NavigationProps {}

export function SchedulingComplete({navigation}: SchedulingCompleteProps){
    const { width } = useWindowDimensions();
    navigation = useNavigation();

    function handleHome() {
        navigation.navigate('Home');
    }

   return (
    <Container>
        <StatusBar
            translucent
            barStyle='light-content'
            backgroundColor='transparent'
        />
        <LogoSvg width={width} />

        <Content>
            <DoneSvg width={80} height={80} />
            <Title>Carro alugado!</Title>

            <Message>
                Agora você só precisa ir {'\n'}
                até a concessionária da RENTX {'\n'}
                pegar o seu automóvel.
            </Message>
        </Content>

        <Footer>
            <ConfirmButton
                title="OK"
                onPress={handleHome}
            />
        </Footer>

    </Container>
   );
}