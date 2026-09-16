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

@Directive({
    selector: '[hasRoleSuperAdmin]',
})
export class HasRoleSuperAdminDirective {
    private readonly templateRef = inject(TemplateRef<unknown>);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly userStore = inject(UserStore);

    readonly hasRoleSuperAdmin = input.required<boolean>();

    private readonly user = toSignal(this.userStore.user$);
    private hasView = false;

    constructor() {
        effect(() => {
            const user = this.user();
            const wantsSuperAdminOnly = this.hasRoleSuperAdmin();

            const isAllowed = wantsSuperAdminOnly && !!user?.isAdmin;

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