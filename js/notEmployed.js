app.service('notEmployedService',function (MainService) {
    this.downloadNotEmployedStaff = function(){
        let staffMap = MainService.downloadUserOfLocalStorage();
        let notEmployedStaff = [];
        for (let staff of staffMap.values()){
            if(staff.isArranged === false){
                notEmployedStaff.push(staff)
            }
        }
        return notEmployedStaff
    };

    this.arrangeService = function(name){
        let staffList = MainService.downloadUserOfLocalStorage();
        // console.log(staffList);
        for(let staff of staffList.values()){
            if(staff.name === name){
                staff.isArranged = true;
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
                staffList.delete(name);
                // console.log(staffList);
                MainService.saveUserInLocalStorage(staffList);
                break
            }
        }
    }
});

app.controller('notEmployedCtrl', function($scope, notEmployedService){

    $scope.updateNotEmployedStaff = function(){
        $scope.notEmployedStaff = notEmployedService.downloadNotEmployedStaff();
    };
    $scope.notEmployedStaff = notEmployedService.downloadNotEmployedStaff();
    // console.log($scope.notEmployedStaff);

    $scope.arrange = function(name){
        // console.log(name);
        notEmployedService.arrangeService(name);
        $scope.updateNotEmployedStaff();
    };

    $scope.deleteStaff = function(name){
        notEmployedService.deleteStaffService(name);
        $scope.updateNotEmployedStaff();
    }
});