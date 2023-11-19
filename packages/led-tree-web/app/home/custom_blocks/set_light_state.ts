import { Block } from 'blockly';
import Blockly from "blockly"
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

export const trigger_light = 'trigger_light'
export const initBlock = () => {
    Blockly.Blocks[trigger_light] = {
        init: function () {
            this.setPreviousStatement(true)
            this.setNextStatement(true)

            this.appendDummyInput()
                .appendField("Set light at index: ")
                .appendField(new Blockly.FieldNumber(), "index")
                .appendField("to")
                .appendField(new Blockly.FieldCheckbox(false), "state");
            // this.appendValueInput("index")
            // this.appendValueInput("state").appendField("to")

            this.setInputsInline(true);

            this.setColour(315);
            this.setTooltip("Set the state of a one of the lights");
        }
    }

    javascriptGenerator.forBlock[trigger_light] = (block: Block) => {
        const state: "TRUE" | "FALSE" = block.getFieldValue("state")
        const index: number = block.getFieldValue("index")

        return 'lightControl(' + index + ',' + state.toLowerCase() + ');\n'
    }

    pythonGenerator.forBlock[trigger_light] = (block: Block) => {
        const state: "TRUE" | "FALSE" = block.getFieldValue("state")
        const index: number = block.getFieldValue("index")

        return 'lightControl(' + index + ',' + state.charAt(0).toUpperCase() + state.slice(1).toLowerCase() + ');\n'
    }

}