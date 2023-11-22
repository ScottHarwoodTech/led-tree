export type LightLocation = {
  x: number;
  y: number;
};

export type LightType = 'white' | 'rgb';

export type LightArrangementObject = {
  lights: Array<LightLocation>;
  colorType: LightType;
  image: string;
  name: string;
};
