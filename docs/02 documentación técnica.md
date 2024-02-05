# Documentación técnica de la aplicación

> La documentación técnica está dirigida a desarrolladores y personas interesadas en conocer los detalles de la implementación de la aplicación.

# Componentes de software

La aplicación se divide en los siguientes componentes:

## Frontend (Reactjs)

- **router:** gestiona las rutas de la aplicación
- **auth:** módulo de autenticación
- **persons:** páginas y componentes relacionados con la gestión de usuarios
- **videoplus:** páginas y componentes relacionados con la gestión de vídeos
- **layouts:** componentes de diseño y maquetación

## Backend (Nodejs)

- **auth:** gestiona la autenticación de usuarios
- **persons:** gestiona la información de las personas
- **videos:** gestiona la información de los vídeos
- **videoplus:** aplicación principal que mezcla los componentes de persons, auth y vídeos
- **shared:** módulo de código compartido para toda la aplicación

# Diagramas de bases de datos

[Enlace al archivo mwb](/docs/rel_diagram.mwb)

<br>

# Declaración de APIs

[Enlace al archivo yml de Swagger](/docs/apis.yml)

[Enlace al archivo json de Postman](/docs/postman.json)
