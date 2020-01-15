app.component('login', {
    templateUrl:'templates/components/login.html',
    controller: function(MainService){

        this.login = function(){
            MainService.login(this.userLogin, this.userPassword)
        }
    }
});