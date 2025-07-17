sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("fiori.main.projectmain.controller.ListView", {
        onInit() {
            var employeeModel = new sap.ui.model.json.JSONModel("model/employeeList.json");
            this.getView().setModel(employeeModel);
        },
        onLiveChange : function (evt) {
            var searchEmp = evt.getParameter("value");
            var filters = new sap.ui.model.Filter("name","Contains",searchEmp);
            this.getView().byId("ListId").getBinding("items").filter(filters);
        },   
        onNavTabView() {
            var oTableRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oTableRouter.navTo("TableView");
        }
        // ,
        // onSort:function(){
        //    this.sorter = !this.sorter;
        //    var Sorting = sap.ui.
        // }
    });
});