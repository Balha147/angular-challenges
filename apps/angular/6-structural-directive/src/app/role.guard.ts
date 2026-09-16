import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map, take } from 'rxjs';
import { UserStore } from './user.store';
import { Role } from './user.model';

export function hasRoleMatch(...roles: Role[]): CanMatchFn {
    return () => {
        const userStore = inject(UserStore);

        return userStore.user$.pipe(
            take(1),
            map((user) => !!user && (user.isAdmin || roles.some((r: Role) => user.roles.includes(r)))),
        );
    };
}

export function hasRoleSuperAdminMatch(): CanMatchFn {
    return () => {
        const userStore = inject(UserStore);

        return userStore.user$.pipe(
            take(1),
            map((user) => !!user?.isAdmin),
        );
    };
}