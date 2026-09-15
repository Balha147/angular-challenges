import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  imports: [TodoListComponent],
  selector: 'app-root',
  template: `
    <app-todo-list />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [],
})
export class AppComponent {
  // private http = inject(HttpClient);

  todos!: any[];

  // ngOnInit(): void {
  //   this.http
  //     .get<any[]>('https://jsonplaceholder.typicode.com/todos')
  //     .subscribe((todos) => {
  //       this.todos = todos;
  //     });
  // }

  // update(todo: any) {
  //   this.http
  //     .put<any>(
  //       `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
  //       JSON.stringify({
  //         todo: todo.id,
  //         title: randText(),
  //         body: todo.body,
  //         userId: todo.userId,
  //       }),
  //       {
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //         },
  //       },
  //     )
  //     .subscribe((todoUpdated: any) => {
  //       this.todos[todoUpdated.id - 1] = todoUpdated;
  //     });
  // }
}
