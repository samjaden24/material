sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("demo.assessment.assessment.controller.basicView", {
        onInit() {
            // var materialModel = new sap.ui.model.json.JSONModel("model/material.json");
            // this.getView().setModel(materialModel,"material");
        },
        onItemPress: function (evt) {
            var selectedMaterial = evt.getParameter("listItem").getBindingContext("material").getObject();
            var vendorsOfSelected = selectedMaterial.preferred_vendors;

            var allVendors = this.getView().getModel("material").getProperty("/vendors");

            var filteredVendors = allVendors.filter(vendor=> vendorsOfSelected.includes(vendor.vendor_id));

            var filteredVendorModel = new sap.ui.model.json.JSONModel(filteredVendors);

            this.getView().byId("idVendorsList").setModel(filteredVendorModel, "filteredVendors");
        },
        onNavigation(evt){
            var listRouter = sap.ui.core.UIComponent.getRouterFor(this);
            listRouter.navTo("RoutedetailList",{"materialId" : evt.getSource().getBindingContext("material").getProperty().materialId});
        },
        onChange(evt){
            var searchElement = evt.getParameter("newValue");
            var filter = new sap.ui.model.Filter("materialName","Contains",searchElement);
            this.getView().byId("idMaterialsTable").getBinding("items").filter(filter);
        },
        onDynamicSort(){
            if (!this.loadSort) {
            this.loadSort = new sap.ui.xmlfragment("demo.assessment.assessment.view.sortDialog",this);
            this.getView().addDependent(this.loadSort);
            }
            this.loadSort.open();
        },
        onSortCancel(){
            this.loadSort.close();
        },
        
        onSortConfirm(evt){
            var getSelectedField = sap.ui.getCore().byId("sortFieldSelect").getSelectedKey();
            var getAscSelected = sap.ui.getCore().byId("rbAscending").getSelected();

            var setSort = new sap.ui.model.Sorter(getSelectedField, !getAscSelected);
            this.getView().byId("idMaterialsTable").getBinding("items").sort(setSort);
            this.loadSort.close();
        },
        onActionsPress(event){
            this.byId("actionSheet").openBy(event.getSource());
        },
        onCreatePress(){
            if (!this.createDialog) {
                this.createDialog = new sap.ui.xmlfragment("demo.assessment.assessment.view.actionDialog");
                this.getView().addDependent(this.createDialog);
            }
            this.createDialog.open();
        },
        onCancelMaterial(){
            this.createDialog.close();
        }
    });
});