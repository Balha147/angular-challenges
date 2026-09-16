import { Directive, input } from '@angular/core';

export interface ListTemplateContext<T> {
    $implicit: T;
    index: number;
}

@Directive({
    selector: '[appList]',
})
export class ListDirective<T> {
    readonly appList = input.required<T[]>();

    static ngTemplateContextGuard<T>(_dir: ListDirective<T>, ctx: unknown):
        ctx is ListTemplateContext<T> {
        return true;
    }
}