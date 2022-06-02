import { User } from '../user';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    id!: number;
    user!: User;
    form!: FormGroup;
       
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
            
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
            website: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
        });
    }
       
    /**
     * Write code on Method
     *
     * @return response()
     */
    get f(){
        return this.form.controls;
    }
       
    /**
     * Write code on Method
     *
     * @return response()
     */
    submit(){
        console.log(this.form.value);
        this.userService.update(this.id, this.form.value).subscribe((res:any) => {
            console.log('User updated successfully!', res);
            localStorage.setItem('type', 'edit');
            localStorage.setItem('item', JSON.stringify(res));
            this.router.navigateByUrl('user/index');
        });
    }
}
