import React, { Component } from 'react';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';


export default class SignIn extends Component {

  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };


  state = { email: '', password: '', error: '' };


  handleEmailChange = (email) => {
    this.setState({ email });
  };
  

  handlePasswordChange = (password) => {
    this.setState({ password });
  };
  

  handleCreateAccountPress = () => {
    console.log("Aqui seria a navegação para a tela de cadastro.");
  };


  handleSignInPress = () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        const user = '1';
        const pass = '1';
        
        if( this.state.email === user  &&  this.state.password === pass ) {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'LedMatrix' }),
            ],
          });
  
          this.props.navigation.dispatch(resetAction);
        } else {
          this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });  
        }
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };


  render() {
    return (
      <Container>

        <StatusBar hidden />

        <Logo source={require('../../images/ardufield_logo.png')} resizeMode="contain" />

        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        
        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>

        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Criar conta grátis</SignUpLinkText>
        </SignUpLink>

      </Container>
    );
  }
  
}