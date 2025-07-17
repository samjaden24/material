sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("demo.fiori.demoproductlist.controller.productList", {
        onInit() {
            var sProductPath = sap.ui.require.toUrl("demo/fiori/demoproductlist/model/product.json");
            var oProductModel = new sap.ui.model.json.JSONModel(sProductPath);
            this.getView().setModel(oProductModel, "products");
           
            var sEmployeePath = sap.ui.require.toUrl("demo/fiori/demoproductlist/model/employeeList.json");
            var oEmployeeModel = new sap.ui.model.json.JSONModel(sEmployeePath);
            this.getView().setModel(oEmployeeModel, "employees");
        },
        onSearchProducts : function(evt){
            var searchProd = evt.getParameter("newValue");
            var filters = new sap.ui.model.Filter("ProductName","Contains",searchProd);
            this.getView().byId("tabId").getBinding("items").filter(filters);
        },
        onChange : function(evt){
            var searchProd = evt.getParameter("value");
            var filters = new sap.ui.model.Filter("Location","Contains",searchProd);
            this.getView().byId("tabId").getBinding("items").filter(filters);
        }
    });
});