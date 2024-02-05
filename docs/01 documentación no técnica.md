# Documentación no técnica de la aplicación

> La documentación no técnica está dirigida a líderes, personal de calidad y personas interesadas en conocer los detalles conceptuales de la aplicación.

<br>

# Glosario

- **Usuario**: persona que utiliza la aplicación.
- **Usuario anónimo**: usuario sin sesión activa.
- **Usuario registrado**: usuario capaz de iniciar sesión.
- **Usuario autenticado**: usuario con sesión activa.
- **Administrador**: usuario con permisos para gestionar usuarios y vídeos sin restricciones.

- **Vídeo**: archivo multimedia con título, descripción, créditos, fecha de publicación y visibilidad.
- **Vídeo público**: vídeo visible para todos los usuarios.
- **Vídeo privado**: vídeo visible sólo para usuarios registrados que hayan iniciado sesión.
- **Vídeo mejor calificado**: vídeo con más "me gusta".

<br>

# Requerimientos

Se debe crear una plataforma capaz de gestionar usuarios y vídeos con el propósito de compartir y visualizar contenido multimedia.

El sistema debe almacenar tanto la información de usuarios y videos como los archivos multimedia.

Se solicita la implementación de sesiones de usuario con autenticación y según el perfil de los usuarios, deben poder realizar diferentes acciones de acuerdo a sus permisos.

Finalmente, para el aseguramiento de la calidad del software, son necesarias pruebas unitarias y la debida documentación.

<br>

# Casos de uso

## Actor: usuario

- Desde la página de videos, puede ver videos públicos
- Desde la página de un vídeo, puede reproducir el vídeo
- Desde la página de un vídeo, puede ver los comentarios
- Desde la página de un vídeo, puede comentar

## Actor: usuario anónimo (+usuario)

- Desde la página de un usuario, puede ver los vídeos de un usuario
- Desde la página de registro, puede registrarse
- Desde la página de inicio de sesión, puede iniciar sesión

## Actor: usuario autenticado (+usuario)

- Desde la página de videos, puede ver videos privados
- Desde la página de un usuario, puede ver los vídeos de un usuario
- Desde la página de vídeos mejor calificados, puede ver los vídeos mejor calificados
- Desde la página de actualización de información, puede actualizar su información
- Desde la página de subida de vídeos, puede subir vídeos
- Desde la página de actualizar información de sus videos, puede actualizar la información de sus vídeos
- Desde la página de sus vídeos, puede listar sus vídeos
- Desde la página de sus vídeos, puede eliminar sus vídeos
- Si tiene sesión activa, al hacer clic en "cerrar sesión", puede cerrar sesión