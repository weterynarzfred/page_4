import React from 'react';
import { changelog } from '../content/cyoa';

function Changelog(props) {

  return <div className="Changelog">
    {changelog}
  </div>;
}

export default Changelog;
