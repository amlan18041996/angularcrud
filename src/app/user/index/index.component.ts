import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    users: any[] = [];
    links: any;
    paginateNum: any;
  
    constructor(
        public userService: UserService
    ) { }
    
    ngOnInit(): void {
        console.log(this.users);
        this.userService.getAll().subscribe((data: User[])=>{
            this.users = data;
            if(localStorage.getItem('type') === 'add'){
                let item: any = localStorage.getItem('item');
                item = JSON.parse(item);
                this.users.push(item);
                localStorage.removeItem('item');
                localStorage.removeItem('type');
            } else if(localStorage.getItem('type') === 'edit'){
                let item: any = localStorage.getItem('item');
                item = JSON.parse(item);
                this.users = this.users.map(user => {
                    if(user.id === item.id){
                        user.name = item.name;
                        user.email = item.email;
                        user.phone = item.phone;
                        user.website = item.website;
                    }
                    return user;
                });
                localStorage.removeItem('item');
                localStorage.removeItem('type');
            }
            console.log(this.users);
        });
    }
    
    deleteUser(id:number){
        this.userService.delete(id).subscribe(res => {
            this.users = this.users.filter(user => user.id !== id);
            console.log('Post deleted successfully!');
        });
    }
}
