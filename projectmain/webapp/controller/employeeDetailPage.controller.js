sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (BaseController) => {
    "use strict";
 
    return BaseController.extend("projectmain.controller.employeeDetailPage", {
        onInit() {
          var employeeModel = new sap.ui.model.json.JSONModel("model/employeeList.json");
          employeeModel.attachRequestCompleted(() => {
            this.getView().setModel(employeeModel);
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("employeeDetail")
              .attachPatternMatched(this._objPatternMatched, this);
              // this._objPatternMatched();
        })},
        _objPatternMatched:function(oEvent){
          var passedEmployeeIndex = oEvent.getParameter("arguments").employeeIndex; 
          var employeeDetailModel = new sap.ui.model.json.JSONModel(this.getView().getModel().oData.employees[passedEmployeeIndex]);
          this.getView().setModel(employeeDetailModel,"employeeDetailModel");
        },
        onNavButtonPress(){
          var NavBack = sap.ui.core.UIComponent.getRouterFor(this);
          NavBack.navTo("TableView");
        }
        
    });
  });