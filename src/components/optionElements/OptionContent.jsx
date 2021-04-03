import React from 'react';
import { connect } from 'react-redux';
import { getSelectedCount } from '../../functions/getSelectedValue';
import { handleIncrement, handleToggle } from '../../functions/handlers';
import { optionTypes } from '../../include/enum';
import Currencies from '../Currencies';
import OptionControls from './OptionControls';
import OptionCost from './OptionCost';
import OptionImage from './OptionImage';
import OptionRequirements from './OptionRequirements';
import OptionText from './OptionText';
import OptionTitle from './OptionTitle';

function handleClick(event) {
  event.stopPropagation();
  if (this.option.type === optionTypes.INTEGER) {
    const value = getSelectedCount(this.option, this.options);
    if (this.option.max === 1 && this.option.min === 0) {
      handleToggle.call(this, value);
    }
    else {
      handleIncrement.call(this, value);
    }
  }
}

function OptionContent(props) {
  return (
    <div className={props.classes} onClick={handleClick.bind(props)}>
      <div className="option-content">
        <OptionTitle option={props.option} />
        <div className="option-cost-wrap">
          <OptionCost cost={props.option.cost} currencies={props.currencies} />
        </div>
        <OptionImage image={props.option.image} />
        {props.topLevel ? null : <Currencies currencies={props.option.currencies} />}
        <div className="option-text">
          <OptionText option={props.option} />
        </div>
        <OptionRequirements option={props.option} />
        <OptionControls option={props.option} currencies={props.currencies} />
      </div>
    </div>
  );
}

export default connect(state => ({
  options: state.options,
}))(OptionContent);