import React from "react";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { useTheme } from "styled-components";

import { AppStackRoutes } from './app.stack.routes';
import { Home } from '../screens/Home';
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){
    const theme = useTheme();
    return (
        <Navigator
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_detail,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: RFValue(78),
                    backgroundColor: theme.colors.background_primary
                }
            }}
        >
            <Screen 
                name="HomeStack"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: (({ color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
            <Screen 
                name="Profile"
                component={Home}
                options={{
                    tabBarIcon: (({ color }) => (
                        <CarSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: (({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    ))
                }}
            />
        </Navigator>
    );
}