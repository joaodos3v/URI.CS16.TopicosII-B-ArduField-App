import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import SignIn from './pages/signIn';
import LedMatrix from './pages/ledMatrix';

const Routes = createAppContainer(
  createStackNavigator(
    {
      SignIn: {
        screen: SignIn
      },
      LedMatrix: {
        screen: LedMatrix,
        navigationOptions: {
          title: 'ArduField',
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
  )
);


export default Routes;
