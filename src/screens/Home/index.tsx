import React, { useEffect, useState } from 'react';
import { StatusBar, Alert } from 'react-native';

import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';

import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles';

export interface NavigationProps {
    navigation: NativeStackNavigationProp<any, any>
}

interface HomeProps extends NavigationProps {}

export function Home({ navigation }: HomeProps){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    navigation = useNavigation();

    const netInfo = useNetInfo();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    useEffect(()=> {
        let isMounted = true;

        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                if(isMounted) {
                    setCars(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally { 
                if(isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCars();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if(netInfo.isConnected){
            Alert.alert('Você está on-line');
        }else{
            Alert.alert('Você está off-line');
        }

        
    }, [netInfo.isConnected])

   return (
    <Container>
        <StatusBar 
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
        />
        <Header>
            <HeaderContent>
                <Logo
                    width={RFValue(108)}
                    height={RFValue(12)}
                />
                {
                    !loading &&
                    <TotalCars>
                    { `Total de ${cars.length} carros` }
                    </TotalCars>
                }
            </HeaderContent>
        </Header>

        {
            loading 
            ? 
            <LoadAnimation/> 
            : 
            <CarList
                data={cars}
                keyExtractor={item => item.id}
                renderItem={({ item })=> 
                    <Car 
                        data={item} 
                        onPress={() => handleCarDetails(item)} 
                    />}
            />
        }
    </Container>
   );
}