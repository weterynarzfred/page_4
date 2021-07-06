import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getSelectedValue } from '../../functions/getSelectedValue';
import { handleIncrement, handleToggle } from '../../functions/handlers';
import isDisabled from '../../functions/isDisabled';
import { optionTypes } from '../../include/constants';
import { getUserValue } from '../../include/userValues';
import Currencies from '../Currencies';
import OptionButton from './OptionButton';
import OptionControls from './OptionControls';
import OptionCost from './OptionCost';
import OptionImage from './OptionImage';
import OptionRequirements from './OptionRequirements';
import OptionText from './OptionText';
import OptionTitle from './OptionTitle';

function handleClick(event) {
  if (this.isDisabled) return;
  if (this.topLevel) return;
  event.stopPropagation();

  if (this.type === optionTypes.INTEGER) {
    if (this.max === 1 && this.min === 0) {
      handleToggle.call(this, this.value);
    }
    else {
      handleIncrement.call(this, this.value);
    }
  }
}

function OptionContent(props) {
  const collapsibleRef = useRef();

  useEffect(() => {
    const openedHeight = collapsibleRef.current.scrollHeight;
    if (props.opened) {
      collapsibleRef.current.style.height = openedHeight + 'px';
      setTimeout(() => {
        if (collapsibleRef.current === null) return;
        collapsibleRef.current.style.height = 'auto';
      }, 500);
    }
    else {
      collapsibleRef.current.style.height = openedHeight + 'px';
      setTimeout(() => {
        if (collapsibleRef.current !== null) {
          collapsibleRef.current.style.height = 0;
        }
      }, 40);
    }
  }, [props.opened]);

  const displayCurrencies = !props.topLevel &&
    !getUserValue(props.optionKey, 'displayAsButton');

  return <div className={props.classes}>
    <div className="option-content" onClick={handleClick.bind(props)}>
      <OptionTitle
        optionKey={props.optionKey}
        onClick={props.isCollapsible ? props.setOpened : undefined}
      />
      <div className="option-collapsible-content" ref={collapsibleRef}>
        <div className="option-cost-wrap">
          <OptionCost optionKey={props.optionKey} />
        </div>
        <OptionImage optionKey={props.optionKey} />
        {displayCurrencies ? <Currencies optionKey={props.optionKey} /> : null}
        <div className="option-text">
          <OptionText optionKey={props.optionKey} />
          {props.topLevel ? null : <OptionButton optionKey={props.optionKey} />}
        </div>
        <OptionRequirements optionKey={props.optionKey} />
        <OptionControls optionKey={props.optionKey} topLevel={props.topLevel} />
      </div>
      {props.isCollapsible ? <div
        className="option-collapsible-elipsis"
        onClick={props.setOpened}
      >
        <div></div>
        <div></div>
        <div></div>
      </div> : null}
    </div>
  </div>;
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    type: option.type,
    value: getSelectedValue(option, state.options),
    min: option.min,
    max: option.max,
    isDisabled: isDisabled(option),
    opened: option.opened ?? true,
  };
})(OptionContent);
