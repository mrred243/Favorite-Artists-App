import React, { useState, useEffect } from "react";
import FavoriteScreen from "./screens/FavoriteScreen";
import HomeScreen from "./screens/HomeScreen";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ApplicationProvider,
  Layout,
  BottomNavigation,
  BottomNavigationTab,
  IconRegistry,
  Text
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlashMessage from "react-native-flash-message";

// create bottom tab navigation

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="HOME" />
    <BottomNavigationTab title="FAVORITE ARTISTS" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Favorite Artists" component={FavoriteScreen} />
  </Navigator>
);

// main App

export default function App() {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <SafeAreaProvider>
          <NavigationContainer>
            <TabNavigator />
            <FlashMessage position="top" />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
