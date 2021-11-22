import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';

const About = () => {
  return (
    <ImageBackground source={require('../assets/Finland.png')} style={globalStyles.container}>
      <View>
        <Text>
          Fetan Mastawekya - short description
        </Text>
      </View>
      <View>
        <Text>
          Fetan Advertizement - short description english virstion 
        </Text>
      </View>
    </ImageBackground>
  );
};

export default About;

const styles = StyleSheet.create({});
