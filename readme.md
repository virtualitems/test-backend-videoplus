# Videoplus

> Videoplus es una aplicación de gestión de vídeos en la que podrás ver y compartir videos a través de la web.

## Instalación

1. Instala las dependencias de la aplicación

```bash
npm install
```

2. Crea la base de datos

```bash
npm run migrate
```

3. Esta aplicación requiere mongodb para funcionar
- La base de datos se encuentra en `mongodb://localhost:27017`
- La base de datos se llama `videoplus`

![compass](/docs/mongo.example.png)

4. Iniciar servidor de pruebas

```bash
npm start
```

## Documentación

- [Documentación no técnica de la aplicación](/docs/01%20documentación%20no%20técnica.md)

- [Documentación técnica de la aplicación](/docs/02%20documentación%20técnica.md)
