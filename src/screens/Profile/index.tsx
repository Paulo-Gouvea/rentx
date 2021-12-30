import React, { useState } from 'react';
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
 Content,
 Options,
 Option,
 OptionTitle,
} from './styles';

import { BackButton } from '../../components/BackButton';

interface ProfileProps {
    navigation: NativeStackNavigationProp<any, any>;
}

export function Profile({ navigation }: ProfileProps ){
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

    const theme = useTheme();
    navigation = useNavigation();

    function handleBack(){
        navigation.goBack();
    }

    function handleSignOut(){

    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected);
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

        <Content>
            <Options>
                <Option 
                    active={option === 'dataEdit'} 
                    onPress={() => handleOptionChange('dataEdit')}
                >
                    <OptionTitle active={option === 'dataEdit'} >Dados</OptionTitle>
                </Option>
                <Option 
                    active={option === 'passwordEdit'} 
                    onPress={() => handleOptionChange('passwordEdit')}
                >
                    <OptionTitle active={option === 'passwordEdit'} >Trocar senha</OptionTitle>
                </Option>
            </Options>
        </Content>
    </Container>
   );
}