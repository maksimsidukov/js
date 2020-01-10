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
            console.log('Имя не введено');
            return
        }else if($scope.login === undefined){
            console.log('Логин не введен');
            return
        }if($scope.password === undefined){
            console.log('Пароль не введен');
            return
        }

        RegistrationService.registrationStaff($scope.login,{name: $scope.name,login: $scope.login, password: $scope.password, isArranged: false});

        $scope.name = '';
        $scope.login = '';
        $scope.password = '';
    }
});