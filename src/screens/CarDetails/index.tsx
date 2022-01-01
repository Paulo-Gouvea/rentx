import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { NavigationProps } from '../Home';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
 Container,
 Header,
 CarImages,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 Accessories,
 About,
 Footer,
 OfflineInfo
} from './styles';

import { Car as ModelCar } from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

interface Params{
    car: ModelCar;
}

interface CarDetailsProps extends NavigationProps {}

export function CarDetails({ navigation }: CarDetailsProps){
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

    const netInfo = useNetInfo();
    const theme = useTheme();
    navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 90],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    });

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car });
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCarUpdated(){
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if(netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

   return (
    <Container>
        <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent
        />

        <Animated.View 
            style={[
                headerStyleAnimation, 
                styles.header, 
                { backgroundColor: theme.colors.background_secondary }
            ]}>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <Animated.View style={sliderCarStyleAnimation}>
                <CarImages>
                    <ImageSlider 
                        imagesUrl={
                            !!carUpdated.photos ?
                            carUpdated.photos :
                            [{ id: car.thumbnail, photo: car.thumbnail }]
                        } 
                    />
                </CarImages>
            </Animated.View>
        </Animated.View>

        <Animated.ScrollView
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: getStatusBarHeight() + 160,
            }}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
        >
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>{car.name}</Name>
                </Description>
 
                <Rent>
                    <Period>{car.period}</Period>
                    {
                        netInfo.isConnected === true ?
                        <Price>R$ {car.price}</Price>
                        :
                        <Price>...</Price>
                    }
                </Rent>
            </Details>

            {
                carUpdated.accessories &&
                <Accessories>
                    {
                        carUpdated.accessories.map(accesory => (
                            <Accessory 
                                key={accesory.type}
                                name={accesory.name}
                                icon={getAccessoryIcon(accesory.type)}
                            />
                        ))
                    }
                </Accessories>
            }

            <About>{car.about}</About>
        </Animated.ScrollView>

        <Footer>
            <Button 
                title="Escolher período do aluguel"
                onPress={handleConfirmRental}
                enabled={netInfo.isConnected === true}
            />

            {
                netInfo.isConnected === false && 
                <OfflineInfo>
                    Conecte-se a Internet para ver mais detalhes e agendar seu carro.
                </OfflineInfo>
            }
        </Footer>

    </Container>
   );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    }
})