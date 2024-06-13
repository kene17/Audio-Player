declare module 'wavesurfer.js/src/plugin/regions' {
  import WaveSurfer from 'wavesurfer.js';

  export interface WaveSurferRegion {
    id: string;
    start: number;
    end: number;
    loop: boolean;
    color: string;
  }

  export interface RegionsPluginParams {
    regionsMinLength?: number;
    dragSelection?: boolean;
  }

  export default class RegionsPlugin {
    static create(params: RegionsPluginParams): any;
  }
}
