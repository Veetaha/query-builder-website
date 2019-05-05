import { Nullable } from 'ts-typedefs';
import { TemplateRef, ViewContainerRef, Directive, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { AbstractIfDirective } from '@utils/directives/abstract-if.directive';

import { AuthState } from './auth.state';
import { UserRole  } from '@app/gql/generated';


@Directive({
    selector: '[appIfClientRole]'
})
export class AppIfClientRoleDirective extends AbstractIfDirective implements OnInit {
    private allowedRoles!: UserRole[];

    @Input() set appIfClientRole(roles: UserRole[]) {
        this.allowedRoles = roles;
        this.renderIf(this.shouldRenderFor(this.store.selectSnapshot(
            AuthState.clientRoleSnap
        )));
    }
    @Input('appIfClientRoleIsIn') roleShouldBeIn = true;
    @Input('appIfClientRoleElse') elseTemplateRef?: Nullable<TemplateRef<undefined>>;

    constructor(
        templateRef: TemplateRef<undefined>,
        vcr:         ViewContainerRef,
        private readonly store: Store
    ) {
        super(templateRef, vcr);
    }

    ngOnInit() {
        this.addHandle(AuthState.selectClientRole(this.store).subscribe(
            clientRole => this.renderIf(this.shouldRenderFor(clientRole))
        ));
    }

    private shouldRenderFor(role: UserRole) {
        return this.allowedRoles.includes(role) === this.roleShouldBeIn;
    }
    protected getElseTemplateRef() { 
        return this.elseTemplateRef; 
    }
}