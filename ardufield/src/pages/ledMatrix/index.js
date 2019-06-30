import React, { Component } from 'react';

import { Switch, StyleSheet, Text, ToastAndroid } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'
var _ = require('lodash');

import { 
  Container,
  Title,
} from './styles';

export default class LedMatrix extends Component {

  constructor (props) {
    console.log("---- No construtor da classe 'matriz de led' ----");
    super(props)

    this.state = {
      switchValue: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
    }

    this.checkBluetoothIsEnabled();
  }


  async checkBluetoothIsEnabled() {
    console.log("--- Verificando se o bluetooth do aparelho está ativo ---");
    const isEnabled = await BluetoothSerial.isEnabled();
    
    if( !isEnabled ) {
      ToastAndroid.show(`É necessário que o bluetooth esteja ativado!`, ToastAndroid.SHORT);
      return;
    } else {
      this.discoverUnpairedDevices();
    }
  }


  discoverUnpairedDevices() {
    console.log("--- Buscando todos os dispositivos bluetooths não pareados ---");
    if (this.state.discovering) {
      return false;
    } else {
      this.setState({ discovering: true });

      // README: Lembrar que, para essa parte funcionar, é necessário ter pareado o dispositivo atual com o dispositivo alvo antes!
      BluetoothSerial.discoverUnpairedDevices()
        .then((unpairedDevices) => {
          const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
          console.log(uniqueDevices);

          this.setState({ unpairedDevices: uniqueDevices, discovering: false });
          
          const deviceID = 'B4:EF:39:84:84:85'
          this.connect(deviceID)
        })
        .catch((err) => console.log(err.message));
    }
  }


  connect(deviceID) {
    console.log(`--- Conectando-se ao dispositivo bluetooth do arduíno [${deviceID}] ---`);
    this.setState({ connecting: true })

    BluetoothSerial.connect(deviceID)
      .then((res) => {
        ToastAndroid.show(`Conectados no arduíno!`, ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err.message))
  }


  toggleSwitch = (value) => {
    this.setState({ switchValue: value });
    
    // Quando a matriz deve ser ligada
    if( value === true ) {
      this.turnOnLedMatrix();
    } else {
      this.turnOffLedMatrix();
    }
  }


  turnOnLedMatrix() {
    console.log("--- Ligando a matriz de LED... ---");
    
    BluetoothSerial.write("1")
      .then((res) => {
        console.log(`Resposta do arduíno: ${res}`);

        this.setState({ connected: true });
      })
      .catch((err) => console.log(err.message));
  }


  turnOffLedMatrix() {
    console.log("--- DESligando a matriz de LED... ---");

    BluetoothSerial.write("0")
      .then((res) => {
        console.log(`Resposta (2) do arduíno: ${res}`);

        this.setState({ connected: true });
      })
      .catch((err) => console.log(err.message));
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
