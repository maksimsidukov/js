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
        return departments.get(departmentName).salary
    };

    this.deleteDepartment = function(name){
        let departmentsList = MainService.downloadDepartmentsOfLocalStorage();
        departmentsList.delete(name);
        MainService.saveDepartmentsInLocalStorage(departmentsList);
    };

    this.isAccountant = function(departmentName){
        let departments = MainService.downloadDepartmentsOfLocalStorage();
        if(departments.get(departmentName).type === 'Финансы') {
            return true
        }
    }
});