import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

export default enzyme;
export const shallow = enzyme.shallow;
export const mount = enzyme.mount;

console.log('mamamam')
