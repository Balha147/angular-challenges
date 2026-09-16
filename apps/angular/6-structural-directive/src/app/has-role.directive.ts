import {
    Directive,
    effect,
    inject,
    input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from './user.store';
import { Role } from './user.model';

@Directive({
    selector: '[hasRole]',
})
export class HasRoleDirective {
    private readonly templateRef = inject(TemplateRef<unknown>);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly userStore = inject(UserStore);

    readonly hasRole = input.required<Role | Role[]>();

    private readonly user = toSignal(this.userStore.user$);
    private hasView = false;

    constructor() {
        effect(() => {
            const user = this.user();
            const requested = this.hasRole();
            const requestedRoles = Array.isArray(requested) ? requested : [requested];

            const isAllowed = !!user && (user.isAdmin || requestedRoles.some((role: Role) => user.roles.includes(role)));

            if (isAllowed && !this.hasView) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
                this.hasView = true;
            } else if (!isAllowed && this.hasView) {
                this.viewContainerRef.clear();
                this.hasView = false;
            }
        });
    }
}