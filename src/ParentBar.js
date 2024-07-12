import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, InputAccessoryView } from "react-native";
import MediaAccessoryBar from "./MediaBar";
import RecordingAccessoryBar from "./RecordingBar";

export default function KeyboardMediaBar({
  onMediaChange = () => {},
  mediaAccessoryViewID,
  backgroundColor,
  iconColor,
  iconSize,
  allowsRecording,
  borderTopWidth,
  borderBottomWidth,
  borderTopColor,
  borderBottomColor,
  borderColor,
  barHeight,
}) {
  const [showMediaBar, setShowMediaBar] = useState(true);

  const handleToggle = (toggle) => {
    setShowMediaBar(!toggle);
  };

  const handleRecordingComplete = async (uri) => {
    const mediaMetadata = {
      uri,
      type: "audio",
      fileName: "recording.mp3",
      fileSize: 204800, // example size in bytes
      duration: 60, // example duration in seconds
      dimensions: null,
      timestamp: new Date().toISOString(),
      thumbnail: null,
    };
    onMediaChange(mediaMetadata);
    sendMedia();
  };

  const handleMediaComplete = async (mediaProp) => {
    const { uri, type, fileName, fileSize, duration, width, height } =
      mediaProp.assets[0];
    const mediaMetadata = {
      uri,
      type,
      fileName,
      fileSize,
      duration: type === "video" ? duration : null,
      dimensions: { width, height },
      timestamp: new Date().toISOString(),
      thumbnail: type === "video" ? `path/to/thumbnail/for/${fileName}` : null, // example thumbnail path
    };
    onMediaChange(mediaMetadata);
    sendMedia();
  };

  const sendMedia = async () => {
    if(onMediaChange) {
      onMediaChange(mediaMetadata);
  }};

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
  onMediaChange: PropTypes.func.isRequired,
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