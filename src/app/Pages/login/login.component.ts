import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PerformancemanagementService } from '../Services/performancemanagement.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  roleId: any;
  userName: any;
  passWord: any;
  loginName: any;
  showpassword: any;
  result: any;
  admin:any;

  loader: any;
  constructor(private PerformanceManagementService: PerformancemanagementService ,public router: Router) { }

  ngOnInit(): void {
    this.admin="Admin"
    this.showpassword=0;
  }

  public getroleid(event: any) {
    this.roleId = event.target.value;

  }

  Showhidepassword() {
    debugger
    if (this.showpassword == 0) {
      this.showpassword = 1;
    }
    else {
      this.showpassword = 0;
    }
  }


  login() {
    debugger
    if (this.roleId == 1) {
      let adminCopy = this.admin.toLowerCase();
      if (this.userName.toLowerCase().includes(adminCopy)  && this.passWord == 'welcome') {
        sessionStorage.setItem("temp", '1');
        sessionStorage.setItem("roleid", this.roleId);
        sessionStorage.setItem("loginName", this.admin);
        this.router.navigate(['/hr/AppraisalCycle']).then(() => {
          this.loader = false;
          location.reload();

        });

        // location.href = "#/hr/AppraisalCycle";
        // location.reload();
      }
      else {
        Swal.fire("Incorrect Username or Password")
      }
    }
    else if (this.roleId == 2) {
      this.PerformanceManagementService.GetMyDetails().subscribe(async data => {
        console.log("data", data);
        let userNameCopy = this.userName.toLowerCase();
        let password = this.userName.toLowerCase();
        let temp: any = data.filter(x => (x.emailID.toLowerCase().includes(userNameCopy)  || x.phoneNo == this.userName) && x.password == this.passWord );
        this.result = temp[0];
        // this.loader = true;
        if (this.result != undefined || this.result != null) {
          sessionStorage.setItem("temp", '1');
          sessionStorage.setItem("roleid", this.roleId);
          sessionStorage.setItem("loginName", this.result.name);
          sessionStorage.setItem("EmaployedID", this.result.id);
          sessionStorage.setItem("Type", this.result.type);
          this.router.navigate(['/hr/MyAppraisal']).then(() => {
            this.loader = false;
            location.reload();

          });

          // location.href = "#/hr/MyAppraisal";
          // location.reload();
        }
        else {
          Swal.fire("Incorrect Username or Password")
          this.userName = "";
          this.passWord = "";
        }
      })
    }

    else if (this.roleId == '4') {
      this.PerformanceManagementService.GetMyDetails().subscribe(data => {
        console.log("data", data);
        let userNameCopy = this.userName.toLowerCase();
        let temp: any = data.filter(x => (x.emailID.toLowerCase().includes(userNameCopy)  || x.phoneNo == this.userName) && x.password == this.passWord && x.role=='Manager');
        this.result = temp[0];
        debugger;
        // this.loader = true;
        if (this.result != undefined || this.result != null) {
          sessionStorage.setItem("temp", '1');
          sessionStorage.setItem("roleid", this.roleId);
          sessionStorage.setItem("loginName", this.result.name);
          sessionStorage.setItem("EmaployedID", this.result.id);
          sessionStorage.setItem("Type", this.result.type);
          this.router.navigate(['/manager/ManagerDashboard']).then(() => {
            this.loader = false;
            location.reload();

          });

          // location.href = "#/manager/ManagerDashboard";
          // location.reload();
        }
        else {
          Swal.fire("Incorrect Username or Password")
          this.userName = "";
          this.passWord = "";
        }
      })
    }

    else if (this.roleId == 5) {
      this.PerformanceManagementService.GetMyDetails().subscribe(async data => {
        console.log("data", data);
        let userNameCopy = this.userName.toLowerCase();
        let password = this.userName.toLowerCase();
        let temp: any = data.filter(x => (x.emailID.toLowerCase().includes(userNameCopy)  || x.phoneNo == this.userName) && x.password == this.passWord );
        this.result = temp[0];
        // this.loader = true;
        if (this.result != undefined || this.result != null) {
          sessionStorage.setItem("temp", '1');
          sessionStorage.setItem("roleid", this.roleId);
          sessionStorage.setItem("loginName", this.result.name);
          sessionStorage.setItem("EmaployedID", this.result.id);
          sessionStorage.setItem("Type", this.result.type);
          this.router.navigate(['/manager/ManagerDashboard']).then(() => { 
            this.loader = false;
            location.reload();
          });

      //    location.href = "#/manager/ManagerDashboard";
      //    location.reload();
        }
        else {
          Swal.fire("Incorrect Username or Password")
          this.userName = "";
          this.passWord = "";
        }
      })
    }


    else if (this.roleId == '3') {
      debugger
      this.PerformanceManagementService.GetMyDetails().subscribe(data => {
        console.log("data", data);
        let userNameCopy = this.userName.toLowerCase();
        let temp: any = data.filter(x => (x.emailID.toLowerCase().includes(userNameCopy)  || x.phoneNo == this.userName) && x.password == this.passWord && x.type==9);
        this.result = temp[0];
        debugger;
        // this.loader = true;
        if (this.result != undefined || this.result != null) {
          sessionStorage.setItem("temp", '1');
          sessionStorage.setItem("roleid", this.roleId);
          sessionStorage.setItem("loginName", this.result.name);
          sessionStorage.setItem("EmaployedID", this.result.id);
          sessionStorage.setItem("Type", this.result.type);
          this.router.navigate(['/hr/HrDashboard']).then(() => {
            this.loader = false;
            location.reload();
          });

          
         // location.href = "#/hr/HrDashboard";
        //  location.reload();
        }
        else {
          Swal.fire("Incorrect Username or Password")
          this.userName = "";
          this.passWord = "";
        }

      })
    }
  }
}







