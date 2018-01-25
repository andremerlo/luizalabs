import React from 'react';
import {mount} from "enzyme";
import AddressSearchResult from './AddressSearchResult';
import ErrorMessage from '../Message/ErrorMessage';
import AddressInfo from './AddressInfo';
import AddressMap from './AddressMap';

describe("AddressSearchResult", () => {

    let props;
    let mountedAddressSearchResult;

    const addressSearchResult = () => {
        if (!mountedAddressSearchResult) {
            mountedAddressSearchResult = mount(
                <AddressSearchResult {...props} />
            );
        }
        return mountedAddressSearchResult;
    };

    beforeEach(() => {
        props = {
            searchResult: undefined
        };
        mountedAddressSearchResult = undefined;
    });

    describe("when `searchResult` undefined", () => {

        beforeEach(() => {
            props.searchResult = undefined
        });

        it("must render nothing", () => {
            const result = addressSearchResult();
            expect(result.html()).toEqual(null);
        })
    });

    describe("when error `searchResult` prop is defined", () => {

        beforeEach(() => {
            props.searchResult = {
                erro: true
            };
        });

        it("must render a `ErrorMessage`", () => {
            const result = addressSearchResult();
            expect(result.find(ErrorMessage).length).toEqual(1);
        })
    });

    describe("when success `searchResult` prop is defined", () => {

        beforeEach(() => {
            props.searchResult = {
                'logradouro': 'Rua Teste',
                'bairro': 'Bairro Teste',
                'cidade': 'Cidade Teste',
                'uf': 'SP',
                'cep': '11703-510',
            };
        });

        it("must render a `AddressInfo`", () => {
            const result = addressSearchResult();
            expect(result.find(AddressInfo).length).toEqual(1);
        })

        it("must render a `AddressMap`", () => {
            const result = addressSearchResult();
            expect(result.find(AddressMap).length).toEqual(1);
        })
    });

});


