import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Audio, Video } from "expo-av";
import KeyboardMediaBar from "media-accessory-bar";
import { TextInput } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Example() {
  const [media, setMedia] = useState(null);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ marginTop: 10 }}>
        <KeyboardMediaBar
          onMediaChange={(mediaMetadata) => {
            console.log("Received Media Metadata: ", mediaMetadata);
            setMedia(mediaMetadata);
          }}
          mediaAccessoryViewID="viewID"
          backgroundColor="#0066cc"
          allowsRecording={true}
          barHeight={50}
        />
        <TextInput
          placeholder="Start typing to see bar!"
          value={"Start typing to see bar!"}
          style={styles.input}
          inputAccessoryViewID="viewID"
          testID="keyboard-media-bar"
        />
        {media && media.type === "image" && (
          <Image source={{ uri: media.uri }} style={styles.image} />
        )}
        {media && media.type === "video" && (
          <Video
            source={{ uri: media.uri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}
        {media && media.type === "audio" && <AudioPlayer uri={media.uri} />}
        {media && <Text>Media Type: {media.type}</Text>}
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </View>
  );
}

function AudioPlayer({ uri }) {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: uri });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.audioContainer}>
      <Button title="Play Sound" onPress={playSound} />
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
  video: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
  audioContainer: {
    marginTop: 20,
  },
});
