/*global QUnit*/

sap.ui.define([
	"project/controller/materialView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("materialView Controller");

	QUnit.test("I should test the materialView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
