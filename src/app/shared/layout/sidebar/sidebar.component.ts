import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
// import MENUS from '../../../../assets/menu.json';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  implements OnInit{
  private MENUS = {
    "0":[
      {
        "label":"Home",
        "route": "/home",
        "icon": "home",
        "child": []
      },
    ]
  }
  mainmenu : any = [];
  @Output() sidenav : EventEmitter<any> = new EventEmitter();
  @Input() open : boolean= false;
  o : boolean = this.open;
  user : string ='';

  constructor() { }

  ngOnInit(): void {

    this.mainmenu = this.MENUS[0];
    console.log(this.mainmenu);

    //this.user = this.authService.currentUser.full_name
  }
  toggleSidebar(){
    if (window.innerWidth < 960){
      this.sidenav.emit();
    }
  }


  // mobileQuery: MediaQueryList;

  // private _mobileQueryListener: () => void;

  // constructor(
  //   changeDetectorRef: ChangeDetectorRef,
  //   media: MediaMatcher,
  //   public Auth: AuthService,
  //   public menuItems: MenuItems,
  //   private menuservice: MenuService,
  //   private router: Router,
  //   // private authService: AuthService
  // ) {
  //   this.mobileQuery = media.matchMedia('(min-width: 768px)');
  //   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  //   this.mobileQuery.addListener(this._mobileQueryListener);
  // }
  // public mainmenu: any = [];
  // public usermenu: any = [];
  // public childmenu: any = [];
  // public show: Boolean = false;
  // public department_code: any;
  // public district_name: any;
  // public subdistrict_name: any;

  // public username: any;
  // public user_id: any;
  // public role: any;
  // public separator_name: any = [];
  // usertype: any;
  // data: any;


  // ngOnInit1() {
  //   const user = this.Auth.currentUser;

  //   // this.district_name = user.district_name;
  //   // this.subdistrict_name = user.subdistrict_name;
  //   // this.department_code = user.department_code;
  //   this.username = user.username;
  //   // this.user_id = user.userid;
  //   this.role = user.role;
  //   // this.usertype = this.authService.currentUser.usertype;

  //   if (this.role === 1) {
  //     this.separator_name[0] = ['Admin', 1];
  //   } else if (this.role === 2) {
  //     this.separator_name[0] = ['JDA', 2];
  //   } else if (this.role === 3) {
  //     this.separator_name[0] = ['DDA', 3];
  //   } else if (this.role === 4) {
  //     this.separator_name[0] = ['lokayog', 4];
  //   }
  //   this.loadMenuByUser();
  // }

  // loadMenuByUser() {
  //   this.menuservice.getMainmenuByUserType(this.role).subscribe(res => {
  //     this.mainmenu = res;
  //   });
  // }
  // getNext(MenuCode: any, Route: any) {
  //   this.router.routeReuseStrategy.shouldReuseRoute = function () {
  //     return false;
  //   };
  //   this.router.events.subscribe((evt) => {
  //     if (evt instanceof NavigationEnd) {
  //       // trick the Router into believing it's last link wasn't previously loaded
  //       this.router.navigated = false;
  //       // if you need to scroll back to top, here is the right place
  //       window.scrollTo(0, 0);
  //     }
  //   });
  //   if (Route != null) {
  //     this.childmenu = [];
  //     this.router.navigate(['/' + Route]);
  //   } else {
  //     this.menuservice.getChildmenu(MenuCode, this.role).subscribe(res => {
  //       this.childmenu = res;
  //     });
  //     this.toggle();
  //   }
  // }
  // toggle() {
  //   this.show = !this.show;
  // }

  // ngOnDestroy(): void {
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }
}
