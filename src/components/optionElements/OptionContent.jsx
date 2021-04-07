import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getSelectedCount, getSelectedValue } from '../../functions/getSelectedValue';
import { handleIncrement, handleToggle } from '../../functions/handlers';
import { optionTypes } from '../../include/constants';
import Currencies from '../Currencies';
import OptionControls from './OptionControls';
import OptionCost from './OptionCost';
import OptionImage from './OptionImage';
import OptionRequirements from './OptionRequirements';
import OptionText from './OptionText';
import OptionTitle from './OptionTitle';

function handleClick(event) {
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
  // const collapsibleRef = useRef();

  // useEffect(() => {
  //   const openedHeight = collapsibleRef.current.scrollHeight;
  //   if (props.opened) {
  //     collapsibleRef.current.style.height = openedHeight + 'px';
  //     setTimeout(() => {
  //       if (collapsibleRef.current === null) return;
  //       collapsibleRef.current.style.height = 'auto';
  //     }, 500);
  //   }
  //   else {
  //     collapsibleRef.current.style.height = openedHeight + 'px';
  //     setTimeout(() => {
  //       collapsibleRef.current.style.height = 0;
  //     }, 40);
  //   }
  // }, [props.opened]);

  // return (
  //   <div className={props.classes} onClick={handleClick.bind(props)}>
  //     <div className="option-content">
  //       <OptionTitle option={props.option} onClick={props.setOpened} />
  //       <div className="option-collapsible-content" ref={collapsibleRef}>
  //         <div className="option-cost-wrap">
  //           <OptionCost cost={props.option.cost} currencies={props.currencies} />
  //         </div>
  //         <OptionImage image={props.option.image} />
  //         {props.topLevel ? null : <Currencies currencies={props.option.currencies} />}
  //         <div className="option-text">
  //           <OptionText option={props.option} />
  //         </div>
  //         <OptionRequirements option={props.option} />
  //         <OptionControls option={props.option} currencies={props.currencies} />
  //       </div>
  //       {props.isCollapsible ? <div className="option-collapsible-elipsis" onClick={props.setOpened}>
  //         <div></div>
  //         <div></div>
  //         <div></div>
  //       </div> : null}
  //     </div>
  //   </div >
  // );
  return <div className={props.classes} onClick={handleClick.bind(props)}>
    <div className="option-content">
      <OptionTitle optionKey={props.optionKey} />
      <div className="option-collapsible-content">
        <div className="option-text">
          <OptionText optionKey={props.optionKey} />
        </div>
        <OptionControls optionKey={props.optionKey} />
      </div>
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
  };
})(OptionContent);