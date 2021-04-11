import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import Option from 'Components/Option';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { deepEquals } from '../../functions/deepFunctions';

function GroupControls(props) {
  if (props.subOptions === undefined) return null;

  const gridRef = useRef();
  const masonryElement = useRef();

  useEffect(() => {
    if (props.useMasonry) {
      masonryElement.current = new Masonry(gridRef.current, {
        itemSelector: '.masonry-cell',
        fitWidth: true,
        transitionDuration: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (props.useMasonry) {
      masonryElement.current.reloadItems();
      masonryElement.current.layout();
    }
  }, [props.subOptions]);

  const optionElements = [];
  for (const optionKey of props.subOptions) {
    optionElements.push(<Option
      key={optionKey}
      optionKey={optionKey}
      isMasonryCell={props.useMasonry}
    />);
  }
  if (optionElements.length === 0) return null;

  return (
    <div
      className={classNames(
        'GroupControls',
        'option-controls',
        { 'masonry-grid': props.useMasonry }
      )}
      ref={gridRef}
    >
      {optionElements}
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (option.subOptions === undefined) return {};
  const subOptions = option.subOptions.filter(optionKey =>
    !state.options[optionKey].hidden
  );
  return {
    subOptions,
  };
}, null, null, { areStatePropsEqual: deepEquals })(GroupControls);
