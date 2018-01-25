import React from 'react';
import {mount} from "enzyme";
import AddressSearchBar from './AddressSearchBar';

describe("AddressSearchBar", () => {
    
    let props;
    let mountedAddressSearchBar;
    const addressSearchBar = () => {
        if (!mountedAddressSearchBar) {
            mountedAddressSearchBar = mount(
                <AddressSearchBar {...props} />
            );
        }
        return mountedAddressSearchBar;
    };

    beforeEach(() => {
        props = {
            zipcode: undefined
        };
        mountedAddressSearchBar = undefined;
    });

    it("always renders a div", () => {
        const divs = addressSearchBar().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("has a button", () => {

        const button = addressSearchBar().find("button");
        expect(button.length).toEqual(1);

    });

    describe("when invalid `zipcode` prop is defined", () => {

        beforeEach(() => {
            props.zipcode = 'abcd';
        });

        it("button must be disabled", () => {
            const button = addressSearchBar().find("button");
            expect(button.props().disabled).toEqual(true);
        });
    });

    describe("when valid `zipcode` prop is defined", () => {

        beforeEach(() => {
            props.zipcode = '11703-510';
        });

        it("button must be enabled", () => {
            const button = addressSearchBar().find("button");
            expect(button.props().disabled).toEqual(false);
        });
    });

});


