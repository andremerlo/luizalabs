import React from 'react';
import {mount} from "enzyme";
import AddressSearch from './';
import Panel from '../Panel/';
import AddressSearchBar from './AddressSearchBar';
import AddressSearchResult from './AddressSearchResult';

describe("AddressSearch", () => {
    let props;
    let mountedAddressSearch;
    const addressSearch = () => {
        if (!mountedAddressSearch) {
            mountedAddressSearch = mount(
                <AddressSearch {...props} />
            );
        }
        return mountedAddressSearch;
    };

    beforeEach(() => {
        props = {};
        mountedAddressSearch = undefined;
    });

    it("always renders into a div", () => {
        const panel = addressSearch().find(Panel);
        expect(panel.length).toEqual(1);
    });

});


