import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { NavigationProps } from '../Home';

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

import { CarDTO } from '../../dtos/CarDTO'; 
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

import {
 Container,
 Header,
 CarImages,
 Content,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 Accessories,
 Footer,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
 RentalPriceLabel,
 RentalPriceDetails,
 RentalPriceQuota,
 RentalPriceTotal,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface Params{
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

interface SchedulingDetailsProps extends NavigationProps {}

export function SchedulingDetails({navigation}: SchedulingDetailsProps){
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const netInfo = useNetInfo();
    const theme = useTheme();
    navigation = useNavigation();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(car.price * dates.length);

    async function handleSchedulingComplete(){
        setLoading(true);

        await api.post('rentals', {
            user_id: 1,
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: rentTotal
        })
        .then(() => {
            navigation.navigate('Confirmation', {
                nextScreenRoute: 'Home',
                title: 'Carro alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
            })
        })
        .catch(() => {
            Alert.alert('Não foi possível confirmar o agendamento.')
            setLoading(false); 
        })
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, []);

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
        <Header>
            <BackButton onPress={handleBack} />
        </Header>

        <CarImages>
            <ImageSlider 
                imagesUrl={
                    !!carUpdated.photos ?
                    carUpdated.photos :
                    [{ id: car.thumbnail, photo: car.thumbnail }]
                } 
            />
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>{car.name}</Name>
                </Description>

                <Rent>
                    <Period>{car.period}</Period>
                    <Price>R$ {car.price}</Price>
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

            <RentalPeriod>
                <CalendarIcon>
                    <Feather 
                        name="calendar"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />
                </CalendarIcon>

                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>{rentalPeriod.start}</DateValue>
                </DateInfo>

                <Feather 
                    name="chevron-right"
                    size={RFValue(10)}
                    color={theme.colors.text}
                />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue>{rentalPeriod.end}</DateValue>
                </DateInfo>
            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
                    <RentalPriceTotal>{`R$ ${rentTotal}`}</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>
        </Content>

        <Footer>
            <Button 
                title="Alugar agora"
                color={theme.colors.success}
                onPress={handleSchedulingComplete} 
                enabled={!loading}   
                loading={loading}
            />
        </Footer>

    </Container>
   );
}