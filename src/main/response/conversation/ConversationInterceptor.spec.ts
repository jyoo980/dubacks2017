/// <reference path="../../../../node_modules/@types/mocha/index.d.ts" />
//import "mocha";
import {expect} from "chai";
import {ConversationInterceptor} from "./ConversationInterceptor";
// from '../src/main/response/conversation/ConversationInterceptor.ts';


let FINAL_ID = "8473241";
let responseHandler = new ResponseHandler();
let conversationInterceptor : ConversationInterceptor;

describe("", function() {

    before("", function() {
        conversationInterceptor = new ConversationInterceptor();
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
