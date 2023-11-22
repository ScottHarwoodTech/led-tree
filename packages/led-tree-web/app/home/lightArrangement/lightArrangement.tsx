import React from 'react';
import {Paper} from '@mui/material';
import {LightArrangementObject} from './types';

const Bulb: React.FC<{x: number; y: number; state: boolean}> = ({
  x,
  y,
  state,
}) => {
  return (
    <span
      style={{
        height: '15px',
        width: '15px',
        left: `${x}%`,
        bottom: `${y}%`,
        backgroundColor: state ? '#00FF00' : '#FF0000',
        borderRadius: '50%',
        position: 'absolute',
      }}
    />
  );
};

export const LightArrangement: React.FC<{
  arrangement: LightArrangementObject;
  lightState: Array<boolean>;
}> = ({arrangement, lightState}) => {
  return (
    <Paper style={{height: '100%', width: '100%', position: 'relative'}}>
      {arrangement.lights.map((light, i) => (
        <Bulb key={i} x={light.x} y={light.y} state={lightState[i]} />
      ))}
    </Paper>
  );
};
