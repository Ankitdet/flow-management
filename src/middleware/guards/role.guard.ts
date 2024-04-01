import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import _ from 'lodash'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    private getExistingUser(req: any): Record<string, string> {
        const transformedObject = _.map(req.attr, ({ Name, Value }) => ({
            [Name === 'custom:role' ? 'role' : Name]: Value,
        }))
        const convertedObject = _.merge({}, ...transformedObject)
        const attr = { ...req?.user, ...convertedObject }
        return attr
    }

    private matchRoles(roles: string[], userRole: string) {
        return roles.some(role => role === userRole)
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        const existingUser = this.getExistingUser(request)

        const existingRole = existingUser.role
        return this.matchRoles(roles, existingRole)
    }
}
