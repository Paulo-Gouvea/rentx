import React from 'react';
import { useNavigation } from '@react-navigation/native'

import { NavigationProps } from '../Home';

import { StatusBar } from 'react-native';
import {
 Container,
 Header,
 Title,
 RentalPeriod,
 DateInfo,
 DateTitle,
 DateValue,
 Content,
 Footer,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import { useTheme } from 'styled-components';

interface SchedulingProps extends NavigationProps {}

export function Scheduling({navigation}: SchedulingProps){
    navigation = useNavigation();
    const theme = useTheme();

    function HandleSchedulingDetails() {
        navigation.navigate('SchedulingDetails');
    }

    function handleBack() {
        navigation.goBack();
    }

   return (
    <Container>
        <Header>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <BackButton 
                onPress={handleBack}
                color={theme.colors.shape}
            />
            <Title>
                Escolha uma {"\n"}
                data de início e {"\n"}
                fim do aluguel
            </Title>

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue
                        selected={false}
                    >
                        16/06/2021
                    </DateValue>
                </DateInfo>

                <ArrowSvg />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue
                        selected={false}
                    >
                        16/06/2021
                    </DateValue>
                </DateInfo>
            </RentalPeriod>
        </Header>
        
        <Content>
            <Calendar />
        </Content>

        <Footer>
            <Button 
                title="Confirmar"
                onPress={HandleSchedulingDetails}
            />
        </Footer>
    </Container>
   );
}