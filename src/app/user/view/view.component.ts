import { User } from '../user';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
    id!: number;
    user!: User;
     
    /*------------------------------------------
    --------------------------------------------
    Created constructor
    --------------------------------------------
    --------------------------------------------*/
    constructor(
        public userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['userId'];
         
    this.userService.find(this.id).subscribe((data: User)=>{
        this.user = data;
    });
  }
}
