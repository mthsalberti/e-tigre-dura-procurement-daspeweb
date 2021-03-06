import ViewListPurchase from "@/views/purschase/ViewListPurchase";
import VueRouter from "vue-router";
import Vue from 'vue';
import user from "@/mock/user";
import ViewFormPurchaseRequest from "@/views/purschase/request/ViewFormPurchaseRequest";
import ViewListPurchaseItem from "@/views/purchaseItem/ViewListPurchaseItem";

/* conf */
export let routeConf = {
    requestPath: '/purchase/request/',
    requestName: 'purschase',
    orderPath: '/purchase/order/',
    orderName: 'purchaseOrder'
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: {
            name: `${routeConf.requestName}Draft`,
        },
        meta: {
            requiredAuth: true
        }
    },

    {
        path: '/login',
        meta: {
            requiredAuth: false
        }
    },

    // purchase
    {
        name: `${routeConf.requestName}New`,
        path: `${routeConf.requestPath}view/new`,
        component: ViewFormPurchaseRequest,
        redirect: {
            name: `${routeConf.requestName}newItems`
        },
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin', 'common']
        },
        children: [
            {
                path: 'items',
                name: `${routeConf.requestName}newItems`,
                component: ViewListPurchaseItem,
                meta: {
                    requiredAuth: true,
                    requiredProfiles: ['admin', 'common']
                },
            }
        ]
    },
    {
        name: `${routeConf.requestName}View`,
        path: `${routeConf.requestPath}view/:id`,
        component: ViewFormPurchaseRequest,
        redirect: {
            name: `${routeConf.requestName}items`
        },
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin', 'common'],
            scroll: {x: 0, y: 0}
        },
        children: [
            {
                path: 'items',
                name: `${routeConf.requestName}items`,
                component: ViewListPurchaseItem,
                meta: {
                    requiredAuth: true,
                    requiredProfiles: ['admin', 'common'],
                    scroll: {x: 0, y: 0}
                },
            }
        ]
    },

    /* request */
    {
        path: `${routeConf.requestPath}draft`,
        name: `${routeConf.requestName}Draft`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin', 'common']
        }
    },
    {
        path: `${routeConf.requestPath}toOrder`,
        name: `${routeConf.requestName}ToOrder`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin']
        }
    },
    {
        path: `${routeConf.requestPath}toApproval`,
        name: `${routeConf.requestName}ToApproval`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin']
        }
    },
    {
        path: `${routeConf.requestPath}approved`,
        name: `${routeConf.requestName}Approved`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin']
        }
    },

    /* order */
    {
        path: `${routeConf.orderPath}draft`,
        name: `${routeConf.orderName}Draft`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin'],
        }
    },
    {
        path: `${routeConf.orderPath}toOrder`,
        name: `${routeConf.orderName}ToOrder`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin'],
        }
    },
    {
        path: `${routeConf.orderPath}approved`,
        name: `${routeConf.orderName}Approved`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin'],
        }
    },
    {
        path: `${routeConf.orderPath}toApproval`,
        name: `${routeConf.orderName}ToApproval`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin'],
        }
    },
    {
        path: `${routeConf.orderPath}toReceive`,
        name: `${routeConf.orderName}ToReceive`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin'],
        }
    },
    {
        path: `${routeConf.orderPath}receive`,
        name: `${routeConf.orderName}Receive`,
        component: ViewListPurchase,
        meta: {
            requiredAuth: true,
            requiredProfiles: ['admin', 'common'],
        }
    },
]

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, position) {
        return {...to.meta.scroll ?? {}, ...{behavior: 'smooth',}} ?? position
    }
})

router.beforeResolve((to, from, next) => {
    let person = user[1]
    //Est?? no perfil exigido? Est?? autenticado?
    if (to.meta?.requiredProfiles?.includes(person.profile.description) && to.meta?.requiredAuth === person.authed) {
        next()
    } else {
        console.warn('cannot on beforeResolve')
        next({
            name: 'home'
        })
    }
})

export default router