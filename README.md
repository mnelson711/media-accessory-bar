## KeyboardMediaBar

`KeyboardMediaBar` is a React Native component that attaches itself to the top of the keyboard in a bar-like style, allowing users to take/choose an image or video, or make a recording. The component provides a convenient and interactive way to handle media inputs in your application.

### Features
- **Image and Video Selection**: Choose media from the gallery or take new media using the camera.
- **Audio Recording**: Record audio clips directly from the component.
- **Customizable Appearance**: Adjust the colors, sizes, and borders to fit your app's design.
- **Keyboard Integration**: The component integrates seamlessly with the keyboard, appearing just above it.

### Installation

To install the package, use npm or yarn:

```sh
npm install keyboard-media-bar
# or
yarn add keyboard-media-bar
```

### Usage

Import the component and use it in your React Native application:

```javascript
import React from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import KeyboardMediaBar from 'keyboard-media-bar';

export default function App() {
  const handleMediaUri = (uri) => {
    console.log("Media URI:", uri);
    // Handle the URI as needed
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput placeholder="Type something..." style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }} />
      </View>
      <KeyboardMediaBar
        uri={handleMediaUri}
        backgroundColor="lightgray"
        iconColor="blue"
      />
    </KeyboardAvoidingView>
  );
}
```

### Props

#### KeyboardMediaBar Props

| Prop                  | Type     | Default   | Description |
|-----------------------|----------|-----------|-------------|
| `uri`                 | function | `null`    | Callback function to receive the selected media URI. |
| `mediaAccessoryViewID`| string   | `"defaultID"` | ID for the media accessory view. |
| `backgroundColor`     | string   | `"white"` | Background color of the bar. |
| `iconColor`           | string   | `"white"` | Color of the icons. |
| `iconSize`            | number   | `25`      | Size of the icons. |
| `allowsRecording`     | boolean  | `true`    | Whether recording is allowed. |
| `borderTopWidth`      | number   | `0`       | Width of the top border. |
| `borderBottomWidth`   | number   | `0`       | Width of the bottom border. |
| `borderTopColor`      | string   | `"white"` | Color of the top border. |
| `borderBottomColor`   | string   | `"white"` | Color of the bottom border. |
| `borderColor`         | string   | `"white"` | Color of the borders. |
| `barHeight`           | number   | `100`     | Height of the bar. |