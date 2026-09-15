import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Todo } from "../models/todo.types";
import { randText } from "@ngneat/falso";
import { Observable } from "rxjs";

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

@Service()
export class TodoService {
    private http = inject(HttpClient);

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${BASE_URL}/todos`);
    }

    updateTodo(item: Todo): Observable<Todo> {
        const body: Todo = {
            ...item,
            title: randText(),
            completed: !item.completed
        };

        return this.http.put<Todo>(`${BASE_URL}/todos/${item.id}`, body, {
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
    }

    // Version SANS SignalStore
    // todosResource = httpResource<Todo[]>(() => `${BASE_URL}/todos`);

    // deleteItem(todo: Todo) {
    //     this.todosResource.update((todos) =>
    //         (todos ?? []).filter((item: Todo) => item.id !== todo.id)
    //     )
    // }

    // updateItem(item: Todo) {
    //     const body: Todo = {
    //         id: item.id,
    //         title: randText(),
    //         completed: !item.completed,
    //         userId: item.userId
    //     }
    //     this.http.put<Todo>(`${BASE_URL}/todos/${item.id}`, body, {
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         }
    //     })
    //         .subscribe({
    //             next: (updateItem: Todo) => {
    //                 this.todosResource.update((todos) =>
    //                     (todos ?? []).map((item: Todo) => item.id === updateItem.id ? updateItem : item)
    //                 )
    //             },
    //             error(err) {
    //                 console.error('Error update item', err);
    //             },
    //         })
    // }
}


