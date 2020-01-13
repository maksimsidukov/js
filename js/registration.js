app.service('RegistrationService', function(MainService){
    this.registrationStaff = function(name, obj){
        let staffMap = MainService.downloadUserOfLocalStorage();
        // console.log('Функция регистрации');
        staffMap.set(name, obj);
        MainService.saveUserInLocalStorage(staffMap);
        // console.log(staffMap);
        // console.log(`Добавлен сотрудник: ${name}, map = ${staffMap}`)
    };
});

app.controller('registrationCtrl', function($scope, RegistrationService){
    $scope.registration = function () {
        if($scope.name === undefined){
            return
        }else if($scope.login === undefined){
            return
        }if($scope.password === undefined){
            return
        }

        RegistrationService.registrationStaff($scope.login,{name: $scope.name,login: $scope.login, password: $scope.password, department: null});

        $scope.name = '';
        $scope.login = '';
        $scope.password = '';
    }
});