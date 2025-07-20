# Vocalandia 🗣️

Una aplicación móvil híbrida desarrollada con Ionic y Angular para terapia del lenguaje, diseñada para ayudar en el desarrollo y rehabilitación de habilidades comunicativas.

## 🚀 Tecnologías

- **Framework**: Ionic  + Angular 
- **Capacitor**: 
- **TypeScript**: 
- **Platform**: Android/iOS (híbrida) pwa

## 📱 Características

- Aplicación híbrida para dispositivos móviles
- Interfaz optimizada para terapia del lenguaje
- Funcionalidades nativas usando Capacitor
- Diseño responsivo y accesible

## 🛠️ Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Ionic CLI
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo macOS)

### Instalación paso a paso

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd vocalandia
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar Ionic CLI globalmente (si no lo tienes)**
   ```bash
   npm install -g @ionic/cli
   ```

4. **Instalar Capacitor CLI globalmente**
   ```bash
   npm install -g @capacitor/cli
   ```

## 🔧 Comandos de desarrollo

### Desarrollo web
```bash
npm start
# o
ionic serve
```

### Build para producción
```bash
npm run build
# o
ionic build
```


### Desarrollo móvil

#### Android
```bash
# Agregar plataforma Android
ionic capacitor add android

# Sincronizar cambios
ionic capacitor sync android

# Abrir en Android Studio
ionic capacitor open android
```

#### iOS
```bash
# Agregar plataforma iOS
ionic capacitor add ios

# Sincronizar cambios
ionic capacitor sync ios

# Abrir en Xcode
ionic capacitor open ios
```


## 🌐 URLs y puertos

- **Desarrollo local**: http://localhost:8100
- **LiveReload**: Habilitado por defecto en desarrollo

## 📋 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |

## 🔧 Configuración

### App ID
- **Android/iOS**: `com.languagetherapy.vocalandia`

### Configuraciones importantes
- La aplicación está configurada como `angular-standalone`
- Usa Capacitor para funcionalidades nativas
- Build output en la carpeta `www/`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia [especificar licencia].

## 👨‍💻 Autor

**David Solis** - Desarrollador principal

## 📞 Soporte

Para reportar bugs o solicitar nuevas características, por favor abre un issue en este repositorio.
