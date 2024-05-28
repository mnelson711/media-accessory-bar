import React, { useState, useEffect, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Keyboard,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MediaAccessoryBar({
  mediaProp,
  toggleRecording,
  iconColor = "white",
  backgroundColor = "#d0d3d9",
  borderColor = "#d0d3d9",
  borderBottomColor = "#d0d3d9",
  borderTopColor = "#d0d3d9",
  borderTopWidth = 0,
  borderBottomWidth = 0,
  barHeight = 30,
  iconSize = 25
}) {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [recordingState, setRecordingState] = useState(false);

  const mediaButtonAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(mediaButtonAnim, {
      toValue: 0,
      duration: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (media && mediaType) {
      sendMedia();
    }
  }, [media]);

  useEffect(() => {
    if (recordingState) {
      sendRecordingState();
    }
  }, [recordingState]);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.cancelled) {
      setMediaType(result.assets[0].type);
      setMedia(result);
      console.log("result: ", result.assets[0]);
    }
  };

  const takeMedia = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      alert("Permissions to access camera and microphone are required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (result && !result.cancelled) {
      setMediaType(result.assets[0].type);
      setMedia(result);
      console.log("result: ", result);
    }
  };

  function sendMedia() {
    console.log("sending media");
    if (mediaProp) {
      mediaProp(media);
    }
  }

  function sendRecordingState() {
    console.log("sending recording state");
    if (toggleRecording) {
      toggleRecording(!recordingState);
    }
  }

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
          borderTopWidth: borderTopWidth,
          borderBottomWidth: borderBottomWidth,
          borderBottomColor: borderBottomColor,
          borderTopColor: borderTopColor,
          borderColor: borderColor,
          height: barHeight,
        },
        styles.barContainer,
      ]}
    >
      <Animated.View
        style={[{ flex: 1 }, { transform: [{ translateX: mediaButtonAnim }] }]}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <TouchableOpacity
            style={styles.barButton}
            onPress={() => {
              if (toggleRecording) {
                console.log("toggled recording");
                toggleRecording(true);
              }
            }}
          >
            <Ionicons name="mic" size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={[{ flex: 1 }, { transform: [{ translateX: mediaButtonAnim }] }]}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <TouchableOpacity style={styles.barButton} onPress={takeMedia}>
            <Ionicons name="camera" size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[{ flex: 1 }, { transform: [{ translateX: mediaButtonAnim }] }]}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <TouchableOpacity style={styles.barButton} onPress={pickMedia}>
            <Ionicons name="images" size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[{ flex: 1 }, { transform: [{ translateX: mediaButtonAnim }] }]}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <TouchableOpacity style={styles.barButton} onPress={hideKeyboard}>
            <Ionicons name="checkmark" size={iconSize} color={iconColor} />
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    // borderTopWidth: 1,
    // borderColor: "#bbbec3",
  },
  barButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    alignSelf: "stretch",
    flexDirection: "row",
  },
});
