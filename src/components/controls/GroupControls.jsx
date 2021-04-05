import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import Option from 'Components/Option';
import classNames from 'classnames';

function GroupControls(props) {
  if (props.subOptions === undefined) return null;

  // const gridRef = useRef(null);
  // useEffect(() => {
  //   if (props.useMasonry) {
  //     new Masonry(gridRef.current, {
  //       itemSelector: '.masonry-cell',
  //       fitWidth: true,
  //       transitionDuration: 0,
  //     });
  //   }
  // }, []);

  const optionElements = [];
  // for (const slug in props.options) {
  //   const option = props.options[slug];
  //   optionElements.push(<Option
  //     isMasonryCell={props.useMasonry}
  //     option={option}
  //     key={slug}
  //     currencies={props.currencies}
  //   />);
  // }
  for (const optionKey of props.subOptions) {
    optionElements.push(<Option key={optionKey} optionKey={optionKey} />);
  }
  if (optionElements.length === 0) return null;

  // return (
  //   <div
  //     className={classNames(
  //       'GroupControls',
  //       { 'masonry-grid': props.useMasonry }
  //     )}
  //     ref={gridRef}
  //   >
  //     {optionElements}
  //   </div>
  // );

  return (
    <div
      className={classNames(
        'GroupControls'
      )}
    >
      {optionElements}
    </div>
  );
}

export default GroupControls;