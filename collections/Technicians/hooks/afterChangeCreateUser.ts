import type { CollectionAfterChangeHook } from 'payload'

const afterChangeCreateUser: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
    // TODO: this will not work with super admins
    const tenantId = (req?.user?.tenants?.[0]?.tenant as any).id;
    if (operation === 'create' && doc.email && doc.password) {
        try {
            await req.payload.create({
                collection: 'users',
                data: {
                    email: doc.email,
                    password: doc.password,
                    roles: ['technician'],
                    name: doc.name,
                    profilePhoto: doc.profilePhoto,
                    tenants: [{
                        tenant: tenantId,
                        roles: ['tenant-viewer']
                    }]
                },
            })
        } catch (error) {
            req.payload.logger.error(
                `Error creating user for technician ${doc.email}: ${error}`,
            )
        }
    }
    return doc
}

export default afterChangeCreateUser 