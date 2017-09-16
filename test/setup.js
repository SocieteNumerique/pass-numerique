import chai from 'chai';
import assertJsx, { options } from 'preact-jsx-chai';

options.functions = false;
chai.use(assertJsx);
global.sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
