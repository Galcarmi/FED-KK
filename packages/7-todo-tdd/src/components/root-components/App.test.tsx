import { shallow } from '../../test/config';
import App from './App';

describe('app should be rendered', () => {
    it('app should be rendered',()=>{
        const app = shallow(<App/>);
        expect(app.exists()).toBe(true);
    })
});
