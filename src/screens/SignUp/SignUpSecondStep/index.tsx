import React from 'react';
import {
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   Keyboard,
} from 'react-native';

import { useTheme } from 'styled-components';
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
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

interface SignUpSecondStepProps {
   navigation: NativeStackNavigationProp<any, any>;
}

export function SignUpSecondStep({navigation}: SignUpSecondStepProps){
   const theme = useTheme();
   navigation = useNavigation();

   function handleGoBack(){
      navigation.goBack();
   }

   return (
      <KeyboardAvoidingView behavior='position' enabled >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  <FormTitle>2. Senha</FormTitle>
                  <PasswordInput
                     iconName='lock'
                     placeholder='Senha'
                  />

                  <PasswordInput
                     iconName='lock'
                     placeholder='Repetir senha'
                  />

               </Form>

               <Button 
                  title="Cadastrar"
                  color={theme.colors.success}
               />

            </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
   );
}