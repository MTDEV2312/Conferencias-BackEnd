# 🎯 Conferencias-BackEnd

## 📋 Descripción
Sistema API RESTful para la gestión completa de conferencias y eventos. Esta plataforma permite administrar auditorios, ponentes, reservas y usuarios en un entorno seguro y escalable.

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js    | >=14.x  | Entorno de ejecución |
| Express    | ^4.18.2 | Framework web |
| MongoDB    | >=4.4   | Base de datos |
| Mongoose   | ^7.0.3  | ODM para MongoDB |
| JWT        | ^9.0.0  | Autenticación |
| Bcrypt     | ^5.1.0  | Encriptación de contraseñas |
| Cors       | ^2.8.5  | Gestión de CORS |
| Dotenv     | ^16.0.3 | Gestión de variables de entorno |

## 📁 Estructura del Proyecto

```
src/
├── config/         # Configuraciones (DB, env)
├── controllers/    # Lógica de negocio
├── middleware/     # Middlewares (auth, validación)
├── models/         # Modelos de datos
│   ├── auditoriums_model.js  # Gestión de auditorios
│   ├── bookings_model.js     # Gestión de reservas
│   ├── speakers_model.js     # Gestión de ponentes
│   └── user_model.js         # Gestión de usuarios
├── routers/        # Definición de rutas API
├── utils/          # Utilidades y helpers
├── index.js        # Punto de entrada
└── server.js       # Configuración del servidor
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js >= 14.x
- MongoDB >= 4.4
- npm >= 6.x

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/MTDEV2312/Conferencias-BackEnd.git

# Instalar dependencias
cd Conferencias-BackEnd
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MongoDB y configuración JWT
```

### Configuración

Asegúrate de configurar correctamente tu archivo `.env`:

```
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=tu_clave_secreta
```

### Ejecución

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 📡 API Endpoints

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |

### Auditorios
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/auditorium` | Listar todos los auditorios |
| GET | `/api/auditorium/:id` | Obtener detalles de un auditorio |
| PATCH | `/api/auditorium/register` | Crear nuevo auditorio |
| PUT | `/api/auditorium/update/:id` | Actualizar auditorio |
| DELETE | `/api/auditorium/delete/:id` | Eliminar auditorio |

### Ponentes
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/speakers` | Listar todos los ponentes |
| GET | `/api/speakers/:id` | Obtener detalles de un ponente |
| POST | `/api/speakers/register` | Crear nuevo ponente |
| PATCH | `/api/speakers/update/:id` | Actualizar ponente |
| DELETE | `/api/speakers/delete/:id` | Eliminar ponente |

### Reservas
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/bookings` | Listar todas las reservas |
| GET | `/api/bookings/:id` | Obtener detalles de una reserva |
| POST | `/api/bookings/register` | Crear nueva reserva |
| PATCH | `/api/bookings/update/:id` | Actualizar reserva |
| DELETE | `/api/bookings/delete/:id` | Eliminar reserva |

## ⚙️ Funcionalidades Principales

- **Gestión de Auditorios**: Crear, listar, actualizar y eliminar auditorios con información sobre capacidad y ubicación.
- **Gestión de Ponentes**: Administrar información de ponentes incluyendo especialidad y biografía.
- **Sistema de Reservas**: Crear y gestionar reservas de auditorios para conferencias específicas.
- **Autenticación de Usuarios**: Sistema seguro con JWT para proteger rutas privadas.
- **Validaciones**: Validación de datos de entrada en todos los endpoints.
- **Manejo de Errores**: Sistema robusto de manejo de excepciones y respuestas de error.

## 📊 Modelos de Datos

### Usuario
```json
{
"name": "String (requerido)",
"email": "String (requerido, único)",
"password": "String (encriptado, requerido)",
"role": "String (default: 'user')"
}
```

### Auditorio
```json
{
"name": "String (requerido)",
"location": "String (requerido)",
"capacity": "Number (requerido)",
"description": "String"
}
```

### Ponente
```json
{
"name": "String (requerido)",
"specialty": "String (requerido)",
"bio": "String",
"contact": "String"
}
```

### Reserva
```json
{
"auditorium": "ObjectId (ref a Auditorio)",
"startDate": "Date (requerido)",
"endDate": "Date (requerido)",
"title": "String (requerido)",
"description": "String",
"speaker": "ObjectId (ref a Ponente)",
"createdBy": "ObjectId (ref a Usuario)"
}
```

## ✍️ Autores
- Mathías Agustín Terán Alcívar

