import React, { Component } from 'react';

import { Switch, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'
var _ = require('lodash');

import { 
  Container,
  Title,
} from './styles';

export default class LedMatrix extends Component {

  /**
   * Construtor
   * @param {*} props 
   */
  constructor (props) {
    console.log("---- No construtor da classe 'matriz de led' ----");
    super(props)

    this.state = {
      switchValue: false,
      lightsSwitchValue: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
    }

    this.checkBluetoothIsEnabled();
  }



  /**
   * Bluetooth Section
   */
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
          
          // const deviceID = 'B4:EF:39:84:84:85';
          const deviceID = '20:15:02:02:21:83';
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



  /**
   * Led Matrix - Section
   */
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



  /**
   * Leds Lights - Section
   */
  lightsToggleSwitch = (value) => {
    this.setState({ lightsSwitchValue: value });
    
    // Quando as luzes de led devem ser ligadas
    if( value === true ) {
      this.turnOnLedLights();
    } else {
      this.turnOffLedLights();
    }
  }


  turnOnLedLights() {
    console.log("--- Ligando as luzes de LED... ---");
    
    BluetoothSerial.write("2")
      .then((res) => {
        console.log(`Resposta (3) do arduíno: ${res}`);

        this.setState({ connected: true });
      })
      .catch((err) => console.log(err.message));
  }


  turnOffLedLights() {
    console.log("--- DESligando as luzes de LED... ---");

    BluetoothSerial.write("3")
      .then((res) => {
        console.log(`Resposta (4) do arduíno: ${res}`);

        this.setState({ connected: true });
      })
      .catch((err) => console.log(err.message));
  }


  render() {
    return (
      <Container>
        <Title>Controle o ArduField:</Title>
        
        
          <Text style={[styles.subtitle, this.state.switchValue ? styles.textON : styles.textOFF ]}>
              {this.state.switchValue ? 'Matriz de LED: LIGADA' : 'Matriz de LED: DESLIGADA'}
          </Text>

          <Switch style={styles.switch}
              onValueChange={this.toggleSwitch}
              value={this.state.switchValue}
          />


          <Text style={[styles.subtitle, this.state.lightsSwitchValue ? styles.textON : styles.textOFF ]}>
              {this.state.lightsSwitchValue ? 'Luzes LED: LIGADAS' : 'Luzes LED: DESLIGADAS'}
          </Text>

          <Switch style={styles.switch}
              onValueChange={this.lightsToggleSwitch}
              value={this.state.lightsSwitchValue}
          />
          
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 24,
    marginBottom: 30,
    marginTop: 30
  },
  switch: {
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  }, 
  textON: {
    color: '#a1b67d'
  },
  textOFF: {
    color: '#c3c0c5'
  }
})
