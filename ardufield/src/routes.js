import { createStackNavigator, createAppContainer } from 'react-navigation';

import SignIn from './pages/signIn';
import LedMatrix from './pages/ledMatrix';

const RootStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn
    },
    LedMatrix: {
      screen: LedMatrix,
      navigationOptions: {
        title: 'Matriz de LED',
        headerTitleStyle: {
          textAlign: 'left',
          fontSize: 20
        }
      }
    },
  },
  {
    defaultNavigationOptions: {
      title: "ArduField",
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#d13e3b',
        borderBottomColor: '#f4f2ff',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'left',
      }
    }
  }
);

const Routes = createAppContainer(RootStack);
export default Routes;