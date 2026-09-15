import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from '../models/todo.types';
import { TodoService } from './todo.service';

type TodoState = {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
};

const initialState: TodoState = {
    todos: [],
    isLoading: false,
    error: null,
};

export const TodoStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, todoService = inject(TodoService)) => ({
        loadAll: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(() =>
                    todoService.getTodos().pipe(
                        tap({
                            next: (todos) => patchState(store, { todos, isLoading: false }),
                            error: (err) => patchState(store, { error: err.message ?? 'Erreur inconnue', isLoading: false })
                        })
                    )
                )
            )
        ),

        deleteItem(todo: Todo) {
            patchState(store, (state) => ({
                todos: state.todos.filter((item) => item.id !== todo.id)
            }));
        },

        updateItem: rxMethod<Todo>(
            pipe(
                switchMap((todo) =>
                    todoService.updateTodo(todo).pipe(
                        tap({
                            next: (updatedItem) => {
                                patchState(store, (state) => ({
                                    todos: state.todos.map((item) =>
                                        item.id === updatedItem.id ? updatedItem : item
                                    )
                                }));
                            },
                            error: (err) => {
                                console.error('Error update item', err);
                                patchState(store, { error: 'Échec de la mise à jour' });
                            }
                        })
                    )
                )
            )
        )
    })),
    withHooks({
        onInit(store) {
            store.loadAll();
        }
    })
);