import {Block} from 'blockly';
import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';
import {pythonGenerator} from 'blockly/python';

export const delay = 'delay';

export const initBlock = () => {
  Blockly.Blocks[delay] = {
    init: function () {
      this.setPreviousStatement(true);
      this.setNextStatement(true);

      this.appendDummyInput()
        .appendField('Wait for')
        .appendField(new Blockly.FieldNumber(), 'delay')
        .appendField('Seconds');
      // this.appendValueInput("index")
      // this.appendValueInput("state").appendField("to")

      this.setInputsInline(true);

      this.setColour(315);
      this.setTooltip('Wait for some time');
    },
  };

  javascriptGenerator.forBlock[delay] = (block: Block) => {
    const delay: number = block.getFieldValue('delay');

    return 'wait(' + delay + ');\n';
  };

  pythonGenerator.forBlock[delay] = (block: Block) => {
    const delay: number = block.getFieldValue('delay');

    return 'time.sleep(' + delay + ')\n';
  };
};
