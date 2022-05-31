import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
    
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
    posts: Post[] = [];
    links: any;
    paginateNum: any;
   
    constructor(
        public postService: PostService
    ) { }
    
    ngOnInit(): void {
        this.fetchData({}, "");
    }

    fetchData(event: any, paginateUrl: string) {
        const paginateNumber = event.target?.value;
        this.postService.getAll(paginateNumber, paginateUrl).subscribe((response: any)=>{
            this.posts = response.data;
            this.links = {
                previousUrl: response.prev_page_url,
                nextUrl: response.next_page_url
            };
            this.paginateNum = {target: {value:paginateNumber}};
        })
    }
    
    deletePost(id:number){
        this.postService.delete(id).subscribe(res => {
            this.posts = this.posts.filter(item => item.id !== id);
        })
    }
}