import React, { useState } from 'react';
import {
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   Keyboard,
   Alert,
} from 'react-native';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
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

interface Params {
   user: {
      name: string,
      email: string,
      driverLicense: string,
   }
}

interface SignUpSecondStepProps {
   navigation: NativeStackNavigationProp<any, any>;
}

export function SignUpSecondStep({navigation}: SignUpSecondStepProps){
   const [password, setPassword] = useState(''); 
   const [passwordConfirm, setPasswordConfirm] = useState('');   
   const theme = useTheme();
   navigation = useNavigation();
   const route = useRoute();
   const { user } = route.params as Params;

   function handleGoBack(){
      navigation.goBack();
   }

   function handleRegister(){
      if(!password || !passwordConfirm){
         return Alert.alert('Informe a senha e a confirmação.')
      }

      if(password != passwordConfirm){
         return Alert.alert('As senhas não são iguais');
      }

      //Enviar para a API e cadastrar.
      navigation.navigate('Confirmation', {
         nextScreenRoute: 'SignIn',
         title: 'Conta Criada!',
         message: `Agora é só fazer login\ne aproveitar.`
      })
      
   }

   return (
      <KeyboardAvoidingView behavior='position' enabled >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
               <Header>
                  <BackButton onPress={handleGoBack}/>
                  <Steps>
                     <Bullet />
                     <Bullet active />
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
                     onChangeText={setPassword}
                     value={password}
                  />

                  <PasswordInput
                     iconName='lock'
                     placeholder='Repetir senha'
                     onChangeText={setPasswordConfirm}
                     value={passwordConfirm}
                  />

               </Form>

               <Button 
                  title="Cadastrar"
                  color={theme.colors.success}
                  onPress={handleRegister}
               />

            </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
   );
}