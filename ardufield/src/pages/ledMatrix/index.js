import React, { Component } from 'react';

import { Switch, StyleSheet, Text } from 'react-native';

import { 
  Container,
  Title,
} from './styles';

export default class LedMatrix extends Component {

  state  = { switchValue: false };


  toggleSwitch = (value) => {
    this.setState({ switchValue: value });
  }


  render() {
    return (
      <Container>
        <Title>Controle a Matriz:</Title>
        
        <Text style={[styles.subtitle, this.state.switchValue ? styles.textON : styles.textOFF ]}>
            {this.state.switchValue ? 'Agora, ela está: LIGADA' : 'Agora, ela está: DESLIGADA'}
        </Text>

        <Switch style={styles.switch}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue}
        />
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  switch: {
      transform: [{ scaleX: 2.0 }, { scaleY: 2.0 }]
  }, 
  subtitle: {
    fontSize: 24,
    marginBottom: 20
  },
  textON: {
    color: '#a1b67d'
  },
  textOFF: {
    color: '#c3c0c5'
  }
})
