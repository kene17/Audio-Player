import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';
import { useNav } from '../../store/NavContext';
import styles from './AudioControlsStyles.module.css';
import {
  faPlay,
  faPause,
  faStop,
  faCut,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AudioControls: React.FC = () => {
  const { audioFile } = useNav();
  const waveformRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (containerRef.current && audioFile) {
      waveformRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        backend: 'WebAudio',
        plugins: [
          RegionsPlugin.create({
            regionsMinLength: 2,
            dragSelection: true,
          }),
        ],
      });

      waveformRef.current.load(URL.createObjectURL(audioFile));

      waveformRef.current.on('ready', () => {
        console.log('WaveSurfer is ready');
      });

      waveformRef.current.on('region-created', (region) => {
        console.log('Region created:', region);
        region.on('click', () => {
          handleRegionSelection(region.id);
        });
      });

      waveformRef.current.on('region-removed', (region) => {
        console.log('Region removed:', region);
        if (region.id === selectedRegionId) {
          setSelectedRegionId(null);
        }
      });
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
    if (!waveformRef.current || !selectedRegionId) {
      console.log('No region selected or WaveSurfer not initialized');
      return;
    }

    const regions = waveformRef.current.regions?.list;
    if (!regions) {
      console.log('No regions object found on waveform');
      return;
    }

    const region = regions[selectedRegionId];
    if (region) {
      console.log(`Cutting region from ${region.start} to ${region.end}`);
      cutAudioRegion(region.start, region.end);
      region.remove();
      console.log(`Region with id ${selectedRegionId} has been cut.`);
    } else {
      console.log(`Region with id ${selectedRegionId} not found`);
    }
  };

  const cutAudioRegion = async (start: number, end: number) => {
    if (!waveformRef.current) return;

    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    const buffer = (waveformRef.current.backend as any).buffer;
    if (!buffer) return;

    const sampleRate = buffer.sampleRate;
    const startSample = Math.round(start * sampleRate);
    const endSample = Math.round(end * sampleRate);
    const newBufferSize = buffer.length - (endSample - startSample);

    if (startSample < 0 || endSample > buffer.length || newBufferSize <= 0) {
      console.error('Invalid region boundaries');
      return;
    }

    const newBuffer = audioContext.current.createBuffer(
      buffer.numberOfChannels,
      newBufferSize,
      sampleRate
    );

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const oldChannelData = buffer.getChannelData(i);
      const newChannelData = newBuffer.getChannelData(i);

      newChannelData.set(oldChannelData.subarray(0, startSample));

      newChannelData.set(oldChannelData.subarray(endSample), startSample);
    }

    const offlineAudioContext = new OfflineAudioContext(
      newBuffer.numberOfChannels,
      newBuffer.length,
      sampleRate
    );
    const bufferSource = offlineAudioContext.createBufferSource();
    bufferSource.buffer = newBuffer;

    bufferSource.connect(offlineAudioContext.destination);
    bufferSource.start();

    const renderedBuffer = await offlineAudioContext.startRendering();

    waveformRef.current.empty();
    waveformRef.current.loadDecodedBuffer(renderedBuffer);

    console.log(`Region from ${start} to ${end} removed from audio.`);
  };

  const handleLoop = () => {
    if (!selectedRegionId) {
      console.log('No region selected for looping');
      return;
    }

    const regions = waveformRef.current?.regions?.list;
    const region = regions?.[selectedRegionId];
    if (region) {
      waveformRef.current?.addRegion({
        id: 'loop-region',
        start: region.start,
        end: region.end,
        loop: true,
        color: 'hsla(400, 100%, 30%, 0.5)',
      });

      console.log(
        `Loop region created from ${region.start} to ${region.end} seconds.`
      );
    }
  };

  const handleRegionSelection = (regionId: string) => {
    const region = waveformRef.current?.regions?.list[regionId];
    if (region) {
      setSelectedRegionId(regionId);
      console.log(
        `Region with id ${regionId} selected from ${region.start} to ${region.end}`
      );
    }
  };

  return (
    <div className={styles.audioControls}>
      <div
        ref={containerRef}
        className={styles.waveformContainer}
      ></div>
      <div className={styles.controls}>
        <button
          onClick={handlePlayPause}
          className={styles.iconButton}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button
          onClick={handleStop}
          className={styles.iconButton}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
        <button
          onClick={handleCut}
          className={styles.iconButton}
        >
          <FontAwesomeIcon icon={faCut} />
        </button>
        <button
          onClick={handleLoop}
          className={styles.iconButton}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
      </div>
    </div>
  );
};

export default AudioControls;
