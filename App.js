import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HyperText from './hypertext'
export default function App() {
  return (
    <View style={styles.container}>
      <HyperText>
        {
          '<a href="http://www.w3.org/WhatIs.html">Hypertext</a> is text which contains <a href="http://www.w3.org/Terms.html#link">links</a> to other texts.'
        }
      </HyperText>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
