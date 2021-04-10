import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import Option from 'Components/Option';
import classNames from 'classnames';
import { connect } from 'react-redux';

function GroupControls(props) {
  if (props.subOptions === undefined) return null;

  const gridRef = useRef(null);
  useEffect(() => {
    if (props.useMasonry) {
      new Masonry(gridRef.current, {
        itemSelector: '.masonry-cell',
        fitWidth: true,
        transitionDuration: 0,
      });
    }
  }, []);

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
  return {
    subOptions: option.subOptions,
  };
})(GroupControls);