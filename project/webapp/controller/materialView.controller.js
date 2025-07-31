sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("project.controller.materialView", {
        onInit() {
        },
        onAfterRendering(){
            var that = this;
            this.getOwnerComponent().getModel().read("/Products",{
                filters:[new sap.ui.model.Filter("ProductName","Contains","Chai")],
                success:function(oData, results) {
                    var productModel= new sap.ui.model.json.JSONModel(oData);
                    that.getView().setModel(productModel, "productModel")
                },
                error:function(error){
                    MessageBox.error(JSON.parse(error.responseText).error.message.value)
                }
            });
        },
        onSearchProducts:function(evt){
            var searchString =evt.getParameter("value");
            var filters = new sap.ui.model.Filter("ProductName","Contains",searchString);
            this.getView().byId("productTableId").getBinding("items").filter(filters);
        },
        onDynamicSort(){
            if (!this.loadSort) {
            this.loadSort = new sap.ui.xmlfragment("project.view.sortDialog",this);
            this.getView().addDependent(this.loadSort);
            }
            this.loadSort.open();
        },
        onSortCancel(){
            this.loadSort.close();
        },
        
        onSortConfirm(){
            var getSelectedField = sap.ui.getCore().byId("sortFieldSelect").getSelectedKey();
            var getAscSelected = sap.ui.getCore().byId("rbAscending").getSelected();

            var setSort = new sap.ui.model.Sorter(getSelectedField, !getAscSelected);
            this.getView().byId("productTableId").getBinding("items").sort(setSort);
            this.loadSort.close();
        },
    });
});