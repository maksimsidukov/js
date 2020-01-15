app.component("dashboard", {
    templateUrl:'templates/components/dashboard.html',
    controller: function(){

        this.user = JSON.parse(localStorage.getItem("loginUser"));

        if(this.user.department === null){
            this.isArrange = false;
        } else {
            this.isArrange = true;
        }
    }
});