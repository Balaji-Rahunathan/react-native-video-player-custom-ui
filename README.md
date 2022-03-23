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
      <CustomVideoPlayer uri={"https://augmo.in/sample.mp4"}/>
  )
}

```
## Contributing

This is project is still in beta at the moment, but is still very basic, so if you want to work on the above mention tasks, or you find a bug just open a PR or an issue and ping me!
