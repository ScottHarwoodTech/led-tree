import {initBlock as initGetLightState} from './get_light_state';
import {initBlock as initSetLightState} from './set_light_state';
import {initBlock as initDelay} from './delay';

export const initCustomBlocks = () => {
  initGetLightState();
  initSetLightState();
  initDelay();
};
