'use client';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from '@mui/material';
import React, {useState} from 'react';
import Interpreter from 'js-interpreter';
import {LightArrangement} from './lightArrangement/lightArrangement';
import {arrangements} from './lightArrangement/arrangements';
import {LightType} from './lightArrangement/types';
import styles from './blockly.module.css';

const creatInterp = (
  jsCode: string,
  lightControl: (i: number, state: boolean) => void,
  getLightState: (i: number) => boolean
) => {
  return new Interpreter(jsCode, (int, global) => {
    const lightControlWrapper = (i: number, state: boolean) => {
      return lightControl(i, state);
    };

    int.setProperty(
      global,
      'lightControl',
      int.createNativeFunction(lightControlWrapper)
    );

    const getLightStateWrapper = (i: number) => {
      return getLightState(i);
    };

    int.setProperty(
      global,
      'lightState',
      int.createNativeFunction(getLightStateWrapper)
    );

    const waitWrapper = (d: number, cb: () => void) => {
      setTimeout(cb, d * 1000);
    };

    int.setProperty(global, 'wait', int.createAsyncFunction(waitWrapper));
  });
};

const defaultForLightType = (type: LightType) => {
  switch (type) {
    case 'white':
      return 0;
    case 'rgb':
      return '000000';
  }
};

export const DisplaySection: React.FC<{jsCode: string}> = ({jsCode}) => {
  const [selectedArrangement, setSelectedArrangement] = useState('tree');

  const [lightState, setLightState] = useState(new Array(49).fill(false));
  const [running, setRunning] = useState(false);

  const runInterpereter = async () => {
    const ledStr = new Array(49).fill(false);
    const lightControl = (i: number, state: boolean) => {
      ledStr[i] = state;
      setLightState([...ledStr]);
    };

    const getLightState = (i: number): boolean => {
      return ledStr[i];
    };

    const interp = creatInterp(jsCode, lightControl, getLightState);

    async function nextStep() {
      let stepR = interp.step();
      while (stepR) {
        await new Promise(resolve => setTimeout(resolve, 0));
        stepR = interp.step();
      }
    }

    setRunning(true);
    await nextStep();
    setRunning(false);
  };

  return (
    <Paper
      style={{height: '100%', textAlign: 'center', padding: '15px'}}
      variant="outlined"
    >
      <Stack className={styles.fullHeight} spacing={1}>
        <Stack direction="row" spacing={2} style={{width: '100%'}}>
          <FormControl>
            <InputLabel id="select-arrangement-label">Arrangement</InputLabel>
            <Select
              labelId="select-arrangement-label"
              label="arrangement"
              id="select-arrangement"
              value={selectedArrangement}
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              onChange={(e: any) => {
                setSelectedArrangement(e.target.value);
                const arrangement = arrangements[e.target.value];
                setLightState(
                  Array(arrangement.lights.length).fill(
                    defaultForLightType(arrangement.colorType)
                  )
                );
              }}
            >
              {Object.keys(arrangements).map(l => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={runInterpereter}
            variant="contained"
            disabled={running}
          >
            Run!
          </Button>
        </Stack>
        <LightArrangement
          lightState={lightState}
          arrangement={arrangements[selectedArrangement]}
        />
      </Stack>
    </Paper>
  );
};
