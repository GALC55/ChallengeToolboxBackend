# Challenge Toolbox Backend

Backend de la aplicación Challenge Toolbox construido con **Node.js**, **Express.js** y un sistema de procesamiento de archivos CSV.

## 📋 Descripción del Proyecto

Este backend proporciona una API REST para:

- Obtener listas de archivos desde una API externa
- Descargar y procesar archivos CSV
- Validar y parsear datos CSV eliminando líneas con errores
- Manejar archivos vacíos y errores de descarga de forma automática

### Características Principales

✅ **Procesamiento de CSV**: Maneja archivos vacíos, líneas incompletas y datos inválidos  
✅ **CORS Configurado**: Soporte para múltiples orígenes  
✅ **Manejo de Errores**: Try-catch comprehensive en toda la aplicación  
✅ **Tests Automatizados**: Suite de pruebas con Mocha y Chai  
✅ **Hot Reload en Desarrollo**: Nodemon para desarrollo ágil

---

## 🚀 Requisitos Previos

- **Node.js**: v14 o superior
- **npm**: v6 o superior
- Acceso a Internet (para la API externa)

### Verificar versiones

```bash
node -v
npm -v
```

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/GALC55/ChallengeToolboxBackend.git
cd ChallengeToolboxBackend
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará:

**Dependencias de Producción:**

- `express` - Framework web
- `axios` - Cliente HTTP
- `cors` - Middleware CORS
- `dotenv` - Variables de entorno

**Dependencias de Desarrollo:**

- `mocha` - Test runner
- `chai` - Assertion library
- `chai-http` - HTTP assertions
- `supertest` - Testing HTTP requests
- `nodemon` - Auto-reload durante desarrollo

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# .env
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://
PORT=3000
BEARER=<your_secret_key>
LOCAL_FRONTEND_URL=http://localhost:3001
API_URL=<your_api_url>
```

**Descripción de variables:**

| Variable             | Descripción                   | Ejemplo                      |
| -------------------- | ----------------------------- | ---------------------------- |
| `NODE_ENV`           | Entorno de ejecución          | `development` o `production` |
| `PORT`               | Puerto del servidor           | `3000`                       |
| `API_URL`            | URL base de la API externa    | `<your_api_url>`             |
| `BEARER`             | Token de autenticación        | `<your_secret_key>`          |
| `ALLOWED_ORIGINS`    | Orígenes permitidos para CORS | URLs separadas por coma      |
| `LOCAL_FRONTEND_URL` | URL del frontend local        | `http://localhost:3001`      |

---

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo (con hot-reload)

```bash
npm run dev
```

El servidor iniciará en `http://localhost:3000` y se reiniciará automáticamente al cambiar archivos.

### Modo Producción

```bash
npm start
```

---

## 🧪 Ejecutar Tests

### Ejecutar todos los tests

```bash
npm test
```

### Ejecutar tests en modo watch (desarrollo)

```bash
npm test -- --watch
```

### Ejecutar tests específicos

```bash
npx mocha test/file.tests.js
```

---

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── app.js                 # Configuración de Express
│   ├── server.js              # Punto de entrada
│   ├── controllers/
│   │   └── files.controllers.js    # Lógica de controladores
│   ├── middleware/
│   │   └── requestLogger.js        # Middleware de logging
│   ├── routes/
│   │   ├── files.routes.js         # Rutas de archivos
│   │   └── health.routes.js        # Rutas de salud
│   ├── services/
│   │   └── secretApi.services.js   # Servicios de API externa
│   └── utils/
│       └── csvParser.js            # Parser de CSV
├── test/
│   └── file.tests.js          # Tests unitarios
├── .env                       # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 Endpoints API

### 1. Obtener datos de archivos

```http
GET /files/data?filename=optional_filename
```

**Parámetros:**

- `filename` (opcional) - Filtra por nombre de archivo específico

**Respuesta (200):**

```json
[
  {
    "file": "archivo1.csv",
    "lines": [
      {
        "text": "Ejemplo",
        "number": 42,
        "hex": "FF5733"
      }
    ]
  }
]
```

**Errores:**

- `404` - File not found or contains no valid data
- `500` - Internal server error

---

### 2. Obtener lista de archivos

```http
GET /files/list
```

**Respuesta (200):**

```json
["archivo1.csv", "archivo2.csv"]
```

---

### 3. Health check

```http
GET /health
```

**Respuesta (200):**

```json
{ "status": "OK" }
```

---

## 🔍 Validaciones de CSV

El parser valida automáticamente:

✅ Líneas vacías se descartan  
✅ Líneas con campos faltantes se descartan  
✅ Campos de número se validan numéricamente  
✅ Solo se procesa contenido válido  
✅ Archivos completamente vacíos se reportan como tal

**Ejemplo de validación:**

```csv
file,text,number,hex
válido.csv,Texto,123,#FF5733
inválido.csv,Texto,abc,#FF5733      <- Descartado (número inválido)
válido.csv,Texto,456,#00FF00
,Incompleto,789,#0000FF             <- Descartado (campo faltante)
```

---

## 📝 Logs y Debugging

El middleware de request logger registra:

- Método HTTP
- Ruta
- Timestamp
- Status de respuesta

Habilitar logs detallados en desarrollo estableciendo `NODE_ENV=development` en `.env`.

---

## ⚠️ Manejo de Errores

La aplicación maneja automáticamente:

| Escenario                    | Comportamiento                      |
| ---------------------------- | ----------------------------------- |
| Archivo vacío                | Se omite del resultado              |
| Línea con datos incompletos  | Se descarta silenciosamente         |
| Error en descarga de archivo | Se captura y continúa con siguiente |
| API externa no disponible    | Error 500                           |
| Parámetros inválidos         | Error 400                           |

---

## 🔐 Seguridad

- Bearer token obligatorio para API externa
- CORS restringido a orígenes configurados
- Variables sensibles en `.env` (nunca comitear)
- Validación de entrada en CSV

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'dotenv'"

```bash
npm install
```

### Error: "EADDRINUSE: address already in use :::3000"

El puerto 3000 ya está en uso. Cambiar en `.env`:

```env
PORT=3001
```

### Node version incorrecta

Si usas nvm:

```bash
nvm use 14
npm start
```

---

## 📚 Stack Tecnológico

- **Runtime**: Node.js v14+
- **Framework**: Express.js 4.18
- **Testing**: Mocha 11 + Chai 4
- **HTTP Client**: Axios
- **Middleware**: CORS, dotenv
- **Development**: Nodemon

---

## 📄 Licencia

Este proyecto es propiedad de GALC55.
