import React from 'react';
import styles from './blockly.module.css';
import { Workspace } from 'blockly';
import { BlocklyWorkspace } from 'react-blockly';
import { initCustomBlocks } from './custom_blocks';
import defaultToolbox from "./default_toolbox"
import { trigger_light } from './custom_blocks/set_light_state';
import { get_light_state } from './custom_blocks/get_light_state';
import { delay } from './custom_blocks/delay';

initCustomBlocks();

export const InternalWorkspace: React.FC<{
    onWsChange: (ws: Workspace) => void
    setXml: (xml: string) => void
    xml: string
}> = ({ onWsChange, xml, setXml }) => {

    return (
        <BlocklyWorkspace
            className={styles.blockly}
            onWorkspaceChange={onWsChange}
            workspaceConfiguration={{
                grid: {
                    spacing: 25,
                    length: 2,
                    colour: "#ccc",
                    snap: true,
                },
            }}

            toolboxConfiguration={{
                ...defaultToolbox, "contents": [...defaultToolbox.contents,
                {
                    'kind': 'category',
                    'name': 'Lights!',
                    'categorystyle': 'logic_category',
                    'contents': [{
                        kind: 'block',
                        type: trigger_light
                    },
                    {
                        kind: 'block',
                        type: get_light_state
                    }, {
                        kind: 'block',
                        type: delay
                    }]
                }]
            }}
            initialXml={xml}
            onXmlChange={setXml}
        />
    );
}