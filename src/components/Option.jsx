import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { optionTypes } from 'Include/enum';
import Currencies from './Currencies';
import OptionRequirements from './optionElements/OptionRequirements';
import OptionImage from './optionElements/OptionImage';
import OptionCost from './optionElements/OptionCost';
import OptionControls from './optionElements/OptionControls';
import { isSelected } from '../functions/getSelectedValue';
import deepClone from '../functions/deepClone';
import OptionTitle from './optionElements/OptionTitle';
import OptionText from './optionElements/OptionText';

function Option(props) {
  if (props.option.hidden) return null;

  const currencies = deepClone(props.currencies);
  if (props.option.currencies !== undefined) {
    Object.assign(currencies, deepClone(props.option.currencies));
  }

  const classes = classNames(
    'Option',
    `option-${props.option.type}`,
    { 'selected': isSelected(props.option, props.options) },
    { 'top-level': props.topLevel },
    { 'option-is-row': props.displayAsTableRow },
    {
      'option-is-selectable': [
        optionTypes.INTEGER,
        optionTypes.TEXT,
      ].includes(props.option.type)
    },
    {
      'option-is-container': [
        optionTypes.GROUP,
        optionTypes.SELECT,
        optionTypes.INSTANCER,
      ].includes(props.option.type)
    },
    { 'masonry-cell': props.isMasonryCell }
  );

  const optionTitle = <OptionTitle option={props.option} showNumbering={[
    optionTypes.GROUP,
    optionTypes.SELECT,
    optionTypes.INSTANCER,
  ].includes(props.option.type)} />;
  const optionCurrencies = props.topLevel ?
    null :
    <Currencies currencies={props.option.currencies} />;

  if (props.displayAsTableRow) {
    return (
      <tr className={classes}>
        <td className="choice-control-cell">
          <OptionControls option={props.option} currencies={currencies} />
        </td>
        <td className="choice-title-cell">
          {optionTitle}
        </td>
        <td className="option-text">
          <OptionText text={props.option.text} />
          <OptionRequirements option={props.option} />
        </td>
        <td className="choice-cost-cell">
          <OptionCost cost={props.option.cost} currencies={currencies} />
        </td>
      </tr>
    );
  }
  else {
    return (
      <div className={classes}>
        <div className="option-content">
          {optionTitle}
          <div className="option-cost-wrap">
            <OptionCost cost={props.option.cost} currencies={currencies} />
          </div>
          <OptionImage image={props.option.image} />
          {optionCurrencies}
          <div className="option-text">
            <OptionText text={props.option.text} />
          </div>
          <OptionControls option={props.option} currencies={currencies} />
          <OptionRequirements option={props.option} />
        </div>
      </div>
    );
  }


}

export default connect(state => ({
  options: state.options,
}))(Option);