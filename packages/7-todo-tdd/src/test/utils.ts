import { mount as enzymeMount } from 'enzyme';
import { ReactElement } from 'react';

export const enzymeContainerMount = (component: ReactElement) =>
  enzymeMount(component, {
    attachTo: document.getElementById('enzymeContainer'),
});

export const enzymeContainerSetupAndTeardown = ()=>{
    let container: HTMLDivElement | null;

    beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }

        container = null;
    });
}