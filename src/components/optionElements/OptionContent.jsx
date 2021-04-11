import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getSelectedValue } from '../../functions/getSelectedValue';
import { handleIncrement, handleToggle } from '../../functions/handlers';
import isDisabled from '../../functions/isDisabled';
import { optionTypes } from '../../include/constants';
import Currencies from '../Currencies';
import OptionControls from './OptionControls';
import OptionCost from './OptionCost';
import OptionImage from './OptionImage';
import OptionRequirements from './OptionRequirements';
import OptionText from './OptionText';
import OptionTitle from './OptionTitle';

function handleClick(event) {
  if (this.isDisabled) return;
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
        collapsibleRef.current.style.height = 0;
      }, 40);
    }
  }, [props.opened]);

  return <div className={props.classes} onClick={handleClick.bind(props)}>
    <div className="option-content">
      <OptionTitle
        optionKey={props.optionKey}
        onClick={props.isCollapsible ? props.setOpened : undefined}
      />
      <div className="option-collapsible-content" ref={collapsibleRef}>
        <div className="option-cost-wrap">
          <OptionCost optionKey={props.optionKey} />
        </div>
        <OptionImage optionKey={props.optionKey} />
        {props.topLevel ? null : <Currencies optionKey={props.optionKey} />}
        <div className="option-text">
          <OptionText optionKey={props.optionKey} />
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
  };
})(OptionContent);
