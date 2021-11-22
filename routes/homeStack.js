import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Custom Components:
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';
import { Header } from '../shared/header';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
const { Navigator, Screen } = createStackNavigator();

export const HomeStack = ({ navigation }) => (
  // headerMode='screen' //default option fontWeight: 'bold'   // backgroung gold color #FECE75 , green background #0DAA41
  <Navigator
    initialRouteName='Home'
    screenOptions={{
      gestureEnabled: false,
      headerStyle: { backgroundColor: '#6649C4', height: 65, paddingBottom: 22,},   //Door Color
      //headerStyle: { backgroundColor: '#FECE75', height: 70 },  
      headerTitleStyle: { color: '#FFFFFF', paddingBottom: 22, fontFamily:"Poppins-Medium" },
      headerTitleAlign: 'center',   headerTintColor: '#fff',  
              
    }}>
        
    <Screen
      name='Home'
      component={Home}
      options={{
        headerTitle: () => <Header title='tbd' navigation={navigation} />
       /* headerTitle: () => <Header title='ማስታወቂያ' navigation={navigation} />, */ 
      }}
    />

    <Screen
      name='Details'
      component={ReviewDetails}
      options={{
        title: 'ተጨማሪ መረጃ',
      }}
    />



  </Navigator>  

);
