# react-native-video-player-custom-ui

A react native component that lets you create custom ui for video player.

## Installation

Run `npm install rreact-native-video-player-custom-ui` in your project directory.

Note: This package needs peer dependency of react-native-video please install and configure before you proceed.

## Usage

This snippet would produce the output shown in the above gif

```
import React, { Component } from 'react';
import CustomVideoPlayer from 'rreact-native-video-player-custom-ui';

const Test = (props: any) => {
  return (
      <CustomVideoPlayer uri={"YOUR_VIDEO_URL"}/>
  )
}
```
## Props

Prop                  | Type          | Optional | Default                   | Description
--------------------- | ------------- | -------- | ------------------------- | -----------
uri                   | string        | No       | null                      | supports video url and storage url
play                  | boolean       | yes      | false                     | handles playback
width                 | number|string | Yes      | 100%                      | width of the player
height                | number|string | Yes      | 30%                       | height of the player
autoplay              | boolean       | yes      | false                     | handles autoplay
loop                  | boolean       | yes      | false                     | video will play continously
playIcon              | number        | yes      | image                     | custom icon for play
pauseIcon             | number        | yes      | image                     | custom icon for pause
replayIcon            | number        | yes      | image                     | custom icon for replay
theme                 | string        | yes      | white                     | player color theme
radius                | number        | yes      | 10                        | border radius for player
controls              | boolean       | yes      | true                      | show/hide controls
seekBarWidth          | number|string | Yes      | 80%                       | width of the seekbar
seekBarFilledColor    | string        | yes      | white                     | seek bar finished color
seekBarUnfilledColor  | string        | yes      | white                     | seek bar unfinished color
thumbStyle            | object        | yes      |                           | seekbar thumb style
resizeMode            | string        | yes      | contain                   | player resize mode
onComplete            | function      | yes      |                           | triggers on video completion
onReplay              | function      | yes      |                           | triggers on replay
```
```
## Contributing

If you find a bug just open a PR or an issue and ping me!
