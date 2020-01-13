app.service('employedService',function (MainService) {
    this.downloadEmployedStaff = function(){
        let staffMap = MainService.downloadUserOfLocalStorage();
        let employedStaff = [];
        for (let staff of staffMap.values()){
            if(staff.name === 'admin'){
                continue
            }
            if(staff.department !== null){
                employedStaff.push(staff)
            }
        }
        return employedStaff
    };

    this.notArrangeService = function(name){
        let staffList = MainService.downloadUserOfLocalStorage();
        // console.log(staffList);
        for(let staff of staffList.values()){
            if(staff.name === name){
                staff.department = null;
                break
            }
        }
        MainService.saveUserInLocalStorage(staffList);
    };

});

app.controller('employedCtrl', function($scope, employedService, notEmployedService){

    $scope.departments = notEmployedService.downloadDepartmentsList();

    $scope.changeDepartment = function(staffName, departmentName){
        if(departmentName === undefined){
            return
        }
        notEmployedService.arrangeService(staffName, departmentName);
        $scope.updateEmployedStaff();
    };

    $scope.updateEmployedStaff = function(){
        $scope.employedStaff = employedService.downloadEmployedStaff();
    };
    $scope.employedStaff = employedService.downloadEmployedStaff();
    // console.log($scope.employedStaff);

    $scope.notArrange = function(name){
        // console.log(name);
        employedService.notArrangeService(name);
        $scope.updateEmployedStaff();
    }
});