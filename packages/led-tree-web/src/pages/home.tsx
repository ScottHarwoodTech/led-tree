import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import styles from './blockly.module.css';

const BlocklyWorkspace = dynamic(
  () => import('react-blockly').then(mod => mod.BlocklyWorkspace),
  {ssr: false}
);
export default function Home() {
  const [xml, setXml] = useState<string>();

  return (
    <BlocklyWorkspace
      className={styles.blockly}
      toolboxConfiguration={{
        kind: 'flyoutToolbox',
        contents: [
          {
            kind: 'block',
            type: 'controls_if',
          },
          {
            kind: 'block',
            type: 'controls_whileUntil',
          },
        ],
      }}
      initialXml={xml}
      onXmlChange={setXml}
    />
  );
}
