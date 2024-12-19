import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-url-test',
  templateUrl: './url-test.component.html',
  styleUrls: ['./url-test.component.scss']
})
export class UrlTestComponent {

  id !: string
  name !: string

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.name = params.get('name')!;
    })

    console.log(this.id, this.name)
  }
}
