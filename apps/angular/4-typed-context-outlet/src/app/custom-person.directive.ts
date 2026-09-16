import { Directive } from '@angular/core';

export interface PersonTemplateContext {
    $implicit: string;
    age: number;
}

@Directive({
    selector: '[appCustomPerson]',
})
export class CustomPersonDirective {
    static ngTemplateContextGuard(_dir: CustomPersonDirective, ctx: unknown):
        ctx is PersonTemplateContext {
        return true;
    }
}