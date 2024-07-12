import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import KeyboardMediaBar from "media-accessory-bar";
import { TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Example() {
  const [uri, setUri] = useState(null);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ marginTop: 10 }}>
        <KeyboardMediaBar
          uri={(receivedUri) => {
            console.log("Received URI: ", receivedUri);
            setUri(receivedUri);
          }}
          mediaAccessoryViewID="viewID"
          backgroundColor="#0066cc"
          allowsRecording={true}
          borderTopWidth={1}
        />
        <TextInput
          placeholder="Start typing to see bar!"
          value={"Start typing to see bar!"}
          style={styles.input}
          inputAccessoryViewID="viewID"
          testID="keyboard-media-bar"
        />
        {uri && <Image source={{ uri }} style={styles.image} />}
      </GestureHandlerRootView>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
