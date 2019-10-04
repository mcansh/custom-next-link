import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from '../src';

const App = () => {
  return (
    <>
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
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
