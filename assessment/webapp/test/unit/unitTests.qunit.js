/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"demo/assessment/assessment/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
