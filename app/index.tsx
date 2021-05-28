import React from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './components/auth/login/LoginScreen';
import SignupScreen from './components/auth/signup/SignupScreen';
import HomeScreen from './components/Home/HomeScreen';

const Stack = createStackNavigator();

const App = props => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const loading = useSelector(state => state.auth.loading);
  React.useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <>
            <Stack.Screen name={'Home'} component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name={'Login'}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'Signup'}
              component={SignupScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
