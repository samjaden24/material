sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("demo.fiori.demoproject.controller.DemoView", {
        onInit() {
            var taskPath = sap.ui.require.toUrl("demo/fiori/demoproject/model/tasksData.json")
            var taskModel = new sap.ui.model.json.JSONModel(taskPath);
            this.getView().setModel(taskModel);
            if (!this.createTaskDialog) {
                this.createTaskDialog = new sap.ui.xmlfragment("demo.fiori.demoproject.view.newTask", this);
                this.getView().addDependent(this.createTaskDialog);
            }
        },
        //Sorting Button
        onTaskSort: function () {
            if (!this.sortDialog) {
                this.sortDialog = new sap.ui.xmlfragment("demo.fiori.demoproject.view.sortDialog", this);
                this.getView().addDependent(this.sortDialog);
            }
            this.sortDialog.open();
        },
        onSortCancel: function () {
            this.sortDialog.close();
        },
        onSortConfirm: function () {
            var asc = sap.ui.getCore().byId("rbAscending").getSelected();
            var desc = sap.ui.getCore().byId("rbDescending").getSelected();

            if (asc) {
                var ascSorter = new sap.ui.model.Sorter("taskId", false);
                this.getView().byId("taskList").getBinding("items").sort(ascSorter);
            } else if (desc) {
                var descSorter = new sap.ui.model.Sorter("taskId", true);
                this.getView().byId("taskList").getBinding("items").sort(descSorter);
            }
            this.sortDialog.close();
        },
        //Create Button
        onTaskCreate() {
            var newTask = {
                "taskId": "T"+String(this.getView().getModel().oData.tasks.length + 1).padStart(3,"0"),
                "taskName": "",
                "description": "",
                "status": "",
                "criticality": ""
            }
            var taskObj = new sap.ui.model.json.JSONModel(newTask);
            this.getView().setModel(taskObj, "taskObjModel");
            this.createTaskDialog.open();
        },
        onCancelTask() {
            this.createTaskDialog.close();
        },
        onSaveTask(){
            this.getView().getModel().oData.tasks.push(this.getView().getModel("taskObjModel").oData);
            this.getView().getModel().updateBindings(true);
            this.createTaskDialog.close();
        },
        //Delete Button
        onTaskDelete:function(){
            if (!this.getView().byId("taskList").getSelectedItem()) {
                sap.m.MessageToast.show("Select any Task to Delete!")
            }else{
                if (!this.openDelDialog) {
                    this.openDelDialog = sap.ui.xmlfragment("demo.fiori.demoproject.view.deleteDialog",this);
                    this.getView().addDependent(this.openDelDialog);
                }
                this.openDelDialog.open();   
            }
        },
        onDeleteConfirm(){
            var selTableRow = this.getView().byId("taskList").getSelectedItem().getBindingContext().getPath().split("/")[2];
            var selTabId = this.getView().byId("taskList").getSelectedItem().getBindingContext().getObject().taskId;
            this.getView().getModel().oData.tasks.splice(selTableRow,1);
            this.getView().getModel().updateBindings(true);
            this.openDelDialog.close();
            var message = "Task "+ selTabId +" Deleted";
            sap.m.MessageToast.show(message);
        },
        onDeleteCancel(){
            this.openDelDialog.close();
        },
        //Search Field
        onSearchChange:function(evt){
            var searchParameter = evt.getParameter("newValue");
            // var mulTabSearch = [];
            if (searchParameter) {
                //each filter for each field
                var nameFilter = new sap.ui.model.Filter("taskName","Contains",searchParameter);
                var statusFilter = new sap.ui.model.Filter("status","Contains",searchParameter);
                var descFilter = new sap.ui.model.Filter("description","Contains",searchParameter);

                var combinedFilter = new sap.ui.model.Filter([nameFilter, statusFilter, descFilter], false);
                // mulTabSearch.push(combinedFilter);
                this.getView().byId("taskList").getBinding("items").filter([combinedFilter]);
            }else{
                this.getView().byId("taskList").getBinding("items").filter([]);
            }   
        },
        getCriticality:function(pCriticality){
            switch (pCriticality) {
                case "High":
                    return "Error";
                case "Medium":
                    return "Warning";
                case "Low":
                    return "Success";
                default:
                    return "None";
            }
        }
    });
});