app.service('StaffService',function (MainService, DepartmentService) {

    this.downloadEmployedStaff = function(){
        let staffMap = MainService.downloadUserOfLocalStorage();
        let employedStaff = [];
        for (let staff of staffMap.values()){
            if(staff.name === 'admin'){
                continue
            }
            if(staff.department !== null){
                employedStaff.push(staff)
            }
        }
        return employedStaff
    };

    this.downloadNotEmployedStaff = function(){
        let staffMap = MainService.downloadUserOfLocalStorage();
        let notEmployedStaff = [];
        for (let staff of staffMap.values()){
            if(staff.department === null){
                notEmployedStaff.push(staff)
            }
        }
        return notEmployedStaff
    };

    this.arrangeEmployee = function(staffName, departmentName){
        let staffList = MainService.downloadUserOfLocalStorage();
        // console.log(staffList);
        for(let staff of staffList.values()){
            if(staff.name === staffName){
                staff.department = {name:departmentName, salary: DepartmentService.discoverSalary(departmentName)};
                break
            }
        }
        MainService.saveUserInLocalStorage(staffList);
    };

    this.dismissEmployee = function(name){
        let staffList = MainService.downloadUserOfLocalStorage();
        for(let staff of staffList.values()){
            if(staff.name === name){
                staff.department = null;
                break
            }
        }
        MainService.saveUserInLocalStorage(staffList);
    };

    this.deleteEmployee = function(name){
        let staffList = MainService.downloadUserOfLocalStorage();
        for(let staff of staffList.values()){
            if(staff.name === name){
                staffList.delete(staff.login);
                MainService.saveUserInLocalStorage(staffList);
                break
            }
        }
    };

    this.downloadDepartmentsList = function(){
        let departmentsMap = MainService.downloadDepartmentsOfLocalStorage();
        let departmentsList = [];
        for (let department of departmentsMap.values()){
            departmentsList.push(department.name)
        }
        return departmentsList;
    };

});