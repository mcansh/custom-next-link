import * as React from 'react';
import { Link, LinkProvider } from '../..';

const App = () => {
  return (
    <LinkProvider value="next-link.mcan.sh">
      <div>
        <Link href="https://mcan.sh">
          <a>This should open in a new tab</a>
        </Link>
      </div>
      <div>
        <Link href="/internal">
          <a>This will render a regular next link</a>
        </Link>
      </div>
    </LinkProvider>
  );
};

export default App;
