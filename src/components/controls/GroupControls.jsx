import React, { useEffect } from 'react';
import Masonry from 'masonry-layout';
import Option from 'Components/Option';
import classNames from 'classnames';

function GroupControls(props) {
  if (props.options === undefined) return null;

  useEffect(() => {
    if (props.useMasonry) {
      new Masonry(`#group-controls-${props.option.path.join('-')}`, {
        itemSelector: '.masonry-cell',
        fitWidth: true,
        transitionDuration: 0,
      });
    }
  }, []);

  const optionElements = [];
  for (const slug in props.options) {
    const option = props.options[slug];
    optionElements.push(<Option
      isMasonryCell={props.useMasonry}
      option={option}
      key={slug}
      currencies={props.currencies}
    />);
  }
  if (optionElements.length === 0) return null;

  return (
    <div
      className={classNames('GroupControls', { 'masonry-grid': props.useMasonry })}
      id={`group-controls-${props.option.path.join('-')}`}
    >
      {optionElements}
    </div>
  );
}

export default GroupControls;