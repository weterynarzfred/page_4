import React, { useEffect } from 'react';
import Masonry from 'masonry-layout';
import Option from '../Option';
import classNames from 'classnames';

function SelectControls(props) {

  useEffect(() => {
    if (!props.option.displayAsTable) {
      new Masonry(`#select-controls-${props.option.path.join('-')}`, {
        itemSelector: '.masonry-cell',
        fitWidth: true,
        transitionDuration: 0,
      });
    }
  }, []);

  const choiceElements = [];
  for (const slug in props.option.choices) {
    choiceElements.push(<Option
      key={slug}
      isMasonryCell={!props.option.displayAsTable}
      option={props.option.choices[slug]}
      currencies={props.currencies}
      displayAsTableRow={props.option.displayAsTable}
    />);
  }

  let content;
  if (props.option.displayAsTable) {
    content = <table>
      <tbody>
        {choiceElements}
      </tbody>
    </table>;
  }
  else {
    content = choiceElements;
  }

  return (
    <div
      className={classNames(
        'SelectControls',
        { 'masonry-grid': !props.option.displayAsTable }
      )}
      id={`select-controls-${props.option.path.join('-')}`}
    >
      {content}
    </div>
  );
}

export default SelectControls;