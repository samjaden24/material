sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";
    return Controller.extend("demo.assessment.assessment.controller.detailList", {
        onInit() {
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RoutedetailList").attachPatternMatched(this._objPatternMatched, this);
        },
        _objPatternMatched:function(oEvent){
            var materialId = oEvent.getParameter("arguments").materialId;
            var matchedMaterial = this.getView().getModel("material").oData;
            for (let index = 0; index < matchedMaterial.length; index++) {
                if (matchedMaterial[index].materialId == materialId) {
                    var matchedMaterialVendors = matchedMaterial[index].vendors;
                }
            };
            var vendorModel = new sap.ui.model.json.JSONModel(matchedMaterialVendors);
            this.getView().byId("idNavVendorsList").setModel(vendorModel,"vendorModel") 
          },
          navToBasic(){
            var getHistory = new sap.ui.core.routing.History.getInstance();
            var previousHash = getHistory.getPreviousHash();

            if (previousHash !== undefined) {
                window.history.go(-1);
            }else{
                var currentRoute = new sap.ui.core.UIComponent.getRouterFor(this);
                currentRoute.navTo("RoutebasicView",true);
                //true opens the page in the same stack does not create another stack
            }
          },
          onChange(evt){
            var searchElement = evt.getParameter("value");
            var filter = new sap.ui.model.Filter("vendorName","Contains",searchElement);
            this.getView().byId("idNavVendorsList").getBinding("items").filter(filter);
          }
    });
});