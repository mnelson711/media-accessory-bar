import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import ParentBar from "media-accessory-bar";
import KeyboardMediaBar from "media-accessory-bar";
import { TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Example() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <GestureHandlerRootView style={{ marginTop: 10 }}>
        <KeyboardMediaBar
          uri={"handleMediaUri"}
          mediaAccessoryViewID="viewID"
          backgroundColor="#0066cc"
          allowsRecording={true}
        />
        <TextInput
          placeholder="Start typing to see bar!"
          value={"Start typing to see bar!"}
          // onChangeText={setUsername}
          style={styles.input}
          inputAccessoryViewID="viewID"
        />
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
});
