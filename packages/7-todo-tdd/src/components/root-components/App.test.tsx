import { ReactWrapper } from 'enzyme';
import { mount } from '../../test/config';
import App from './App';

describe('app main components should be rendered', () => {
    let app:ReactWrapper;

    beforeEach(()=>{
        app = mount(<App/>);
    })
    it('app should be rendered',()=>{
        expect(app.exists()).toBe(true);
    });

    it('todo input should be rendered',()=>{
        expect(app.find('#todo__input').exists()).toBe(true);
    });

    it('todo list should be rendered',()=>{
        expect(app.find('#todo__list').exists()).toBe(true);
    });

    it('add btn should be rendered',()=>{
        expect(app.find('#todo__add-btn').exists()).toBe(true);
    });
});
