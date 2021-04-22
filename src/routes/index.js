import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';

const Stack = createStackNavigator()

export default function AppContainer() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'home'}>
                <Stack.Screen 
                name={'home'} 
                component={Home} 
                options={{headerShown:false}}
                />                
            </Stack.Navigator>
        </NavigationContainer>
    )   
    
}