import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
//import { DailogComponent } from 'src/app/lokayogdashboard/dailog/dailog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
// import Swal from 'sweetalert2';
// import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {

  @Output() isShowSidebar = new EventEmitter<boolean>();
  @Input() isMenuOpened: boolean = false;
  // constructor(private router: Router, private dailog: MatDialog, private cms: CommonService) {}

  //swalConstant = this.cms.swalWithBootstrapButtons;

  ngOnInit(): void { }

  public openMenu() {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

   logout() {
  //   this.swalConstant.fire({
  //     title: "लॉग ऑउट करें ?",
  //     showCancelButton: true,
  //     confirmButtonText: '<i class="fa fa-check-circle"></i> हाँ',
  //     cancelButtonText: '<i class="fa fa-times-circle"></i> नहीं',
  //     icon: "question",
  //     text: 'सुनिश्चित करें ?',
  //     timer: 4000,
  //     timerProgressBar: true
  //   }).then((result: { isConfirmed: any; }) => {
  //     if (result.isConfirmed) {
  //      // this.authService.logout();
  //     }
  //   });
   }

   updatePassword() {
  //   const matDialogConfig = new MatDialogConfig();
  //   matDialogConfig.disableClose = true;
  //   matDialogConfig.data = { showUpdatePassword: true, usr_id: this.usr_id }

  //   let dailogRef = this.dailog.open(DailogComponent, matDialogConfig);
  //   dailogRef.afterClosed().subscribe((res: any) => {

  //     const data = res;
  //     if (data) {
  //       if (data.newPassword == data.rePassword) {
  //         this.swalConstant.fire({
  //           title: "आप अपना पासवर्ड बदलना चाहते हैं ?",
  //           showCancelButton: true,
  //           confirmButtonText: '<i class="fa fa-check-circle"></i> हाँ',
  //           cancelButtonText: '<i class="fa fa-times-circle"></i> नहीं',
  //           icon: "question",
  //           text: 'सुनिश्चित करें ?',
  //           timer: 4000,
  //           timerProgressBar: true
  //         }).then((result) => {
  //           if (result.isConfirmed) {

  //             var uid = CryptoJS.AES.encrypt(this.usr_id.toString(), environment.pass_update_key);
  //             var cPasword = CryptoJS.AES.encrypt(data.currentPassword, environment.pass_update_key);
  //             var nPassword = CryptoJS.AES.encrypt(data.newPassword, environment.pass_update_key);
  //             var to_send = { currentPassword: `${cPasword}`, newPassword: `${nPassword}`, usr_id: `${uid}` };

  //             this.authService.updatePassword(to_send).subscribe((res: any) => {
  //               if (res.success) {
  //                 if (res.data.changedRows == 1) {
  //                   this.swalConstant.fire({
  //                     title: "आपका पासवर्ड सफलता पूर्वक परिवर्तित हो चुका हैं।",
  //                     confirmButtonText: '<i class="fa fa-check-circle"></i> OK',
  //                     icon: "success",
  //                   });
  //                 }
  //               }
  //               else {
  //                 if (res.data.errno) {
  //                   this.swalConstant.fire({
  //                     iconHtml: '<i class="fa fa-database"></i>',
  //                     title: 'Error',
  //                     confirmButtonText: '<i class="fa fa-meh-o"></i> OK',
  //                     text: res.data.sqlMessage
  //                   });
  //                 }
  //                 else {
  //                   this.swalConstant.fire({
  //                     title: "आपका वर्तमान पासवर्ड गलत है।",
  //                     confirmButtonText: '<i class="fa fa-check-circle"></i> OK',
  //                     icon: "info",
  //                     text: 'कृपया सही पासवर्ड दर्ज़ करें।'
  //                   });
  //                 }
  //               }
  //             });
  //           }
  //         })

  //       }
  //     }
  //   })
   }
}
