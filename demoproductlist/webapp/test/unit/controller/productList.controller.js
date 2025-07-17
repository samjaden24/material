/*global QUnit*/

sap.ui.define([
	"demo/fiori/demoproductlist/controller/productList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("productList Controller");

	QUnit.test("I should test the productList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
