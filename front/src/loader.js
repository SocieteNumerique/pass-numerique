import 'normalize.css/normalize.css';
import './app.scss';

import { h, render } from 'preact';
import App from './app';

render(<App />, document.getElementById('app'));
