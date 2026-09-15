import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { Todo } from "../../models/todo.types";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class TodoItemComponent {
    todoItem = input.required<Todo>();
    updateItem = output<void>();
    deleteItem = output<void>();

    onUpdate(): void {
        this.updateItem.emit();
    }

    onDelete(): void {
        this.deleteItem.emit();
    }
}