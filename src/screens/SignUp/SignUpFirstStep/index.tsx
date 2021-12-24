import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
 Container,
 Header,
 Steps,
 Title,
 SubTitle,
 Form,
 FormTitle,
} from './styles';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

interface SignUpFirstStepProps {
   navigation: NativeStackNavigationProp<any, any>;
}

export function SignUpFirstStep({navigation}: SignUpFirstStepProps){
   navigation = useNavigation();

   function handleGoBack(){
      navigation.goBack();
   }

   return (
    <Container>
       <Header>
         <BackButton onPress={handleGoBack}/>
         <Steps>
            <Bullet active />
            <Bullet />
         </Steps>
       </Header>

       <Title>
         Crie sua{'\n'}conta
       </Title>
       <SubTitle>
         Faça seu cadastro de{'\n'}
         forma rápida e fácil
       </SubTitle>

       <Form>
          <FormTitle>1. Dados</FormTitle>
       </Form>

    </Container>
   );
}