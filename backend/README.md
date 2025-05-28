# Backend - API de Gestión de Candidatos

API REST construida con Express.js, TypeScript y Prisma ORM para gestionar candidatos y sus CVs.

## 🚀 Tecnologías

- **Express.js** - Framework web para Node.js
- **TypeScript** - Superset tipado de JavaScript
- **Prisma** - ORM moderno para bases de datos
- **PostgreSQL** - Base de datos relacional
- **Multer** - Middleware para subida de archivos
- **Zod** - Validación de esquemas TypeScript
- **CORS** - Middleware para Cross-Origin Resource Sharing

## 📋 Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- **PostgreSQL** (via Docker o instalación local)

## 🛠️ Instalación

### 1. Navegar al directorio backend

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus configuraciones
nano .env
```

**Variables de entorno requeridas:**

```env
# Base de datos
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase"

# Puerto del servidor
PORT=3010

# Directorio de uploads
UPLOAD_DIR="uploads"
```

### 4. Configurar base de datos

```bash
# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# (Opcional) Poblar con datos de ejemplo
npx prisma db seed
```

### 5. Iniciar servidor

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm run build
npm start
```

El servidor estará disponible en: `http://localhost:3010`

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/         # Lógica de controladores
│   │   └── candidate.controller.ts
│   │
│   ├── routes/             # Definición de rutas
│   │   └── candidates.ts
│   │
│   ├── middleware/         # Middlewares personalizados
│   │   ├── upload.ts       # Configuración Multer
│   │   └── validation.ts   # Validación con Zod
│   │
│   ├── types/              # Tipos TypeScript
│   │   └── candidate.ts
│   │
│   └── index.ts            # Punto de entrada
│
├── prisma/
│   ├── schema.prisma       # Esquema de base de datos
│   │
│   ├── migrations/         # Migraciones
│   │
│   └── seed.ts            # Datos de ejemplo
│
├── uploads/               # Archivos subidos
│   └── cvs/              # CVs de candidatos
│
├── .env                  # Variables de entorno
│
├── .env.example         # Ejemplo de variables
│
├── package.json
│
└── tsconfig.json
```

## 🌐 API Endpoints

### Candidatos

#### Listar candidatos

```http
GET /api/candidates?page=1&limit=10
```

**Respuesta:**

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan@example.com",
      "phone": "123456789",
      "educationLevel": "Universitaria",
      "institution": "Universidad XYZ",
      "degree": "Ingeniería",
      "graduationYear": 2020,
      "currentPosition": "Desarrollador",
      "currentCompany": "TechCorp",
      "totalExperience": 3,
      "startDate": "2021-01-01T00:00:00.000Z",
      "isCurrentlyWorking": true,
      "endDate": null,
      "experienceDescription": "Desarrollo de aplicaciones web",
      "cvPath": "uploads/cvs/cv-123456789.pdf",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### Crear candidato

```http
POST /api/candidates
Content-Type: application/json

{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "phone": "123456789",
  "educationLevel": "Universitaria",
  "institution": "Universidad XYZ",
  "degree": "Ingeniería",
  "graduationYear": 2020,
  "currentPosition": "Desarrollador",
  "currentCompany": "TechCorp",
  "totalExperience": 3,
  "startDate": "2021-01-01",
  "isCurrentlyWorking": true,
  "endDate": null,
  "experienceDescription": "Desarrollo de aplicaciones web"
}
```

#### Obtener candidato por ID

```http
GET /api/candidates/:id
```

#### Actualizar candidato

```http
PUT /api/candidates/:id
Content-Type: application/json

{
  "firstName": "Juan Carlos",
  "currentPosition": "Senior Developer"
}
```

#### Eliminar candidato

```http
DELETE /api/candidates/:id
```

#### Subir CV

```http
POST /api/candidates/:id/cv
Content-Type: multipart/form-data

cv: [archivo.pdf]
```

**Formatos soportados:** PDF, DOC, DOCX
**Tamaño máximo:** 5MB

## 🗄️ Esquema de Base de Datos

```prisma
model Candidate {
  id                    Int       @id @default(autoincrement())
  firstName             String
  lastName              String
  email                 String    @unique
  phone                 String
  educationLevel        EducationLevel
  institution           String
  degree                String
  graduationYear        Int
  currentPosition       String
  currentCompany        String
  totalExperience       Int
  startDate             DateTime
  isCurrentlyWorking    Boolean   @default(true)
  endDate               DateTime?
  experienceDescription String
  cvPath                String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}

enum EducationLevel {
  Primaria
  Secundaria
  Terciaria
  Universitaria
  Posgrado
  Doctorado
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor con hot reload
npm run build            # Compilar TypeScript
npm start               # Servidor producción

# Base de datos
npx prisma migrate dev   # Ejecutar migraciones
npx prisma generate     # Generar cliente
npx prisma studio       # Interfaz web de BD
npx prisma db seed      # Poblar con datos
npx prisma migrate reset # Resetear BD

# Utilidades
npm run lint            # Ejecutar ESLint
npm run type-check      # Verificar tipos
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

## 🐛 Solución de Problemas

### Error de conexión a base de datos

```bash
# Verificar que PostgreSQL esté corriendo
docker ps

# Verificar variables de entorno
cat .env

# Resetear migraciones
npx prisma migrate reset
```

### Error de permisos en uploads

```bash
# Crear directorio y dar permisos
mkdir -p uploads/cvs
chmod 755 uploads/cvs
```

### Error de dependencias

```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

## 📝 Validaciones

### Candidato

- **firstName/lastName**: Mínimo 3 caracteres, solo letras y espacios
- **email**: Formato válido y único
- **phone**: Solo números, mínimo 6 dígitos, no todos iguales
- **graduationYear**: Entre 1950 y año actual
- **totalExperience**: Entre 1 y 80 años
- **startDate/endDate**: No futuras, endDate > startDate

### Archivos CV

- **Formatos**: PDF, DOC, DOCX
- **Tamaño**: Máximo 5MB
- **Nombre**: Se genera automáticamente con timestamp

## 🔒 Seguridad

- Validación de entrada con Zod
- Sanitización de archivos subidos
- CORS configurado
- Rate limiting (recomendado para producción)
- Validación de tipos MIME

## 📊 Monitoreo

```bash
# Ver logs en tiempo real
npm run dev

# Logs de base de datos
npx prisma studio
```

## 🚀 Despliegue

### Variables de entorno para producción

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:5432/database"
PORT=3010
```

### Build para producción

```bash
npm run build
npm start
```
