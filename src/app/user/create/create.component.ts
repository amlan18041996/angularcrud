import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
    form!: FormGroup;

    constructor(
        public userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
            website: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')])
        });
    }

    get f(){
        return this.form.controls;
    }

    submit(){
        this.userService.create(this.form.value).subscribe((res: any) => {
            console.log('User created successfully!', res);
            localStorage.setItem('type', 'add');
            localStorage.setItem('item', JSON.stringify(res));
            this.router.navigateByUrl('user/index');
        })
    }

}
