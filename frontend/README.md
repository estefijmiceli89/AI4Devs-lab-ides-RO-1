# Frontend - Aplicación de Gestión de Candidatos

Aplicación web React con TypeScript que proporciona una interfaz moderna para gestionar candidatos con autocompletado inteligente y validación en tiempo real.

## 🚀 Tecnologías

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool y servidor de desarrollo
- **Material-UI (MUI)** - Biblioteca de componentes
- **React Hook Form** - Manejo de formularios
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Yup** - Validación de esquemas
- **React Toastify** - Notificaciones
- **React Dropzone** - Subida de archivos

## 📋 Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- **Backend API** corriendo en `http://localhost:3010`

## 🛠️ Instalación

### 1. Navegar al directorio frontend

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno (opcional)

```bash
# Crear archivo de configuración
cp .env.example .env.local

# Editar configuraciones si es necesario
nano .env.local
```

**Variables de entorno disponibles:**

```env
# URL de la API (por defecto: http://localhost:3010)
VITE_API_URL=http://localhost:3010

# Modo de desarrollo
VITE_NODE_ENV=development
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173` o `http://localhost:5174`

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── AutocompleteField.tsx    # Campo con autocompletado
│   │   ├── Breadcrumb.tsx           # Navegación breadcrumb
│   │   ├── CandidateForm.tsx        # Formulario principal
│   │   ├── CVUpload.tsx             # Subida de archivos
│   │   └── ThemeToggle.tsx          # Cambio de tema
│   │
│   ├── hooks/               # Custom hooks
│   │   └── useAutocomplete.ts       # Hook para autocompletado
│   │
│   ├── pages/               # Páginas de la aplicación
│   │   └── Home.tsx                 # Página principal
│   │
│   ├── services/            # Servicios API
│   │   └── candidateService.ts      # Servicio de candidatos
│   │
│   ├── types/               # Tipos TypeScript
│   │   └── candidate.ts             # Tipos de candidato
│   │
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Punto de entrada
│   ├── theme.ts             # Configuración de temas
│   └── index.css            # Estilos globales
│
├── public/                  # Archivos estáticos
├── index.html              # HTML principal
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

## 🎯 Características Principales

### 🔍 Autocompletado Inteligente

- **Campos con autocompletado**: Nombre, Apellido, Institución, Título, Puesto Actual, Empresa Actual
- **Datos históricos**: Sugerencias basadas en candidatos anteriores
- **Filtrado en tiempo real**: Las opciones se filtran mientras escribes
- **Últimas 10 opciones**: Muestra las opciones más recientes al hacer clic

### ⚡ Validación en Tiempo Real

- **Validación instantánea**: Los errores aparecen mientras escribes
- **Reglas específicas**: Cada campo tiene validaciones personalizadas
- **Feedback visual**: Colores y mensajes claros para errores

### 🔔 Notificaciones

- **Toast de éxito**: Confirmación al guardar candidato
- **Toast de error**: Alertas para errores de validación o API
- **Redirección automática**: Vuelve al home después del éxito

### 📱 Interfaz Responsive

- **Material-UI**: Componentes modernos y accesibles
- **Tema claro/oscuro**: Cambio de tema dinámico
- **Diseño adaptativo**: Funciona en desktop y móvil

## 🌐 Rutas de la Aplicación

```
/ - Página principal (Home)
/candidates/add - Formulario para agregar candidato
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo con hot reload
npm run build            # Build para producción
npm run preview          # Preview del build de producción

# Calidad de código
npm run lint             # Ejecutar ESLint
npm run lint:fix         # Corregir errores de ESLint automáticamente
npm run type-check       # Verificar tipos TypeScript

# Utilidades
npm run clean            # Limpiar archivos de build
```

## 🎨 Temas y Estilos

### Configuración de Temas

```typescript
// src/theme.ts
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
  },
});
```

### Personalización

- **Colores**: Definidos en `theme.ts`
- **Componentes**: Estilos en cada componente con `sx` prop
- **Responsive**: Breakpoints de Material-UI

## 📝 Validaciones del Formulario

### Campos de Texto

- **Nombre/Apellido**: Mínimo 3 caracteres, solo letras y espacios
- **Institución/Título/Puesto**: Mínimo 3 caracteres, no solo espacios
- **Email**: Formato válido y único
- **Teléfono**: Solo números, mínimo 6 dígitos, no todos iguales

### Campos Numéricos

- **Año de graduación**: Entre 1950 y año actual, 4 dígitos
- **Años de experiencia**: Entre 1 y 80 años

### Fechas

- **Fecha de inicio**: No futura, posterior a 1950
- **Fecha de fin**: Posterior a fecha de inicio (si aplica)

### Descripción

- **Experiencia**: Mínimo 3 caracteres, permite saltos de línea y puntuación

## 🔌 Integración con API

### Servicio de Candidatos

```typescript
// src/services/candidateService.ts
export const candidateService = {
  getAllCandidates: (page, limit) => Promise,
  createCandidate: (data) => Promise,
  uploadCV: (id, file) => Promise,
};
```

### Manejo de Errores

- **Errores de red**: Notificación toast automática
- **Errores de validación**: Mostrados en campos específicos
- **Errores de servidor**: Mensajes genéricos al usuario

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch

# Tests de componentes específicos
npm test -- CandidateForm
```

### Estructura de Tests

```
src/
├── __tests__/           # Tests unitarios
├── components/
│   └── __tests__/       # Tests de componentes
└── hooks/
    └── __tests__/       # Tests de hooks
```

## 🐛 Solución de Problemas

### Error de conexión con API

```bash
# Verificar que el backend esté corriendo
curl http://localhost:3010/api/candidates

# Verificar variables de entorno
cat .env.local
```

### Error de dependencias

```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

### Error de build

```bash
# Verificar tipos
npm run type-check

# Limpiar y rebuildar
npm run clean
npm run build
```

### Puerto en uso

```bash
# Matar proceso en puerto 5173
lsof -ti:5173 | xargs kill -9

# Usar puerto específico
npm run dev -- --port 3000
```

## 🚀 Build y Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos se generan en `dist/` y están listos para servir estáticamente.

### Preview Local

```bash
npm run preview
```

### Despliegue

```bash
# Ejemplo con Netlify
npm run build
# Subir carpeta dist/

# Ejemplo con Vercel
npx vercel --prod

# Ejemplo con servidor estático
npm run build
npx serve dist
```

## 🔒 Seguridad

- **Validación client-side**: No reemplaza validación del servidor
- **Sanitización**: Inputs sanitizados antes de envío
- **HTTPS**: Recomendado para producción
- **Variables de entorno**: No exponer secrets en el frontend

## 📊 Performance

### Optimizaciones Implementadas

- **Code splitting**: Rutas cargadas dinámicamente
- **Tree shaking**: Eliminación de código no usado
- **Lazy loading**: Componentes cargados bajo demanda
- **Memoización**: Componentes optimizados con React.memo

### Métricas Recomendadas

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🎯 Próximas Mejoras

- [ ] Tests E2E con Cypress
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Autenticación y autorización
- [ ] Dashboard con estadísticas
- [ ] Exportación de datos
