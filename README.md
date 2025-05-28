# AI4Devs - Sistema de Gestión de Candidatos

Sistema full-stack para gestión de candidatos con autocompletado inteligente y validación en tiempo real.

## 🚀 Características

- ✅ **Autocompletado inteligente** en campos del formulario basado en datos históricos
- ✅ **Validación en tiempo real** mientras el usuario escribe
- ✅ **Notificaciones toast** para feedback inmediato
- ✅ **Subida de archivos CV** con validación
- ✅ **Interfaz responsive** con Material-UI
- ✅ **API REST** robusta con validación de datos
- ✅ **Base de datos PostgreSQL** con Prisma ORM

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- **Docker** y **Docker Compose**
- **Git**

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd AI4Devs-lab-ides-RO-1
```

### 2. Configurar Base de Datos

```bash
# Iniciar PostgreSQL con Docker
docker-compose up -d

# Verificar que el contenedor esté corriendo
docker ps
```

**Detalles de conexión a la base de datos:**

- Host: `localhost`
- Puerto: `5432`
- Usuario: `postgres`
- Contraseña: `password`
- Base de datos: `mydatabase`

### 3. Configurar Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar migraciones de Prisma
npx prisma migrate dev
npx prisma generate

# Iniciar servidor de desarrollo
npm run dev
```

El backend estará disponible en: `http://localhost:3010`

### 4. Configurar Frontend

```bash
# Navegar al directorio frontend (desde la raíz)
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173` (Vite) o `http://localhost:5174`

## 📁 Estructura del Proyecto

```
AI4Devs-lab-ides-RO-1/
├── backend/                 # Servidor Express + TypeScript
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── routes/         # Rutas de la API
│   │   ├── middleware/     # Middlewares
│   │   └── index.ts        # Punto de entrada
│   ├── prisma/             # Esquemas y migraciones
│   ├── uploads/            # Archivos subidos
│   └── package.json
├── frontend/               # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Servicios API
│   │   ├── types/          # Tipos TypeScript
│   │   └── App.tsx         # Componente principal
│   └── package.json
├── docker-compose.yml      # Configuración PostgreSQL
└── README.md
```

## 🔧 Scripts Disponibles

### Backend

```bash
npm run dev          # Servidor desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Servidor producción
npm run prisma:reset # Resetear base de datos
```

### Frontend

```bash
npm run dev          # Servidor desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

## 🌐 Endpoints de la API

### Candidatos

- `GET /api/candidates` - Listar candidatos (con paginación)
- `POST /api/candidates` - Crear candidato
- `GET /api/candidates/:id` - Obtener candidato por ID
- `PUT /api/candidates/:id` - Actualizar candidato
- `DELETE /api/candidates/:id` - Eliminar candidato
- `POST /api/candidates/:id/cv` - Subir CV

## 🎯 Uso de la Aplicación

1. **Acceder al formulario**: Ve a `http://localhost:5173/candidates/add`
2. **Autocompletado**: Haz clic en campos como "Nombre", "Institución", "Empresa" para ver sugerencias
3. **Validación**: Los errores aparecen en tiempo real mientras escribes
4. **Envío**: Al enviar exitosamente, verás una notificación y serás redirigido al home

## 🐛 Solución de Problemas

### Puerto en uso

```bash
# Matar procesos en puerto 3010 (backend)
lsof -ti:3010 | xargs kill -9

# Matar procesos en puerto 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Problemas con base de datos

```bash
# Resetear base de datos
cd backend
npx prisma migrate reset
npx prisma generate
```

### Problemas con dependencias

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Tu Nombre** - _Desarrollo inicial_ - [TuGitHub](https://github.com/tuusuario)

## 🙏 Agradecimientos

- Material-UI por los componentes
- Prisma por el ORM
- React Hook Form por el manejo de formularios
