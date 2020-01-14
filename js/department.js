app.service('DepartmentService', function(MainService){

    this.addDepartment = function(name, obj){
        let departmentsList = MainService.downloadDepartmentsOfLocalStorage();
        departmentsList.set(name, obj);
        MainService.saveDepartmentsInLocalStorage(departmentsList);
    };

    this.downloadDepartments = function(){
        let departments =  MainService.downloadDepartmentsOfLocalStorage();
        let departmentsArray = [];
        for (let department of departments.values()){
            departmentsArray.push(department)
        }
        return departmentsArray
    };

    this.discoverSalary = function(departmentName){
        let departments =  MainService.downloadDepartmentsOfLocalStorage();
        let department = departments.get(departmentName);
        return department.salary
    };

    this.deleteDepartment = function(name){
        let departmentsList = MainService.downloadDepartmentsOfLocalStorage();
        departmentsList.delete(name);
        MainService.saveDepartmentsInLocalStorage(departmentsList);
    };

    this.isAccountant = function(departmentName){
        let departmentList = this.downloadDepartments();
        departmentList.forEach(function (item) {
            if(item.name === departmentName && item.type === 'Финансы'){
                    return true;
            }
        })
    }
});


app.controller('departmentCtrl', function($scope, DepartmentService){

    $scope.updateDepartmentList = function(){
        $scope.departments = DepartmentService.downloadDepartments();
    };

    $scope.addDepartment = function(){


        DepartmentService.addDepartment($scope.departmentName, {name: $scope.departmentName, salary: $scope.departmentSalary, type: $scope.departmentType});

        $scope.departmentName = '';
        $scope.departmentSalary = '';
        $scope.departmentType = undefined;

        $scope.updateDepartmentList();
    };

    $scope.deleteDepartment = function(name){
        DepartmentService.deleteDepartment(name);
        $scope.updateDepartmentList();
    };

    $scope.departmentsTypes = ["Кухня", "Финансы", "Управление", "Уборка"];

    $scope.departments = DepartmentService.downloadDepartments();

    console.log($scope.departments);
});