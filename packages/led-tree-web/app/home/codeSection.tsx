import React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from '@mui/material';
import {
  CodeBlock,
  SupportedLanguage,
  SupportedStyle,
  SupportedLanguages,
  SupportedStyleNames,
} from './codeBlock';

export const CodeSection: React.FC<{
  style: SupportedStyle;
  language: SupportedLanguage;
  code: string;
  setLanguage: (lang: SupportedLanguage) => void;
  setStyle: (style: SupportedStyle) => void;
}> = ({language, style, code, setLanguage, setStyle}) => {
  return (
    <Paper style={{padding: '10px'}} variant="outlined">
      <Stack spacing={2} direction={'row'}>
        <FormControl key="language">
          <InputLabel id="select-language-label">Language</InputLabel>
          <Select
            labelId="select-language-label"
            id="select-language"
            label="Language"
            defaultValue={SupportedLanguages[0]}
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            onChange={(e: any) => {
              setLanguage(e.target.value);
            }}
          >
            {SupportedLanguages.map(l => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl key="style">
          <InputLabel id="select-style-label">Style</InputLabel>
          <Select
            labelId="select-style-label"
            label="Style"
            id="select-style"
            value={style}
            defaultValue={SupportedStyleNames[0]}
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            onChange={(e: any) => {
              setStyle(e.target.value);
            }}
          >
            {SupportedStyleNames.map(l => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <CodeBlock code={code} language={language} style={style} />
    </Paper>
  );
};
