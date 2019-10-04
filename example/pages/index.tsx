import * as React from 'react';
import { Link } from '../..';

const App = () => {
  return (
    <>
      <div>
        <Link href="https://mcan.sh">
          <a>This should open in a new tab</a>
        </Link>
      </div>
      <div>
        <Link href="https://mcan.sh" newTab={false}>
          <a>External link in the same tab</a>
        </Link>
      </div>
      <div>
        <Link href="/internal">
          <a>This will render a regular next link</a>
        </Link>
      </div>
    </>
  );
};

export default App;
