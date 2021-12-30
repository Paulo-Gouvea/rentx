import React from 'react';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
 Container,
 Header,
 HeaderTop,
 HeaderTitle,
 LogoutButton,
 PhotoContainer,
 Photo,
 PhotoButton,
} from './styles';

import { BackButton } from '../../components/BackButton';

interface ProfileProps {
    navigation: NativeStackNavigationProp<any, any>;
}

export function Profile({ navigation }: ProfileProps ){
    const theme = useTheme();
    navigation = useNavigation();

    function handleBack(){
        navigation.goBack();
    }

    function handleSignOut(){

    }

   return (
    <Container>
        <Header>
            <HeaderTop>
                <BackButton 
                    color={ theme.colors.shape }
                    onPress={ handleBack }
                />
                <HeaderTitle>Editar Perfil</HeaderTitle>
                <LogoutButton onPress={handleSignOut} >
                    <Feather 
                        name="power" 
                        size={24} 
                        color={theme.colors.shape } 
                    />
                </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
                <Photo source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwj2xHGl0OAT82Pl1zsWF_5ebUHShhceZmGA&usqp=CAU' }} />
                <PhotoButton onPress={() => {}}>
                    <Feather
                        name="camera"
                        size={24}
                        color={theme.colors.shape}
                    />
                </PhotoButton>
            </PhotoContainer>
        </Header>
    </Container>
   );
}