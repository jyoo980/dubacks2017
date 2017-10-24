"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
//import "mocha";
const chai_1 = require("chai");
const ConversationInterceptor_1 = require("../main/response/conversation/ConversationInterceptor");
// from '../src/main/response/conversation/ConversationInterceptor.ts';
let FINAL_ID = "8473241";
let responseHandler = new ResponseHandler();
let conversationInterceptor;
describe("", function () {
    before("", function () {
        conversationInterceptor = new ConversationInterceptor_1.ConversationInterceptor();
    });
    it("Sample test to make something work", function () {
        chai_1.expect(true).to.be.true;
    });
});
