import {Block} from 'blockly';
import Blockly from 'blockly';
import {Order as JSorder, javascriptGenerator} from 'blockly/javascript';
import {Order as pythonOrder, pythonGenerator} from 'blockly/python';

export const get_light_state = 'get_light_state';
export const initBlock = () => {
  Blockly.Blocks[get_light_state] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Get light at index: ')
        .appendField(new Blockly.FieldNumber(), 'index');

      this.setInputsInline(true);

      this.setColour(315);
      this.setTooltip('Get the state of a one of the lights');
      this.setOutput(true);
    },
  };

  javascriptGenerator.forBlock[get_light_state] = (block: Block) => {
    const index: number = block.getFieldValue('index');
    return ['lightState(' + index + ')', JSorder.NONE];
  };

  pythonGenerator.forBlock[get_light_state] = (block: Block) => {
    const index: number = block.getFieldValue('index');
    return ['lightState(' + index + ')', pythonOrder.NONE];
  };
};
