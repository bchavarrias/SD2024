//Asignar nombre  y version de la cache
//constante
const CACHE_NAME="v1_cache_PWA";

//ficheros que se van a estar guardando en la
//aplicación que se van a ver offline

var urlsToCache= [
    './',
    './css/Customs.css',
    './css/site.css',
    './img/favicon.jpg',
    './img/amazon.png',
    './img/dotnet-imagen-2.png',
    './img/favicon-16.jpeg',
    './img/favicon-64.jpeg',
    './img/favicon-96.jpeg',
    './img/favicon-128.jpeg',
    './img/favicon-192.jpeg',
    './img/favicon-256.jpeg',
    './img/favicon-384.jpeg',
    './img/favicon-512.jpeg',
    './img/favicon-1024.jpeg',
    './img/favicon32.jpeg',
    './img/fondo.jpeg',
    './img/fondo2.jpeg',
    './img/fondo3.jpeg',
    './img/fondo4.jpeg',
    './img/nyt.png',
    './img/reddit.png',
    './img/steam.png',
    './img/yo.png'
];

//Eventos que tiene un SW

//Instalación del sw y 
//guardar los recursos estaticos de la aplicación.
//Evento Install

self.addEventListener('install',e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                  return cache.addAll(urlsToCache)
                              .then(() =>{
                                self.skipWaiting();
                              });
                             
              })
              .catch(err=> {
                console.log('No se a cargado la cache',err);
              })
    );

});

//Evento Activate activa el Sw y permite que trabaje offline

self.addEventListener('activate', e=>{
    //añadimos todos los elementos en la cache
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames =>
                {
                return Promise.all(
                    cacheNames.map(cacheName=> 
                      {
                        if(cacheWhiteList.indexOf(cacheName)=== -1)
                          {
                            //borrar los elementos que ya no esten en 
                            //la cache o no se necesiten
                            return caches.delete(cacheName);
                          }

                      })

                );
              })
              .then(()=> {
                //Activar cache en el dispositivo
                self.clients.claim();
              })
    );
});



//Evento Fetch (actualiza la aplicación)-

self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request)
          .then(res => {
            if(res){
              //devuelvo datos  desde cache
              return res;
            }
            return fetch(e.request);
          })
  );
});