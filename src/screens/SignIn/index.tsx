import React, { useState } from 'react';
import { 
    StatusBar,
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert, 
} from 'react-native';
import * as Yup from 'yup';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import {
 Container,
 Header,
 SubTitle,
 Title,
 Footer,
 Form,
} from './styles';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

interface SignInProps {
    navigation: NativeStackNavigationProp<any, any>
}

export function SignIn({ navigation }: SignInProps){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   const theme = useTheme();
   navigation = useNavigation();

   const { signIn } = useAuth();

   async function handleSignIn(){
        try {
            const schema = Yup.object().shape({
                password: Yup.string()
                .required('A senha é obrigatória'),
                email: Yup.string()
                 .required('E-mail obrigatório')
                 .email('Digite um e-mail válido')
            });
            
            await schema.validate({ email, password });

            signIn({ email, password });
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa!', error.message);
            }else{
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verifique às credenciais'
                )
            }
        }
   }

   function handleNewAccount(){
        navigation.navigate("SignUpFirstStep");
   }
   
    return (
        <KeyboardAvoidingView behavior='position' enabled >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        translucent
                        barStyle='dark-content'
                        backgroundColor='transparent'
                    />

                    <Header>
                        <Title>
                            Estamos {'\n'}quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar {'\n'}uma experiência incrivel.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input 
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button 
                            title='Login'
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button 
                            title='Criar conta gratuita'
                            light
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            color={theme.colors.background_secondary}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
   );
}