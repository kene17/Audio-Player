import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';
import { useNav } from '../../store/NavContext';
import styles from './AudioControlsStyles.module.css';

const AudioControls: React.FC = () => {
  const { audioFile } = useNav();
  const waveformRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (containerRef.current && audioFile) {
      waveformRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        backend: 'MediaElement',
        plugins: [
          RegionsPlugin.create({
            regionsMinLength: 2,
            dragSelection: true,
          }),
        ],
      });

      waveformRef.current.load(URL.createObjectURL(audioFile));
    }

    return () => waveformRef.current?.destroy();
  }, [audioFile]);

  const handlePlayPause = () => {
    if (waveformRef.current) {
      waveformRef.current.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  const handleStop = () => {
    waveformRef.current?.stop();
    setIsPlaying(false);
  };

  const handleCut = () => {
    if (!waveformRef.current || !waveformRef.current.regions) return;
    const regions = Object.values(waveformRef.current.regions.list);
    regions.forEach((region) => {
      const { start, end } = region;
      removeAudioRegion(start, end);
      waveformRef.current?.removeRegion(region.id);
    });
  };

  const removeAudioRegion = (start: number, end: number) => {
    if (!waveformRef.current) return;

    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const buffer = waveformRef.current.backend.buffer;
    if (!buffer) return;

    const sampleRate = buffer.sampleRate;
    const newBuffer = audioContext.current.createBuffer(
      buffer.numberOfChannels,
      (buffer.duration - (end - start)) * sampleRate,
      sampleRate
    );

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const oldChannelData = buffer.getChannelData(i);
      const newChannelData = newBuffer.getChannelData(i);

      const beforeRegion = oldChannelData.subarray(0, start * sampleRate);
      const afterRegion = oldChannelData.subarray(end * sampleRate);

      newChannelData.set(beforeRegion);
      newChannelData.set(afterRegion, beforeRegion.length);
    }

    waveformRef.current.backend.setBuffer(newBuffer);
    waveformRef.current.drawBuffer();
  };

  const handleLoop = () => {
    waveformRef.current?.addRegion({
      start: 1,
      end: 3,
      loop: true,
      color: 'hsla(400, 100%, 30%, 0.5)',
    });
  };

  return (
    <div className={styles.audioControls}>
      <div
        ref={containerRef}
        className={styles.waveformContainer}
      ></div>
      <div className={styles.controls}>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleCut}>Cut</button>
        <button onClick={handleLoop}>Loop</button>
      </div>
    </div>
  );
};

export default AudioControls;
