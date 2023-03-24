import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { CommonService } from '../services/common.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  addUserForm: any;
  subSink = new SubSink;
  isAddNewFormVisible: boolean = false;
  isEditMode: boolean = false;
  totalUser: number = 0;
  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
    // public dialogRef: MatDialogRef<HomeComponent>,
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  initColumns: any[] = [
    { displayName: 'S No', controlName: 'SNo' },
    { displayName: 'User Id', controlName: 'u_id' },
    { displayName: 'First Name', controlName: 'first_name' },
    { displayName: 'Last Name', controlName: 'last_name' },
    { displayName: 'Gender', controlName: 'gender' },
    { displayName: 'Date of Birth', controlName: 'date_of_birth' },
    { displayName: 'Email', controlName: 'email' },
    { displayName: 'Contact', controlName: 'contact' },
    { displayName: 'Action', controlName: 'Action' },
  ];

  columnList1: any[] = this.initColumns.map(col => col.controlName);
  userList: any;

  @ViewChild(MatSort) sort: MatSort | undefined;


  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.commonService.get('common/getFunction/userList').subscribe((res: any) => {
      // console.log(res)
      if (res.success) {
        this.userList = new MatTableDataSource(res.result);
        this.totalUser = res.result.length;
      } else {
        this.userList = new MatTableDataSource([]);
        this.userList.sort = this.sort;
        this.totalUser = 0;
      }

      this.userList.paginator = this.paginator;
      this.userList.sort = this.sort;
    })
  }

  createForm() {
    this.addUserForm = this.formBuilder.group({
      u_id: [,],
      first_name: [, Validators.required],
      last_name: [, Validators.required],
      email: [, [
        Validators.email,
        Validators.required
      ]],
      contact: [, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
      gender: ['Male', Validators.required],
      date_of_birth: [, Validators.required],
      function_name: ['saveUserData']
    });
  }


  isValidInput(fieldName: any): boolean {
    return this.addUserForm.controls[fieldName].invalid && (this.addUserForm.controls[fieldName].dirty || this.addUserForm.controls[fieldName].touched);
  }


  saveUserFormData() {
    // console.log(this.addUserForm.value);
    this.addUserForm.patchValue({
      date_of_birth: moment(this.addUserForm.get('date_of_birth').value).format('YYYY-MM-DD'),
    });
    this.subSink.add(this.commonService.save('common/save', this.addUserForm.value)
      .subscribe((data: any) => {
        // console.log(data);
        if (data.success) {
          Swal.fire({ icon: 'success', title: 'Created!', heightAuto: false }).then((result) => {
            location.reload();
          });
        }
      }
      )
    )
  }

  reset() {
    this.addUserForm.reset();
    this.addUserForm.patchValue({
      function_name: ['saveUserData'],
      gender: 'Male'
    });
  }

  showHideAddNewForm() {
    this.isEditMode = false;
    if (this.isAddNewFormVisible === true) {
      this.isAddNewFormVisible = false;
    } else {
      this.isAddNewFormVisible = true;
      this.createForm();
    }
  }

  applyFilter(event: Event): void {
    this.commonService.filterSearch(event, this.userList)
  }

  editUser(row: any) {
    this.isAddNewFormVisible = true;
    this.isEditMode = true;
    this.addUserForm = this.formBuilder.group({
      u_id: [row['u_id'],],
      first_name: [row['first_name'], Validators.required],
      last_name: [row['last_name'], Validators.required],
      email: [row['email'], [
        Validators.email,
        Validators.required
      ]],
      contact: [row['contact'], Validators.required],
      gender: [row['gender'], Validators.required],
      date_of_birth: [row['date_of_birth'], Validators.required],
      function_name: ['updateUserData']
    });
  }

  deleteUser(u_id: any) {
    // console.log(u_id);
    Swal.fire({
      title: `Is User Deleted?`,
      text: `it Goes to Deleted User List`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, Deleted!`
    }).then(result => {
      if (result.isConfirmed) {
        this.commonService.delete(`common/deleteFunction/deleteSingleUserData/${u_id}`).subscribe((res: any) => {
          if (res.result['affectedRows'] > 0) {
            Swal.fire({ icon: 'success', title: 'Success!', text: 'User data successfully deleted.', heightAuto: false }).then((result) => {
              location.reload();
            });
          } else {
            Swal.fire({ icon: 'error', title: 'Failed!', text: 'Failed to delete, Please try again later.', heightAuto: false }).then((result) => {
              location.reload();
            });
          }
        });
      }
    })

  }



  updateUserFormData() {
    if (this.addUserForm.valid) {
      this.addUserForm.patchValue({
        date_of_birth: moment(this.addUserForm.get('date_of_birth').value).format('YYYY-MM-DD'),
      });
      this.commonService.update('common/update', this.addUserForm.value).subscribe((res: any) => {
        // console.log('res update: ',res);
        if (res.result['affectedRows'] > 0) {
          Swal.fire({ icon: 'success', title: 'Success!', text: 'User Data Successfully updated.', heightAuto: false }).then((result) => {
            location.reload();
          });
        } else {
          Swal.fire({ icon: 'error', title: 'Failed!', text: 'Failed to update, Please try again later.', heightAuto: false }).then((result) => {
            location.reload();
          });
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
