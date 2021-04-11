import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import Option from 'Components/Option';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { deepEquals } from '../../functions/deepFunctions';
import { optionTypes } from '../../include/constants';

function GroupControls(props) {
  if (props.subOptions === undefined) return null;

  const gridRef = useRef();
  const masonryElement = useRef();

  useEffect(() => {
    if (props.useMasonry) {
      if (masonryElement.current === undefined) {
        masonryElement.current = new Masonry(gridRef.current, {
          itemSelector: '.masonry-cell',
          fitWidth: true,
          transitionDuration: 0,
          initLayout: false,
        });
        setTimeout(() => {
          if (masonryElement.current !== undefined) {
            masonryElement.current.layout();
          }
        }, 0);
      } else {
        masonryElement.current.reloadItems();
        masonryElement.current.layout();
      }
    } else if (masonryElement.current !== undefined) {
      masonryElement.current.destroy();
      masonryElement.current = undefined;
    }
  }, [props.subOptions]);

  const optionElements = [];
  for (const optionKey of props.subOptions) {
    optionElements.push(<Option
      key={optionKey}
      optionKey={optionKey}
      isMasonryCell={props.useMasonry}
      displayAsTableRow={props.displayAsTable}
    />);
  }
  if (optionElements.length === 0) return null;

  let content;
  if (props.displayAsTable) {
    content = <table>
      <tbody>
        {optionElements}
      </tbody>
    </table>;
  }
  else {
    content = optionElements;
  }

  return (
    <div
      className={classNames(
        'GroupControls',
        'option-controls',
        { 'masonry-grid': props.useMasonry }
      )}
      ref={gridRef}
    >
      {content}
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  let subOptions;
  if (option.type === optionTypes.GROUP || option.type === optionTypes.INTEGER) subOptions = option.subOptions;
  else if (option.type === optionTypes.RATIO || option.type === optionTypes.SELECT) subOptions = option.choices;

  if (subOptions === undefined) return {};

  subOptions = subOptions.filter(optionKey =>
    !state.options[optionKey].hidden
  );
  return {
    subOptions,
    displayAsTable: option.displayAsTable,
  };
}, null, null, { areStatePropsEqual: deepEquals })(GroupControls);
