import { createStackNavigator, createAppContainer } from 'react-navigation';

import SignIn from './pages/signIn';
import LedMatrix from './pages/ledMatrix';

const RootStack = createStackNavigator({
  SignIn: {
    screen: SignIn
  },
  // LedMatrix,
});

const Routes = createAppContainer(RootStack);
export default Routes;