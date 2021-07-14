import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
interface Employee {
  id: number; name: string; department: string; joining_date: string,image:string
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: Employee[];
  private $inputSubject: Subject<string> = new Subject();
  @ViewChild("input") input: ElementRef;
  isSearchName: any;
  filterList: Employee[];
  isAscenName: boolean = false;
  isAscenDate: boolean = false;
  departmentList: any = [];

  constructor(
    public router: Router
  ) { }
  
  ngOnInit(): void {
    this.$inputSubject.pipe(
      map(searchValue => searchValue),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((event) => {
      let keyword = this.input.nativeElement.value.trim();
      if ((keyword && (keyword.length > 2) || keyword == '')) {
        this.isSearchName = keyword;
        this.searchByName();
      }
    })
    this.getEmployeeList();
  }
  //  this method helps to get employee list -----
  getEmployeeList(){
  this.employee = [ 
    {"id": 11,"name": "Ash ABC","department": "Finance","joining_date": "08/10/2016","image":"assets/user_profile/images_1.jpeg"},
    {"id": 12,"name": "John ABC","department": "HR","joining_date": "18/01/2011","image":"assets/user_profile/images.jpeg"},
    { "id": 13, "name": "Zuri ABC", "department": "Operations", "joining_date": "28/11/2019","image":"assets/user_profile/download.jpeg"},
    {"id": 14,  "name": "Vish ABC",  "department": "Development",   "joining_date": "07/07/2017","image":"assets/user_profile/images_1.jpeg"},
    { "id": 15, "name": "Barry ABC",  "department": "Operations", "joining_date": "19/08/2014","image":"assets/user_profile/images.jpeg"},
    {"id": 16,"name": "Ady ABC",  "department": "Finance",  "joining_date": "05/10/2014","image":"assets/user_profile/download.jpeg"}, 
    { "id": 17,"name": "Gare ABC","department": "Development",  "joining_date": "06/04/2014","image":"assets/user_profile/images_1.jpeg"},
    { "id": 18,  "name": "Hola ABC",  "department": "Development",  "joining_date": "08/12/2010","image":"assets/user_profile/images.jpeg"}, 
    {"id": 19,  "name": "Ola ABC",  "department": "HR",  "joining_date": "07/05/2011","image":"assets/user_profile/download.jpeg"},
    { "id": 20,  "name": "Kim ABC",  "department": "Finance",  "joining_date": "20/10/2010","image":"assets/user_profile/images_1.jpeg"}]
    this.filterList = this.employee; 
    this.calculateExperience();
  }
  search(value) {
    this.$inputSubject.next(value.trim());
    this.departmentList = [];
  }
  searchByName(){
      this.filterList = this.employee.filter(data =>
         data.name.toLowerCase().includes(this.isSearchName.toLowerCase())
      )      
    }
    sortByName(isAscen){
      if(isAscen){
      this.employee.sort((item1, item2) => {
        if (item1.name < item2.name) return -1;
        else if (item1.name > item2.name) return 1;
        return 0;
      });
    }
  else {
    this.employee.sort((item1, item2) => {
      if (item1.name > item2.name) return -1;
      else if (item1.name < item2.name) return 1;
      return 0;
    });
  }
}
sortByDate(isAscen){
  if(isAscen){
  this.employee.sort((item1:any, item2:any) => {
    if (item1.date < item2.date) return -1;
    else if (item1.date > item2.date) return 1;
    return 0;
  });
}
else {
this.employee.sort((item1:any, item2:any) => {
  if (item1.date > item2.date) return -1;
  else if (item1.date < item2.date) return 1;
  return 0;
});
}
}
/**  This method helps to calculate employee Experience based on date */
calculateExperience(){
  this.employee.map((value:any)=>{
    var parts =value.joining_date.split('/');
    var diff_ms = Date.now() - new Date(parts[2],parts[1],parts[0]).getTime();
    var age_dt = new Date(diff_ms); 
    value.date = new Date(parts[2],parts[1],parts[0]);// convert date string to date
    value.exp = Math.abs(age_dt.getUTCFullYear() - 1970)
  })  
}
/** get list on above selected filter Experience */
filterExperience(number){
  this.departmentList = [];
  let exp = number.target.value;  
  this.filterList = this.employee.filter((data:any) => data.exp >= exp);
}
/** Calculate count of candidate present in each departmants*/
distingDept(){
  this.filterList = [];
  this.employee.forEach((x)=>{
     if(this.departmentList.some((val)=>{ return val["department"] == x["department"] })){
       this.departmentList.forEach((k)=>{
         if(k["department"] === x["department"]) k["count"]++;
      })
         
     }else{
       let a = {}
       a["department"] = x["department"]
       a["count"] = 1
       this.departmentList.push(a);
     }
  })
}
/** Clear Disting department and call employeelist method */
clear($event){
  $event.stopPropagation();
  this.getEmployeeList();
  this.departmentList = [];

}
/** remove selected department from list */
removeDepartment(e){
  this.departmentList = [];
  let dept = e.target.value;
  this.filterList = this.employee.filter((data:any) => data.department != dept );
}
/** this method is used for going to details page */
gotoDetailsPage(data){
  this.router.navigate(
    [`/employee/${data.id}`],
    { queryParams: data }
  );
}

}
