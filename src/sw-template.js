/* eslint-disable no-undef */
// import { BackgroundSyncPlugin } from 'workbox-background-sync';
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
workbox.loadModule('workbox-background-sync');
workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const { registerRoute, Route } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',
]

registerRoute(
    ({ request, url }) => {

        if ( cacheNetworkFirst.includes( url.pathname ) ) return true
        
        return false;
    },
    new NetworkFirst()
)

const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
];

registerRoute(
    ({ request, url }) => {
        console.log({url})

        if ( cacheFirstNetwork.includes( url.href ) ) return true        

        return false;
    },
    new CacheFirst()
)

const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
	maxRetentionTime: 24 * 60 // retry for max of 24 hrs
});



registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)




// const updateEventRoute = new Route(
// 	({url}) => url.pathname === '/api/events/',
// 	new NetworkOnly({
// 		plugins: [bgSyncPlugin]
// 	}),
// 	'PUT'
// )
// registerRoute(updateEventRoute);

registerRoute(
	new RegExp('http://localhost:4000/api/events/'),
	new NetworkOnly({
		plugins: [ bgSyncPlugin ]
	}),
	'DELETE'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)

// Only wait for three seconds before returning the last
// cached version of the requested page.
// const navigationRoute = new NavigationRoute(new NetworkFirst({
// 	networkTimeoutSeconds: 3,
// 	cacheName: 'navigations'
//   }));
  
//   registerRoute(navigationRoute);

