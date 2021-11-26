import React from 'react';
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

import ArrowSvg from '../../assets/arrow.svg';

import { useTheme } from 'styled-components';

export function Scheduling(){
    const theme = useTheme();
   return (
    <Container>
        <Header>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <BackButton 
                onPress={() => {}}
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

        </Content>

        <Footer>
            <Button title="Confirmar"/>
        </Footer>
    </Container>
   );
}