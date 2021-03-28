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

function Option(props) {
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
    }
  );

  const optionText = props.option.text === undefined ? '' : props.option.text;
  const optionCurrencies = props.topLevel ?
    null :
    <Currencies currencies={props.option.currencies} />;

  if (props.displayAsTableRow) {
    const optionTitle = props.option.title === undefined ?
      null :
      <td className="option-title">{props.option.title}</td>;

    return (
      <tr className={classes}>
        <td className="choice-control-cell">
          <OptionControls option={props.option} currencies={currencies} />
        </td>
        {optionTitle}
        <td className="option-text">
          {optionText}
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
          <div className="option-title">{props.option.title}</div>
          <div className="option-cost-wrap">
            <OptionCost cost={props.option.cost} currencies={currencies} />
          </div>
          <OptionImage image={props.option.image} />
          {optionCurrencies}
          <div className="option-text">{optionText}</div>
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