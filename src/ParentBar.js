import React, { useState } from "react";
import {
  View,
  InputAccessoryView,
} from "react-native";
import MediaAccessoryBar from "./MediaBar";
import RecordingAccessoryBar from "./RecordingBar";
import PropTypes from "prop-types";

export default function KeyboardMediaBar({
  uri = () => {}, //should return uri
  mediaAccessoryViewID = "defaultID",
  backgroundColor = "white",
  iconColor = "white",
  iconSize = 25,
  allowsRecording = true,
  borderTopWidth = 0,
  borderBottomWidth = 0,
  borderTopColor = "white",
  borderBottomColor = "white",
  borderColor = "white",
  barHeight = 100,
}) {
  const [showMediaBar, setShowMediaBar] = useState(true);
  const [mediaType, setMediaType] = useState("image");
  const [mediaUri, setMediaUri] = useState("");

  const handleToggle = (toggle) => {
    console.log("handling toggle: ", toggle);
    setShowMediaBar(!toggle);
  };
  const handleRecordingComplete = async (uri) => {
    console.log("Received data from recording bar:", uri);
    setShowMediaBar(true);
    setMediaUri(uri);
    setMediaType("audio");
    sendUri();
  };

  const handleMediaComplete = async (mediaProp) => {
    console.log("received data from mediabar", mediaProp);
    setMediaUri(mediaProp.assets[0].uri);
    setMediaType(mediaProp.assets[0].type);
    sendUri();
    if (uri) {
      uri(mediaProp.assets[0].uri);
    }
};

  const sendUri = async () => {
    if(uri) {
      uri(mediaUri);
    }
  };

  return (
    <View>
      {showMediaBar ? (
        <InputAccessoryView nativeID={mediaAccessoryViewID}>
          <MediaAccessoryBar
            mediaProp={handleMediaComplete}
            toggleRecording={handleToggle}
            iconColor={iconColor}
            iconSize={iconSize}
            backgroundColor={backgroundColor}
            borderTopWidth={borderTopWidth}
            borderBottomWidth={borderBottomWidth}
            borderTopColor={borderTopColor}
            borderBottomColor={borderBottomColor}
            borderColor={borderColor}
            barHeight={barHeight}
            allowsRecording={allowsRecording}
          />
        </InputAccessoryView>
      ) : (
        <InputAccessoryView nativeID={mediaAccessoryViewID}>
          <RecordingAccessoryBar
            onRecordingComplete={handleRecordingComplete}
            toggleRecording={handleToggle}
            iconColor={iconColor}
            iconSize={iconSize}
            backgroundColor={backgroundColor}
            borderTopWidth={borderTopWidth}
            borderBottomWidth={borderBottomWidth}
            borderTopColor={borderTopColor}
            borderBottomColor={borderBottomColor}
            borderColor={borderColor}
            barHeight={barHeight}
            allowsRecording={allowsRecording}
          />
        </InputAccessoryView>
      )}
    </View>
  );
};

KeyboardMediaBar.propTypes = {
  uri: PropTypes.func.isRequired,
  mediaAccessoryViewID: PropTypes.string,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  allowsRecording: PropTypes.bool,
  borderTopWidth: PropTypes.number,
  borderBottomWidth: PropTypes.number,
  borderTopColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderColor: PropTypes.string,
  barHeight: PropTypes.number,
};

KeyboardMediaBar.defaultProps = {
  mediaAccessoryViewID: "defaultID",
  backgroundColor: "white",
  iconColor: "white",
  iconSize: 25,
  allowsRecording: true,
  borderTopWidth: 0,
  borderBottomWidth: 0,
  borderTopColor: "white",
  borderBottomColor: "white",
  borderColor: "white",
  barHeight: 100,
};