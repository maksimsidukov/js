app.service('MainService', function($state){
    this.saveUserInLocalStorage = function(map){
        localStorage.setItem('StaffList', JSON.stringify([...map]))
    };

    this.downloadUserOfLocalStorage = function(){
        let map;
        if(localStorage.getItem('StaffList') === null){
            map = new Map([["admin",{"name":"admin","login":"admin","password":"admin","isAdmin":true}]]);
        } else {
            map = new Map(JSON.parse(localStorage.getItem('StaffList')));
        }
        return map;
    };

    this.saveDepartmentsInLocalStorage = function(map){
        localStorage.setItem('DepartmentsList', JSON.stringify([...map]))
    };

    this.downloadDepartmentsOfLocalStorage = function(){
        let map;
        if(localStorage.getItem('DepartmentsList') === null){
            map = new Map();
        } else {
            map = new Map(JSON.parse(localStorage.getItem('DepartmentsList')));
        }
        return map;
    };

    this.logout = function () {
        localStorage.setItem('loginUser', null);
        $state.go('login')

    };

    this.login = function (login, password) {
        let staffMap = this.downloadUserOfLocalStorage();
        if(staffMap.has(login)){
            if(staffMap.get(login).password === password){
                localStorage.setItem('loginUser', JSON.stringify(staffMap.get(login)));
                if(JSON.parse(localStorage.getItem('loginUser')).isAdmin){
                    $state.go('adminDashboard');
                } else {
                    $state.go('dashboard');
                }
            }
        } else {
            return false
        }
    };

    this.isLogin = function() {
        if (JSON.parse(localStorage.getItem('loginUser')) !== null) {
            return true
        }
    };

    this.isAdmin = function(){
        if(this.isLogin()){
            if(JSON.parse(localStorage.getItem('loginUser')).isAdmin){
                return true
            } else {
                return false
            }
        }
    };
});