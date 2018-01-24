import React from 'react';
import {mount} from "enzyme";
import Panel from './';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

describe("Panel", () => {
    let props;
    let mountedPanel;
    const panel = () => {
        if (!mountedPanel) {
            mountedPanel = mount(
                <Panel {...props} />
            );
        }
        return mountedPanel;
    }

    const getWrapperDiv = (e) => {
        const divs = e.find("div");
        const wrappingDiv = divs.first();
        return wrappingDiv;
    }

    beforeEach(() => {
        props = {
            title: undefined,
            className: undefined,
            children: undefined,
        };
        mountedPanel = undefined;
    });

    it("always renders a div", () => {
        const divs = panel().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {

        it("has class `panel`", () => {
            const p = panel();
            const wrappingDiv = getWrapperDiv(p);
            expect(wrappingDiv.hasClass('panel')).toEqual(true);
        });
    })

    describe('when prop `className` is defined', () => {

        beforeEach(() => {
            props.className = 'test-panel';
        });

        it("add `className` on wrapper div", () => {
            const p = panel();
            const wrappingDiv = getWrapperDiv(p);
            expect(wrappingDiv.hasClass('test-panel')).toEqual(true);
        });
    })

    describe('when prop `title` is defined', () => {

        beforeEach(() => {
            props.title = 'Test Panel';
        });

        it("sets the rendered `PanelHeader`'s `title` prop to the same value as `title`'", () => {
            const p = panel();
            const panelHeader = p.find(PanelHeader);
            expect(panelHeader.props().title).toEqual('Test Panel');
        });
    })

    it("has one `PanelBody`", () => {
        const p = panel();
        const panelBody = p.find(PanelBody);
        expect(panelBody.length).toEqual(1);
    })

});


