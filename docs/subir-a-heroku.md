# Introducción

Para probar tu servidor, un buen lugar para empezar a usarlo es Heroku.

## Requisitos

- Tener una [Cuenta de Heroku](https://signup.heroku.com/dc) (puede ser gratuita)
- Haber descargado este repositorio y/o usar git.
- [Node.js](https://nodejs.org/es/) instalado (preferiblemente versión LTS mayor o igual a 10).
- Tener el [Cliente de Heroku](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).
- Tener un cliente de GIT, [Para Windows existe este](https://gitforwindows.org/), Linux suele venir con GIT incorporado, asi como MacOSX.

## Sugerencias

Como editor de texto, sugiero [VisualStudio Code](https://code.visualstudio.com/), hace más facil muchas cosas.

## Inicio

- Abri una consola de comandos (VSCode trae una incorporada).
- Èjecutar el comando `git init`.
- Si no iniciaste sesión en heroku, hacelo con `heroku login`.
- Escribí `npm i` y esperá a descargar todas las dependencias.
- Escribí `heroku create` y se va a crear una app de heroku.
- Ahora se deberá de hacer commit de tus cambios en GIT. Para eso, recomiendo ver el tutorial de GIT.
- Finalmente, usa el comando `git push heroku master`

¡Ya deberías tener una APP de Heroku!

## Como actualizar tu APP

Cada vez que hagas cambios, tendrás que repetir los ultimos dos pasos que hayas hecho para subirlo a Heroku, es decir, actualizar tus cambios en GIT. y luego hacer `git push heroku master`
