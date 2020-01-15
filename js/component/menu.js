app.component('menu', {
    templateUrl:'templates/components/menu.html',
    controller: function(MainService, DepartmentService){

        this.isLogin = function(){
            return MainService.isLogin();
        };

        this.isAdmin = function(){
            return MainService.isAdmin();
        };

        this.isAccountant = function(){
            if(JSON.parse(localStorage.getItem('loginUser')) === null || JSON.parse(localStorage.getItem('loginUser')).department === null){
                return false
            } else if(this.isAdmin() || DepartmentService.isAccountant(JSON.parse(localStorage.getItem('loginUser')).department.name)){
                return true
            }
        };

        this.logout = function(){
            MainService.logout();
        }
    }
});