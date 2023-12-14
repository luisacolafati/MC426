import React, { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/tab.routes'; 
import { RouteProp } from '@react-navigation/native';
import { styles } from '../styles/styles';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};


export function LoginScreen ({navigation}: Props) {
  
  const [email, setEmail] = useState<string>('ayla.cristine@hotmail.com');
  const [password, setPassword] = useState<string>('123456');
  const [user, setUser] = useState<boolean>(false);

  const onLoginPress = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error: any) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error: AuthError) => {
    let mensagemErro = '';
    let Especificacao = '';

    switch (error.code) {
      case 'auth/invalid-email':
        mensagemErro = 'Email inválido';
        Especificacao =
          'Insira um email válido';
        break;
      case 'auth/wrong-password':
        mensagemErro = 'Senha inválida';
        Especificacao =
          'Insira uma senha válida para acessar o aplicativo';
        break;
      case 'auth/user-not-found':
        mensagemErro = 'Usuário não existe';
        Especificacao = 'Contate o administrador';
        break;
      case 'auth/user-disabled':
        mensagemErro = 'Usuário desativado';
        Especificacao = 'Usuário desativado, contate o administrador';
        break;
      default:
        mensagemErro = 'Erro no login';
        Especificacao = 'Ocorreu um erro ao fazer login';
    }

    Alert.alert(mensagemErro, Especificacao);
  };

  const onLoginSuccess = () => {
    setEmail('');
    setPassword('');
    setUser(true);
    Alert.alert('Login realizado com sucesso!');
    navigation.setParams({ user });
  };

  return (
    <View style={styles.principal}>
      <View style={styles.containerLogin}>
        <Text style={styles.usuario}>Usuário</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Text style={styles.senha}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.botaoEntrar} onPress={onLoginPress}>
          <Text style={styles.textoBotaoEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};