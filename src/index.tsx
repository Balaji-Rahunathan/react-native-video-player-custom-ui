import React, { useEffect, useRef, useImperativeHandle, createRef, forwardRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Text, Dimensions, Image } from 'react-native';
import Slider from "react-native-slider"
import Video from 'react-native-video';
import { useSetState, Width, Height, } from "./helpers"
import Play from './assets/play.png';
import Pause from './assets/pause.png';
import Replay from './assets/repeat.png';

interface ICustomVideoPlayer {
  height?: String | number;
  width?: String | number;
  uri: String;
  playIcon?: number;
  pauseIcon?: number;
  replayIcon?: number;
  theme?: String;
  play?: Boolean;
  autoplay?: boolean;
  seekBarWidth?: String | number;
  seekBarFilledColor?: String;
  seekBarUnfilledColor?: String;
  resizeMode?: string;
  onComplete?: any;
  loop?: boolean;
  onReplay?: any;
  radius?: number;
  thumbStyle?: object;
  controls?: boolean;
  
}

const CustomVideoPlayer = forwardRef((props: ICustomVideoPlayer, ref: any) => {
  const videoRef: any = useRef(null);
  const [state, setState] = useSetState({
    paused: true,
    progress: 0,
    duration: 0,
    completed: false,
    loading: false,
    replay: false,
  });

  useImperativeHandle(ref, () => ({
    pauseVideo: () => {
      setState({ paused: true });
    },
    playVideo: () => {
      handlePlayVideo();
    },
    replayVideo: () => {
      replayVideo(true);
    }
  }));

  const handlePlayVideo = () => {
    if (state.progress === 0) {
      videoRef.current.seek(0);
    }
    setState({ paused: !state.paused });
  };

  const secondsToTime = (time: any) => {
    let timer = ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + (time % 60);
    return timer
  };

  const onLoad = (meta: any) => {
    setState({
      duration: meta.duration,
    });
  };

  const onProgress = (progress: any) => {
    setState({
      progress: progress.currentTime,
    });
  };

  const onSeek = (value: any) => {
    videoRef.current.seek(value);
  };

  const mediaControl = (playerState: any) => {
    if (playerState == 'pause') {
      setState({ paused: true });
    } else {
      setState({ paused: false });
    }
  };

  const onEnd = () => {
    setState({
      paused: props.loop ? false : true,
      progress: props.loop ? 0 : state.progress,
      replay: props.loop ? false : true,
    });
    // console.log("end ")
  };

  const replayVideo = (replay: boolean) => {
    setState({ completed: false });
    if (replay) {
      videoRef.current.seek(0);
      setState({
        replay: false,
        paused: false,
        progress: 0,
      });

      if (props.onReplay) {
        props?.onReplay();
      }
    }
  };

  const getPlayIcon=()=>{
      if(props.playIcon) {
        return props.playIcon;
      }else {
        return Play
      }
  }

  const getPauseIcon = () => {
    if (props.pauseIcon) {
      return props.pauseIcon;
    } else {
      return Pause
    }
  }

  // console.log(videoRef.current)
  return (
    <View
      style={{
        width: props.width,
        height: props.height,
        borderRadius: props.radius,
        overflow: 'hidden',
      }}>
      {state.replay && (
        <TouchableOpacity
          onPress={() => replayVideo(true)}
          activeOpacity={0.9}
          style={{
            width: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: "40%",
            left: "45%",
            zIndex: 20
          }}>
          <Image source={props.replayIcon ? props.replayIcon:Replay} style={{ width: 50, height: 50, tintColor: props.theme }} />
        </TouchableOpacity>
      )}
      <Video
        source={{ uri: props.uri }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: props.radius,
          backgroundColor: "rgb(0, 0, 0)"
        }}
        onLoad={onLoad}
        onProgress={onProgress}
        onEnd={onEnd}
        paused={state.paused}
        autoplay={false}
        repeat={props.loop}
        resizeMode={'cover'}
        ref={videoRef}
      />
      {props.controls && <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: "blue"
        }}>
        <TouchableOpacity
          onPress={handlePlayVideo}
          activeOpacity={0.9}
          style={{
            width: '10%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={!state.paused ? getPlayIcon() : getPauseIcon()}
            style={{ width: !state.paused ? 20 : 25, height: !state.paused ? 20 : 25, tintColor: props.theme }}
          />
        </TouchableOpacity>

        <View style={{ width: '78%', paddingRight: 2, paddingLeft: 2 }}>
          <Slider
            animateTransitions={true}
            minimumValue={0}
            maximumValue={state.duration}
            step={0.001}
            value={state.progress}
            minimumTrackTintColor={props.seekBarFilledColor}
            maximumTrackTintColor={props.seekBarUnfilledColor}
            onSlidingStart={() => mediaControl('pause')}
            onSlidingComplete={() => mediaControl('play')}
            thumbTouchSize={{ width: 40, height: 40 }}
            trackStyle={{ height: 4 }}
            thumbStyle={[{
              width: 12,
              height: 12,
              backgroundColor: "rgb(34,29,40)",
              borderWidth: 3,
              borderColor: props.theme,
            }, props.thumbStyle]}
            onValueChange={(value: any) => onSeek(value)}
          />
        </View>
        <View style={{ width: '12%', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 12 }}>
            {secondsToTime(Math.floor(state.progress))}
          </Text>
        </View>

      </View>}
    </View>
  )
})

CustomVideoPlayer.defaultProps = {
  height: "30%",
  width: "100%",
  theme: "white",
  play: false,
  autoplay: false,
  seekBarWidth: "100%",
  seekBarFilledColor: "white",
  seekBarUnfilledColor: "rgb(200,200,200)",
  fullscreen: false,
  showSeekBar: true,
  resizeMode: "contain",
  replay: true,
  radius: 10,
  loop: false,
  controls: true
};

export default CustomVideoPlayer;
