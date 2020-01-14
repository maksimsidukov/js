app.component('instanceEmployee',{
    templateUrl: 'templates/components/instanceEmployee.html',
    bindings:{
        staff:'=',
        departments:'=',
        onUpdate:'&',
        isArrange:'='
    },
    controller: function(StaffService){


        this.changeDepartment = function(staffName, departmentName){
            if(departmentName !== undefined){
                StaffService.arrangeEmployee(staffName, departmentName);
                this.onUpdate();
            }
        };

        this.dismissEmployee = function(name){
            StaffService.dismissEmployee(name);
            this.onUpdate();
        };

        this.deleteEmployee = function(name){
            StaffService.deleteEmployee(name);
            this.onUpdate();
        };

    }
});