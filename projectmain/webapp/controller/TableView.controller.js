sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("fiori.main.projectmain.controller.TableView", {
        onInit() {
            var employeeTabModel = new sap.ui.model.json.JSONModel("model/employeeList.json");
            this.getView().setModel(employeeTabModel);

            if(!this.addEmployee){
                this.addEmployee = new sap.ui.xmlfragment("fiori.main.projectmain.view.addEmployee",this);
                this.getView().addDependent(this.addEmployee);
                }
        },
        onLiveChange: function (event) {
            //Single Search Field
            // var empTabModel = event.getParameter("newValue");
            // var filters = new sap.ui.model.Filter("designation","Contains",empTabModel);
            // this.getView().byId("table").getBinding("items").filter(filters);

            //Multiple Search Fields
            var empTabSearch = event.getParameter("newValue");
            // var mulTabSearch = [];

            if (empTabSearch) {
                //Each filters for each searchable field
                // var nameFilter = new sap.ui.model.Filter("name", "Contains", empTabSearch);
                // var designationFilter = new sap.ui.model.Filter("designation", "Contains", empTabSearch);
                // var emailFilter = new sap.ui.model.Filter("email", "Contains", empTabSearch);

                // //Combining them using OR(false= OR, true= AND)
                // var combinedFilter = new sap.ui.model.Filter([nameFilter, designationFilter, emailFilter], false);
                // mulTabSearch.push(combinedFilter);

                //Alter way for multiple filter in a single variable
                var combineFilter = new sap.ui.model.Filter({
                    filters:[new sap.ui.model.Filter("name", "Contains", empTabSearch),
                             new sap.ui.model.Filter("designation", "Contains", empTabSearch),
                             new sap.ui.model.Filter("email", "Contains", empTabSearch)]
                            }, true);
                this.getView().byId("table").getBinding("items").filter(combineFilter);
            }
        },
        onSort: function(){
            this._sortDescending = !this._sortDescending;
            var oSorter = new sap.ui.model.Sorter("name",this._sortDescending);
            this.getView().byId("table").getBinding("items").sort(oSorter);
        },
        onAddEmployee:function(){
            this.mode="ADD";
            var newEmployeeObj = {
                "id": this.getView().getModel().oData.employees.length + 1,
                "name": "",
                "designation": "",
                "department": "",
                "email": ""
            };
            var employeeObj = new sap.ui.model.json.JSONModel(newEmployeeObj);
            this.getView().setModel(employeeObj,"employeeObj");
            this.addEmployee.open();
        }, 
        onSaveEmployee:function(){
            if(this.mode == "ADD"){
            this.getView().getModel().oData.employees.push(this.getView().getModel("employeeObj").oData);
            sap.m.MessageToast.show("New Employee is Added");
            }
            else{ 
                sap.m.MessageToast.show("Employee is Updated");
            }
            this.getView().getModel().updateBindings(true);
            this.addEmployee.close();
        },
        onCancelEmployee:function(){
            this.addEmployee.close();
        },
        onClickSort: function(){
            if (!this.sortDialog) {
                this.sortDialog = new sap.ui.xmlfragment("fiori.main.projectmain.view.sortDialog",this);
                this.getView().addDependent(this.sortDialog);
            }
            this.sortDialog.open();
        },
        onSortCancel: function(){
            this.sortDialog.close();
        },
        onSortConfirm: function(){
            var oAscending = sap.ui.getCore().byId("rbAscending").getSelected();
            var oDescending = sap.ui.getCore().byId("rbDescending").getSelected();
            if (oAscending) {
                var ascSorter = new sap.ui.model.Sorter("name",false);
                this.getView().byId("table").getBinding("items").sort(ascSorter);
            } else if(oDescending) {
                var descSorter = new sap.ui.model.Sorter("name",true);
                this.getView().byId("table").getBinding("items").sort(descSorter);
            }
            this.sortDialog.close();
        },
        onEdit:function(){
            this.mode= "EDIT";
            if (!this.getView().byId("table").getSelectedItem()) {
                sap.m.MessageToast.show("Please select an item to edit!");
                return;
            }
            var getEdit = this.getView().byId("table").getSelectedItem().getBindingContext().getObject();
            var employeeObj = new sap.ui.model.json.JSONModel(getEdit);
            this.getView().setModel(employeeObj, "employeeObj");
            this.addEmployee.open();
        },
        onDelete: function(evt){
            var selectedTableRow = evt.getSource().getBindingContext().getPath().split("/")[2];
            this.getView().getModel().oData.employees.splice(selectedTableRow,1);
            this.getView().getModel().updateBindings(true);
            this.MessageToast.show("Employee Data Deleted");
        },
        onNav(evt){
            var employeeNav = sap.ui.core.UIComponent.getRouterFor(this);
            employeeNav.navTo("employeeDetail",{"employeeIndex":evt.getSource().getBindingContext().getPath().split("/")[2]});
        }
 
    });
});