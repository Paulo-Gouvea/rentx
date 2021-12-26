import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'

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

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

interface SchedulingCompleteProps extends NavigationProps {}

export function Confirmation({navigation}: SchedulingCompleteProps){
    const { width } = useWindowDimensions();
    navigation = useNavigation();
    const routes = useRoute();
    const { title, message, nextScreenRoute } = routes.params as Params;

    function handleNextScreen() {
        navigation.navigate(nextScreenRoute);
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
            <Title>{title}</Title>

            <Message>{message}</Message>
        </Content>

        <Footer>
            <ConfirmButton
                title="OK"
                onPress={handleNextScreen}
            />
        </Footer>

    </Container>
   );
}