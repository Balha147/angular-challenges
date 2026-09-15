import { Component, inject, input } from "@angular/core";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { TodoService } from "../../service/todo.service";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Todo } from "../../models/todo.types";
import { TodoStore } from "../../service/todos.store";

@Component({
    selector: 'app-todo-list',
    imports: [TodoItemComponent, MatIconModule, MatProgressSpinnerModule],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
    readonly store = inject(TodoStore);

    // Raccourcis vers les signals du SignalStore
    readonly todos = this.store.todos;
    readonly isLoading = this.store.isLoading;
    readonly error = this.store.error;

    updateItem(todo: Todo): void {
        this.store.updateItem(todo);
    }

    deleteItem(todo: Todo): void {
        this.store.deleteItem(todo);
    }
    // todoService = inject(TodoService);
    // todos = this.todoService.todosResource.value;
    // isLoading = this.todoService.todosResource.isLoading;
    // error = this.todoService.todosResource.error;

    // updateItem(todo: Todo): void {
    //     this.todoService.updateItem(todo);
    // }
    // deleteItem(todo: Todo): void {
    //     this.todoService.deleteItem(todo);
    // }
}