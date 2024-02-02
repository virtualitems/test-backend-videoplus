# Documentación técnica de la aplicación

> La documentación técnica está dirigida a desarrolladores y personas interesadas en conocer los detalles de la implementación de la aplicación.

# Componentes de software

La aplicación se divide en los siguientes componentes:

## Frontend (Reactjs)

- **router:** gestiona las rutas de la aplicación
- **auth:** módulo de autenticación
- **users:** páginas y componentes relacionados con la gestión de usuarios
- **videos:** páginas y componentes relacionados con la gestión de vídeos

## Backend (Nodejs)

- **users:** gestiona la información de los usuarios
- **videos:** gestiona la información de los vídeos
- **videoplus:** aplicación principal que mezcla los componentes de usuarios y vídeos
- **shared:** módulo de código compartido para toda la aplicación

# Diagramas de bases de datos

<br>

# Especificación de APIs

## Usuarios

- **GET /users:** listar usuarios (filtros y ordenamiento)
- **GET /user/:slug:** ver detalles de un usuario
- **GET /user/:slug/edit:** formulario de edición de usuario
- **PUT /user/:slug:** actualizar usuario
- **DELETE /user/:slug:** eliminar usuario

- **GET /auth/profile:** ver perfil de usuario
- **GET /auth/profile/edit:** formulario de edición de perfil
- **PUT /auth/profile:** actualizar perfil

- **GET /auth/register:** formulario de creación de usuario
- **POST /auth/register:** crear usuario

- **GET /auth/login:** formulario de inicio de sesión
- **POST /auth/login:** iniciar sesión
- **GET /auth/logout:** cerrar sesión

- **GET /user/:slug/videos:** listar vídeos de un usuario

## Vídeos

- **GET /videos:** listar vídeos (filtros y ordenamiento)
- **GET /video/:slug:** ver página de vídeo
- **GET /video/upload:** formulario de creación de vídeo
- **POST /video:** crear vídeo
- **GET /video/:slug/edit:** formulario de edición de vídeo
- **PUT /video/:slug:** actualizar vídeo
- **DELETE /video/:slug:** eliminar vídeo

- **GET /video/:slug/like:** mostrar "me gusta" de un vídeo
- **POST /video/:slug/like:** dar "me gusta" a un vídeo

- **GET /video/:slug/comment:** mostrar comentarios de un vídeo
- **POST /video/:slug/comment:** comentar un vídeo

<br>

# Algoritmos de servicios

<br>

# Lista de permisos

- **users:list** listar usuarios
- **users:view** ver detalles de un usuario
- **users:update** actualizar usuario
- **users:delete** eliminar usuario
- **users:videos** listar vídeos de un usuario

- **videos:list** listar vídeos
- **videos:view** ver detalles de un vídeo
- **videos:create** crear vídeo
- **videos:update** actualizar vídeo
- **videos:delete** eliminar vídeo
- **videos:like** dar "me gusta" a un vídeo
- **videos:comment** comentar un vídeo