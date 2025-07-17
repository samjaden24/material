/*global QUnit*/

sap.ui.define([
	"demo/assessment/assessment/controller/basicView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("basicView Controller");

	QUnit.test("I should test the basicView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
