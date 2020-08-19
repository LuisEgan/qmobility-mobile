import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";

import Icons from "../svg";

const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

const SpeechToText = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [rate, setRate] = useState(1.0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [shouldCorrectPitch, setShouldCorrectPitch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    _askForPermissions();
  }, []);

  const _askForPermissions = async () => {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  };

  const _stopRecordingAndEnablePlayback = async () => {
    setIsLoading(true);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      console.log(error);
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const response = await recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: muted,
        volume: volume,
        rate: rate,
        shouldCorrectPitch: shouldCorrectPitch,
      },
      _updateScreenForSoundStatus
    );

    setSound(response.sound);
    setIsLoading(false);
  };

  const _onRecordPressed = () => {
    if (isRecording) {
      _stopRecordingAndEnablePlayback();
    } else {
      _stopPlaybackAndBeginRecording();
    }
  };

  const _updateScreenForRecordingStatus = (status) => {
    if (status.canRecord) {
      setIsRecording(status.isRecording);
    } else if (status.isDoneRecording) {
      setIsRecording(false);

      if (isLoading) {
        _stopRecordingAndEnablePlayback();
      }
    }
  };

  const _updateScreenForSoundStatus = (status) => {
    if (status.isLoaded) {
      setRate(status.rate);
      setMuted(status.muted);
      setVolume(status.volume);
      setShouldCorrectPitch(status.shouldCorrectPitch);
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const _stopPlaybackAndBeginRecording = async () => {
    setIsLoading(true);
    if (sound !== null) {
      await sound.unloadAsync();
      sound.setOnPlaybackStatusUpdate(null);
      setSound(null);
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    if (recording !== null) {
      recording.setOnRecordingStatusUpdate(null);
      setRecording(null);
    }

    const recordingObject = new Audio.Recording();
    await recordingObject.prepareToRecordAsync(recordingOptions);
    recordingObject.setOnRecordingStatusUpdate(_updateScreenForRecordingStatus);

    setRecording(recordingObject);
    await recordingObject.startAsync();
    setIsLoading(false);
  };

  return <Icons icon="Mic" onPress={_onRecordPressed} />;
};

export default SpeechToText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#f1f1",
    color: "#fff",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
