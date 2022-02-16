import { shallow } from 'enzyme';
import App from './App';

test('App exists', () => {
  const myApp = shallow(<App />)
  expect(myApp).toBeTruthy()
});
