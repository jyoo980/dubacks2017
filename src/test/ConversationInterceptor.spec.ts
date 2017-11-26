/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
//import "mocha";
import {expect} from "chai";
import {ResponseInterceptor} from "../main/response/conversation/ResponseInterceptor";
import ResponseHandler from "../main/response/ResponseHandler";
// from '../src/main/response/conversation/ResponseInterceptor.ts';


let FINAL_ID = "8473241";
let responseHandler = new ResponseHandler(FINAL_ID);
let conversationInterceptor : ResponseInterceptor;

describe("", function() {

    before("", function() {
     //   conversationInterceptor = new ResponseInterceptor();
    });


    it("Sample test to make something work", function() {
        expect(true).to.be.true;
    });


    describe("Tests for simple utilities", function() {
        conversationInterceptor.isStringEqualTo("")
    })




});


// utility for tests

function expectStringsToBeEqual(response : string, pattern : string) {
    conversationInterceptor.resetCurrentString(response);
    expect(conversationInterceptor.isStringEqualTo(pattern)).to.be.true;

}
