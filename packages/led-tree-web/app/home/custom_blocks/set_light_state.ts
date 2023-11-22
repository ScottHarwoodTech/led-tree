import {Block} from 'blockly';
import Blockly from 'blockly';
import {javascriptGenerator, Order} from 'blockly/javascript';
import {pythonGenerator} from 'blockly/python';

export const trigger_light = 'trigger_light';
export const initBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      type: trigger_light,
      message0: 'Set light at index %1 to %2',
      args0: [
        {
          type: 'input_value',
          name: 'INDEX',
          check: 'Number',
          value: 10,
          min: 0,
          precision: 1,
        },
        {
          type: 'input_value',
          name: 'STATE',
          check: 'Boolean',
        },
      ],
      previousStatement: true,
      nextStatement: true,
      colour: 315,
      inputsInline: true,
    },
  ]);

  javascriptGenerator.forBlock[trigger_light] = (
    block: Block,
    generator: typeof javascriptGenerator
  ) => {
    let index = '0';
    if (block.getField('INDEX')) {
      index = String(Number(block.getFieldValue('INDEX')));
    } else {
      index = generator.valueToCode(block, 'INDEX', Order.ASSIGNMENT) || '0';
    }

    let state: 'false' | 'false';
    if (block.getField('state')) {
      state = block.getFieldValue('STATE');
    } else {
      state =
        generator.valueToCode(block, 'STATE', Order.ASSIGNMENT) || 'false';
    }

    return 'lightControl(' + index + ',' + state.toLowerCase() + ');\n';
  };

  pythonGenerator.forBlock[trigger_light] = (
    block: Block,
    generator: typeof pythonGenerator
  ) => {
    let index = '0';
    if (block.getField('INDEX')) {
      index = String(Number(block.getFieldValue('INDEX')));
    } else {
      index = generator.valueToCode(block, 'INDEX', Order.ASSIGNMENT) || '0';
    }

    let state: 'false' | 'false';
    if (block.getField('state')) {
      state = block.getFieldValue('STATE');
    } else {
      state =
        generator.valueToCode(block, 'STATE', Order.ASSIGNMENT) || 'false';
    }

    return (
      'lightControl(' +
      index +
      ',' +
      state.charAt(0).toUpperCase() +
      state.slice(1).toLowerCase() +
      ');\n'
    );
  };
};
