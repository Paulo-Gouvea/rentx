import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';

import Animated, {
   useSharedValue,
   useAnimatedStyle,
   withTiming,
   Easing,
} from 'react-native-reanimated';

import {
 Container
} from './styles';

const WIDTH = Dimensions.get('window').width;

export function Splash(){
   const animation = useSharedValue(0);

   const animatedStyles = useAnimatedStyle(() => {
      return {
         transform: [
            { translateX: withTiming(animation.value, {
               duration: 500,
               easing: Easing.bezier(.01, 1.07, 1, -0.28)
            }) }
         ]
      }
   });

   function handleAnimationPosition(){
      animation.value = Math.random() * (WIDTH - 100);
   }

   return (
    <Container>
        <Animated.View
         style={[styles.box, animatedStyles]}
        >

        </Animated.View>

         
      <Button title="Mover" onPress={handleAnimationPosition} />



    </Container>
   ); 
}

const styles = StyleSheet.create({
   box: {
      width:100,
      height: 100,
      backgroundColor: 'blue'
   }
});