app.service('employedService',function (MainService) {
    this.downloadEmployedStaff = function(){
        let staffMap = MainService.downloadUserOfLocalStorage();
        let employedStaff = [];
        for (let staff of staffMap.values()){
            if(staff.isArranged === true){
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
                staff.isArranged = false;
                break
            }
        }
        MainService.saveUserInLocalStorage(staffList);
    };

});

app.controller('employedCtrl', function($scope, employedService){

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