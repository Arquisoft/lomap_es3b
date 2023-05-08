Dentro de las carpetas se encuentran los resultados de las pruebas de carga, las cuales han sido:

1- Una prueba de funcionalidad general no muy exigente en cuanto a número de usuarios.
2- La misma prueba pero con una exigencia mayor, alcanzando un pico de 500 usuarios a la vez.

En las carpetas se encuentran los archivos Index en los que se encuentran los resultados de las ejecuciones.
El principal problema que ha habido va relacionado con Cloudinary, el cual no admite tantas peticiones simultáneas, por lo que gran parte de las requests se caen. Las otras requests que se caen van relacionadas con el mismo problema, el esperar tanto en la cola de peticiones hace que no puedan administrarlas todas a la vez.

También se incluyen los archivos .scala con los que se realizaron las pruebas