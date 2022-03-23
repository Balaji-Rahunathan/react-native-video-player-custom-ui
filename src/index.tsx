import React, { useEffect, useRef, useImperativeHandle, createRef, forwardRef, } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { useSetState, Width, Height } from 'utils/functions.utils';
import { Container, Functions, Models, Text } from 'utils/imports.utils';
import { testDispatch } from 'utils/redux.utils';
import Video from 'react-native-video';

interface ICustomVideoPlayer {
  text?: String;
  uri?:String;
}

const CustomVideoPlayer = (props: ICustomVideoPlayer) => {
  const videoRef = useRef(null);
  // State
  const [state, setState] = useSetState({});

  //Hooks
  useEffect(() => {
    console.log(videoRef.current)
  }, []);

  //Logic
  const testLogic = () => {};

  return (
    <View>
      <Video 
        source={{uri: props.uri }} 
        ref={videoRef}   
        controls  
        paused={false}  
        onError={(error:any)=>console.log(error)}                     
        style={styles.backgroundVideo} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width:"100%",
    height: 200,
  },
});

export default CustomVideoPlayer;