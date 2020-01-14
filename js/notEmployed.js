app.service('notEmployedService',function (MainService, DepartmentService) {
    this.downloadNotEmployedStaff = function(){
        let staffMap = MainService.downloadUserOfLocalStorage();
        let notEmployedStaff = [];
        for (let staff of staffMap.values()){
            if(staff.department === null){
                notEmployedStaff.push(staff)
            }
        }
        return notEmployedStaff
    };

    this.arrangeService = function(staffName, departmentName){
        let staffList = MainService.downloadUserOfLocalStorage();
        // console.log(staffList);
        for(let staff of staffList.values()){
            if(staff.name === staffName){
                staff.department = {name:departmentName, salary: DepartmentService.discoverSalary(departmentName)};
                break
            }
        }
        MainService.saveUserInLocalStorage(staffList);
    };

    this.deleteStaffService = function(name){
        // console.log('deleteStaffService func');
        let staffList = MainService.downloadUserOfLocalStorage();
        for(let staff of staffList.values()){
            if(staff.name === name){
                // console.log(staffList);
                staffList.delete(staff.login);
                // console.log(staffList);
                MainService.saveUserInLocalStorage(staffList);
                break
            }
        }
    };

    this.downloadDepartmentsList = function(){
        let departmentsMap = MainService.downloadDepartmentsOfLocalStorage();
        let departmentsList = [];
        for (let department of departmentsMap.values()){
            departmentsList.push(department.name)
        }
        return departmentsList;
    }
});

app.controller('notEmployedCtrl', function($scope, notEmployedService){

    $scope.departments = notEmployedService.downloadDepartmentsList();
    // console.log($scope.departments);

    $scope.updateNotEmployedStaff = function(){
        $scope.notEmployedStaff = notEmployedService.downloadNotEmployedStaff();
    };
    $scope.notEmployedStaff = notEmployedService.downloadNotEmployedStaff();
    // console.log($scope.notEmployedStaff);

    $scope.arrange = function(staffName, departmentName){
        if(departmentName === undefined){
            return
        }
        notEmployedService.arrangeService(staffName, departmentName);
        $scope.updateNotEmployedStaff();
    };

    $scope.deleteStaff = function(name){
        notEmployedService.deleteStaffService(name);
        $scope.updateNotEmployedStaff();
    }
});