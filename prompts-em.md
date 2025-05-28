Prompts Iniciales - Sistema ATS para Añadir Candidatos
📋 Historia de Usuario Principal
Como reclutador del sistema ATS,
Quiero tener la capacidad de añadir candidatos al sistema de manera eficiente,
Para que pueda gestionar sus datos y procesos de selección de forma organizada y profesional.
🎯 Valor de Negocio

Centralizar información de candidatos
Acelerar el proceso de selección
Reducir tiempo de entrenamiento para nuevos reclutadores
Mejorar la experiencia del usuario final

📖 Épica: Gestión de Candidatos ATS
🏷️ Criterios de Aceptación Generales
Funcionalidad Core

Accesibilidad de la función: Botón/enlace claramente visible para añadir candidato desde dashboard principal
Formulario completo: Captura todos los datos estructurados del candidato
Carga de documentos: Soporte para CV en formato PDF o DOCX
Confirmación de éxito: Mensaje claro tras añadir candidato exitosamente

Validación y Manejo de Errores

Validación de datos: Campos obligatorios, formato de email válido, validaciones de negocio
Manejo de excepciones: Mensajes apropiados para errores de servidor/conexión
Feedback visual: Indicadores de carga, estados de error y éxito

Experiencia de Usuario

Interfaz intuitiva: Fácil de usar, minimiza tiempo de entrenamiento
Autocompletado: Funcionalidades para campos de educación y experiencia
Diseño moderno: Estilo minimalista y profesional
Accesibilidad: Compatible con diferentes dispositivos y navegadores

Calidad Técnica

Buenas prácticas Frontend: Código limpio, componentización, manejo de estado
Buenas prácticas Backend: API RESTful, validaciones, seguridad
Buenas prácticas Base de Datos: Normalización, índices, constraints

🎫 TICKET 1: Base de Datos - Modelo de Candidatos
📝 Historia de Usuario
Como desarrollador del sistema,
Quiero crear un modelo de datos robusto para candidatos,
Para que la información se almacene de forma estructurada y eficiente.
✅ Criterios de Aceptación

Modelo de candidato creado en Prisma con todos los campos requeridos
Enum definido para educación (experiencia ahora es numérica)
Validaciones a nivel de base de datos implementadas
Índices apropiados para consultas frecuentes
Migración ejecutada exitosamente
Datos de prueba disponibles para testing
Tests unitarios de modelo implementados y pasando

🤖 Prompt para IA
Necesito crear un modelo de datos profesional para candidatos en un sistema ATS usando Prisma y PostgreSQL, siguiendo las mejores prácticas de base de datos.

REQUERIMIENTOS DEL MODELO:

📊 CAMPOS BÁSICOS:

- id (auto-incremental, primary key)
- firstName (string, obligatorio, max 100 chars)
- lastName (string, obligatorio, max 100 chars)
- email (string, único, obligatorio, validación email)
- phone (string, obligatorio, formato internacional)

📚 EDUCACIÓN (campos estructurados):

- educationLevel (enum: PRIMARY, SECONDARY, TERTIARY, UNIVERSITY, POSTGRADUATE, DOCTORATE)
- institution (string, max 200 chars)
- degree (string, max 150 chars)
- graduationYear (integer, entre 1950 y año actual + 4)

💼 EXPERIENCIA LABORAL (campos estructurados):

- currentPosition (string, max 100 chars)
- currentCompany (string, max 150 chars)
- totalExperience (integer, años de experiencia total, min 0, max 50)
- startDate (date, no mayor a fecha actual)
- isCurrentlyWorking (boolean, default true)
- endDate (date, opcional, debe ser mayor a startDate si se especifica)
- experienceDescription (text, max 2000 chars)

📎 ARCHIVOS Y METADATA:

- cvPath (string, opcional, ruta del archivo CV)
- createdAt (datetime, auto-generado)
- updatedAt (datetime, auto-actualizado)

MEJORES PRÁCTICAS A IMPLEMENTAR:
✅ Constraints de base de datos apropiados
✅ Índices en campos de búsqueda frecuente (email, nombre)
✅ Validaciones de integridad referencial
✅ Nombres de campos consistentes (camelCase)
✅ Comentarios descriptivos en el esquema
✅ Configuración de cascade deletes si aplica

TAREAS ESPECÍFICAS:

1. Crear modelo Candidate en schema.prisma con todos los campos y constraints
2. Definir enum EducationLevel (totalExperience ahora es integer)
3. Agregar validaciones y reglas de negocio
4. Generar y ejecutar migración
5. Crear seed script con datos de prueba realistas
6. Documentar el modelo con comentarios
7. **Escribir tests unitarios para validaciones del modelo**

Por favor implementa el modelo siguiendo las mejores prácticas de Prisma y PostgreSQL.

🎫 TICKET 2: Backend - API para Gestión de Candidatos
📝 Historia de Usuario
Como frontend de la aplicación,
Quiero consumir APIs robustas para gestionar candidatos,
Para que pueda ofrecer una experiencia de usuario fluida y confiable.
✅ Criterios de Aceptación

Endpoint POST /api/candidates - Crear candidato con validaciones completas
Endpoint GET /api/candidates - Listar candidatos con paginación
Endpoint GET /api/candidates/:id - Obtener candidato específico
Manejo de archivos CV (upload, validación, almacenamiento)
Validaciones robustas con mensajes descriptivos
Manejo de errores consistente y profesional
Logging apropiado para debugging
Documentación de API con ejemplos
Tests unitarios y de integración para todos los endpoints

🤖 Prompt para IA
Necesito crear una API REST profesional para manejar candidatos en un sistema ATS usando Express.js, TypeScript y Prisma, siguiendo las mejores prácticas de desarrollo backend.

ENDPOINTS REQUERIDOS:

🔧 POST /api/candidates - Crear candidato

- Validación completa de todos los campos
- Manejo de archivos CV (PDF/DOCX, max 5MB)
- Sanitización de datos de entrada
- Respuesta estructurada con candidato creado

📋 GET /api/candidates - Listar candidatos

- Paginación (limit, offset)
- Filtros opcionales (nombre, email, educación, experiencia)
- Ordenamiento (por fecha, nombre, etc.)
- Respuesta con metadata de paginación

👤 GET /api/candidates/:id - Obtener candidato específico

- Validación de ID válido
- Respuesta completa del candidato
- Manejo de candidato no encontrado

📎 POST /api/candidates/:id/cv - Subir/actualizar CV

- Validación de archivo (tipo, tamaño)
- Almacenamiento seguro
- Actualización de cvPath en base de datos

🧪 TESTING REQUERIDO:

- Tests unitarios para controladores
- Tests de integración para endpoints
- Tests de validación de datos
- Tests de manejo de archivos
- Tests de manejo de errores
- Mocking de base de datos para tests
- Coverage mínimo del 80%

MEJORES PRÁCTICAS A IMPLEMENTAR:

🛡️ VALIDACIÓN Y SEGURIDAD:

- express-validator para validación de datos
- Sanitización de inputs
- Rate limiting
- CORS configurado apropiadamente
- Validación de tipos de archivos
- Prevención de ataques comunes (XSS, injection)

📝 ESTRUCTURA DE RESPUESTAS:

- Formato consistente: { success, data, message, errors }
- Códigos de estado HTTP apropiados
- Mensajes de error descriptivos y user-friendly
- Respuestas de éxito con datos relevantes

🔍 MANEJO DE ERRORES:

- Try-catch en todos los endpoints
- Logging estructurado (winston o similar)
- Errores de validación detallados
- Manejo de errores de base de datos
- Respuestas de error consistentes

📂 MANEJO DE ARCHIVOS:

- Multer para upload de archivos
- Validación de tipo MIME
- Límites de tamaño configurables
- Almacenamiento seguro (local o cloud)
- Nombres de archivo únicos

🏗️ ARQUITECTURA:

- Separación en controladores, servicios, middlewares
- Validadores reutilizables
- Interfaces TypeScript apropiadas
- Configuración centralizada
- Testing helpers incluidos

TAREAS ESPECÍFICAS:

1. Configurar Express con TypeScript y middlewares
2. Crear controladores para cada endpoint
3. Implementar validadores con express-validator
4. Configurar manejo de archivos con multer
5. Crear servicios para lógica de negocio
6. Implementar manejo de errores globalizado
7. Agregar logging y monitoreo
8. Crear documentación de API
9. Escribir tests unitarios básicos

Genera código limpio, bien documentado y siguiendo las mejores prácticas de Node.js/Express.

🎫 TICKET 3: Frontend - Interface de Usuario para Candidatos
📝 Historia de Usuario
Como reclutador,
Quiero una interfaz moderna e intuitiva para añadir candidatos,
Para que pueda completar la tarea de forma eficiente y sin errores.
✅ Criterios de Aceptación

Dashboard principal con acceso claro a "Añadir Candidato"
Formulario completo con todos los campos estructurados
Validación en tiempo real con feedback visual
Subida de archivos drag-and-drop
Autocompletado en campos aplicables
Mensajes de éxito/error profesionales
Diseño responsive y accesible
Lista de candidatos con funcionalidades básicas
Experiencia de usuario fluida y moderna
Tests unitarios de componentes críticos implementados

🤖 Prompt para IA
Necesito crear una interfaz de usuario moderna y profesional en React con TypeScript para un sistema ATS de gestión de candidatos, siguiendo las mejores prácticas de desarrollo frontend.

COMPONENTES REQUERIDOS:

🏠 DASHBOARD PRINCIPAL:

- Header con navegación y branding
- Sidebar o navegación principal
- Botón prominente "Añadir Candidato"
- Resumen de estadísticas (candidatos totales, recientes)
- Lista de candidatos recientes con acciones básicas

📝 FORMULARIO DE CANDIDATO:
Secciones organizadas:

1. Información Personal (nombre, apellido, email, teléfono)
2. Educación (nivel, institución, título, año)
3. Experiencia Laboral (puesto, empresa, años numéricos, fechas, descripción)
4. Carga de CV (drag-and-drop, PDF/DOCX)

📋 LISTA DE CANDIDATOS:

- Tabla responsive con datos clave
- Paginación funcional
- Filtros básicos (nombre, email, educación)
- Acciones por candidato (ver, editar, descargar CV)

CARACTERÍSTICAS UX/UI:

🎨 DISEÑO MODERNO Y MINIMALISTA:

- Paleta de colores profesional y limpia
- Tipografía clara y legible
- Espaciado consistente y breathing room
- Iconografía coherente (Lucide React o similar)
- Micro-interacciones sutiles

📱 RESPONSIVE Y ACCESIBLE:

- Mobile-first approach
- Breakpoints apropiados (sm, md, lg, xl)
- Navegación adaptativa
- Alto contraste y legibilidad
- Soporte para screen readers
- Navegación por teclado

⚡ EXPERIENCIA DE USUARIO:

- Loading states en todas las acciones
- Feedback visual inmediato
- Transiciones suaves
- Error boundaries para manejo de errores
- Confirmaciones para acciones destructivas

FUNCIONALIDADES AVANZADAS:

✨ VALIDACIÓN INTELIGENTE:

- Validación en tiempo real (no solo en submit)
- Mensajes de error contextual
- Indicadores visuales de campos válidos/inválidos
- Validación de email en tiempo real
- Formato de teléfono con máscara

🔍 AUTOCOMPLETADO:

- Instituciones educativas comunes
- Empresas populares
- Títulos/carreras frecuentes
- Implementar con datos mock inicial

📎 MANEJO DE ARCHIVOS:

- Drag and drop area elegante
- Preview de archivos seleccionados
- Validación de tipo y tamaño
- Progress indicator para uploads
- Manejo de errores de subida

🛠️ MEJORES PRÁCTICAS FRONTEND:

📦 ARQUITECTURA:

- Componentes funcionales con hooks
- Custom hooks para lógica reutilizable
- Context API para estado global
- Separación de concerns clara
- Interfaces TypeScript bien definidas

🎯 PERFORMANCE:

- Lazy loading de componentes
- Memoización donde corresponda
- Optimistic updates
- Debouncing en búsquedas
- Paginación eficiente

🧪 CALIDAD Y TESTING:

- PropTypes o TypeScript interfaces
- Error boundaries apropiados
- Loading y error states
- Accesibilidad (aria-labels, roles)
- SEO básico (meta tags)
- Suite de tests completa
- Mocking apropiado de APIs
- Test coverage reports

TECNOLOGÍAS A USAR:

- React 18+ con TypeScript
- React Hook Form para formularios
- React Query/SWR para API calls
- Tailwind CSS o Styled Components
- Lucide React para iconos
- React Router para navegación
- **Jest + React Testing Library para testing**
- **MSW (Mock Service Worker) para mocking APIs**

TAREAS ESPECÍFICAS:

1. Configurar estructura del proyecto y routing
2. Crear componentes base (Layout, Header, Sidebar)
3. Implementar Dashboard con estadísticas
4. Crear formulario de candidato con validaciones
5. Implementar subida de archivos con drag-and-drop
6. Crear lista de candidatos con paginación
7. Agregar autocompletado en campos relevantes
8. Implementar responsive design
9. Agregar loading states y error handling
10. Crear confirmaciones y mensajes de feedback
11. **Configurar testing con Jest y React Testing Library**
12. **Escribir tests unitarios para componentes críticos**
13. **Implementar tests de integración para flujos principales**
14. **Configurar coverage reports y CI/CD para tests**

El resultado debe ser una aplicación profesional que un reclutador pueda usar intuitivamente sin entrenamiento previo.

🔧 Consideraciones Técnicas Adicionales
📋 Validaciones Específicas

Email: Formato RFC 5322 válido
Años de experiencia: Campo numérico (0-50 años)
Fechas: Lógica de negocio (fecha fin >= fecha inicio)
Archivos: MIME type validation, tamaño máximo 5MB
Campos obligatorios: firstName, lastName, email, phone

🚀 Performance y Optimización

Lazy loading de componentes pesados
Paginación server-side para listas grandes
Caching inteligente de autocompletados
Optimistic updates para mejor UX
Compresión de archivos subidos

🔒 Seguridad

Sanitización de inputs en backend
Validación de archivos subidos
Rate limiting en APIs críticas
CORS configurado apropiadamente
Logging de acciones sensibles

📊 Definición de Terminado (DoD)
Para cada ticket:

Código implementado y funcionando
Validaciones implementadas y testeadas
Manejo de errores apropiado
Tests unitarios escritos y pasando (coverage mínimo 75%)
Tests de integración para flujos críticos
Documentación actualizada
Review de código completado
Deploy en ambiente de desarrollo exitoso

Para la épica completa:

Flujo end-to-end funcionando
Todos los criterios de aceptación cumplidos
Suite completa de tests implementada y pasando
Coverage de código >= 75% en cada capa
Performance acceptable (< 3s load time)
Compatibilidad cross-browser verificada
Accesibilidad básica implementada
Documentación de usuario creada
CI/CD pipeline configurado y funcionando

🎯 Métricas de Éxito

Funcionalidad: 100% de criterios de aceptación cumplidos
Testing: Coverage >= 75% en todas las capas, 0 tests fallando
Performance: Tiempo de carga < 3 segundos
UX: Tarea completable por usuario nuevo en < 5 minutos
Calidad: 0 errores críticos en testing manual
Accesibilidad: Cumple estándares WCAG AA básicos

---

# 🚀 PROMPTS PARA REPLICAR APLICACIÓN ACTUAL EN UNA ITERACIÓN

## 🌟 PROMPT GLOBAL - APLICACIÓN COMPLETA ATS

```markdown
**OBJETIVO:** Crear un sistema ATS (Applicant Tracking System) completo para gestión de candidatos en una sola iteración.

**STACK TECNOLÓGICO ACTUAL:**

- **Backend:** Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, Multer, Zod
- **Frontend:** React 19, TypeScript, Vite, Material-UI, React Hook Form, Yup, React Router
- **Base de Datos:** PostgreSQL con Docker
- **Funcionalidades:** CRUD candidatos, subida de CVs, autocompletado inteligente, validación en tiempo real

**ARQUITECTURA DEL PROYECTO:**
```

/
├── backend/ # API REST con Express + TypeScript
├── frontend/ # React SPA con Material-UI
├── docker-compose.yml # PostgreSQL containerizado
└── README.md # Documentación completa

````

**FUNCIONALIDADES CORE IMPLEMENTADAS:**
✅ **Backend:**
- API REST completa (/api/candidates, /api/candidates/:id/cv)
- Validaciones con Zod y manejo de errores
- Subida y descarga de CVs (PDF/DOCX, max 5MB)
- Paginación, filtrado y búsqueda
- Base de datos normalizada con Prisma
- CORS configurado para desarrollo

✅ **Frontend:**
- Formulario de candidato con validación en tiempo real
- Autocompletado inteligente en 6 campos (nombre, apellido, institución, título, puesto actual, empresa actual)
- Subida de CVs con drag & drop
- Notificaciones toast para feedback
- Validación de campos avanzada (teléfonos únicos, espacios permitidos)
- Navegación y routing completo
- Diseño responsive con Material-UI

✅ **Base de Datos:**
- Modelo Candidate completo con 18 campos
- Enums para niveles educativos en español
- Índices optimizados para búsquedas
- Migraciones y seeds configurados

**ESPECIFICACIONES TÉCNICAS DETALLADAS:**

### 📊 MODELO DE DATOS (Prisma Schema):
```prisma
model Candidate {
  id                    Int             @id @default(autoincrement())
  firstName             String          @db.VarChar(100)
  lastName              String          @db.VarChar(100)
  email                 String          @unique
  phone                 String
  educationLevel        EducationLevel
  institution           String          @db.VarChar(200)
  degree                String          @db.VarChar(150)
  graduationYear        Int
  currentPosition       String          @db.VarChar(100)
  currentCompany        String          @db.VarChar(150)
  totalExperience       Int
  startDate             DateTime
  isCurrentlyWorking    Boolean         @default(true)
  endDate               DateTime?
  experienceDescription String          @db.Text
  cvPath                String?
  createdAt             DateTime        @default(now())
  updatedAt             DateTime        @updatedAt

  @@index([email])
  @@index([firstName, lastName])
}

enum EducationLevel {
  Primaria
  Secundaria
  Terciaria
  Universitaria
  Posgrado
  Doctorado
}
````

### 🔧 API ENDPOINTS:

```
GET    /api/candidates          # Listar con paginación
POST   /api/candidates          # Crear candidato
GET    /api/candidates/:id      # Obtener por ID
PUT    /api/candidates/:id      # Actualizar candidato
DELETE /api/candidates/:id      # Eliminar candidato
POST   /api/candidates/:id/cv   # Subir CV
GET    /api/candidates/:id/cv   # Descargar CV
```

### 🎨 COMPONENTES FRONTEND:

```
src/
├── components/
│   ├── CandidateForm.tsx        # Formulario principal con validaciones
│   │   ├── CVUpload.tsx             # Subida de archivos drag & drop
│   │   └── AutocompleteField.tsx     # Campo con autocompletado
│   ├── hooks/
│   │   └── useAutocomplete.ts        # Hook para autocompletado
│   ├── services/
│   │   └── candidateService.ts       # API calls
│   ├── types/
│   │   └── candidate.ts              # Interfaces TypeScript
│   ├── pages/
│   │   └── AddCandidate.tsx          # Página principal
│   ├── theme.ts                      # Material-UI theme
│   ├── App.tsx                       # Router setup
│   └── main.tsx                      # Entry point
├── public/
├── index.html
└── package.json
```

**DEPENDENCIAS EXACTAS:**

```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@hookform/resolvers": "^5.0.1",
    "@mui/icons-material": "^7.1.0",
    "@mui/material": "^7.1.0",
    "axios": "^1.9.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.56.4",
    "react-router-dom": "^7.6.0",
    "react-toastify": "^11.0.5",
    "yup": "^1.6.1"
  }
}
```

**FORMULARIO CON VALIDACIÓN AVANZADA:**

```typescript
// Schema Yup con validaciones específicas
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras y espacios')
    .test('not-only-spaces', 'No puede contener solo espacios en blanco', (value) => {
      if (!value) return true;
      return value.trim().length > 0;
    }),
  phone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'Solo números')
    .min(6, 'Debe tener al menos 6 números')
    .test('not-all-same', 'Los números no pueden ser todos iguales', (value) => {
      if (!value) return true;
      return !/^(\d)\1{5,}$/.test(value);
    }),
  // ... resto de validaciones
});

// Configuración React Hook Form
const {
  control,
  handleSubmit,
  formState: { errors },
  trigger,
} = useForm<CreateCandidateDto>({
  resolver: yupResolver(schema),
  mode: 'onChange', // Validación en tiempo real
  reValidateMode: 'onChange', // Re-validación en tiempo real
});
```

**AUTOCOMPLETADO INTELIGENTE:**

```typescript
// Hook useAutocomplete
export const useAutocomplete = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await candidateService.getCandidates();
        setCandidates(response.data || []);
      } catch (error) {
        console.error('Error fetching candidates for autocomplete:', error);
      }
    };

    fetchCandidates();
  }, []);

  const getFieldOptions = (field: keyof Candidate, limit: number = 10): string[] => {
    const uniqueValues = [
      ...new Set(
        candidates
          .map((candidate) => candidate[field])
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0),
      ),
    ];

    return uniqueValues.slice(-limit);
  };

  const getFilteredOptions = (field: keyof Candidate, inputValue: string): string[] => {
    const allOptions = getFieldOptions(field, 50);
    if (!inputValue.trim()) return allOptions.slice(0, 10);

    return allOptions
      .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 10);
  };

  return { getFieldOptions, getFilteredOptions };
};

// Componente AutocompleteField
interface AutocompleteFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  trigger: UseFormTrigger<any>;
  options: string[];
  onInputChange: (value: string) => void;
  onValueChange: (value: string) => void;
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  name,
  label,
  control,
  error,
  trigger,
  options,
  onInputChange,
  onValueChange,
}) => {
  // Implementación completa del autocompletado con Material-UI
  // Incluyendo manejo de clicks, filtrado en tiempo real, y validación
};
```

**UPLOAD DE CVS CON DRAG & DROP:**

```typescript
export const CVUpload = ({ onFileSelect }: CVUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validar tipo de archivo
      if (
        ![
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type)
      ) {
        setUploadStatus('error');
        setErrorMessage('Solo se permiten archivos PDF y DOCX');
        return;
      }

      // Validar tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('error');
        setErrorMessage('El archivo no debe superar los 5MB');
        return;
      }

      setSelectedFile(file);
      setUploadStatus('success');
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  // UI con Paper, iconos y estados visuales
};
```

**NOTIFICACIONES TOAST:**

```typescript
// En App.tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        {/* routes */}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

// En CandidateForm.tsx
import { toast } from 'react-toastify';

const onSubmit = async (data: CreateCandidateDto) => {
  try {
    // ... lógica de envío
    toast.success('¡Candidato agregado exitosamente!');
    setShouldRedirect(true);
  } catch (error) {
    // ... manejo de errores
  }
};

const onInvalidSubmit = () => {
  toast.error('No se puede guardar el candidato porque hay al menos un error en el formulario');
};
```

**CAMPOS CON AUTOCOMPLETADO:**
Implementar autocompletado en estos 6 campos específicos:

1. `firstName` (nombre)
2. `lastName` (apellido)
3. `institution` (institución)
4. `degree` (título)
5. `currentPosition` (puesto actual)
6. `currentCompany` (empresa actual)

**REDIRECCIÓN AUTOMÁTICA:**

```typescript
const [shouldRedirect, setShouldRedirect] = useState(false);

useEffect(() => {
  if (shouldRedirect) {
    const timer = setTimeout(() => {
      window.location.replace('/');
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [shouldRedirect]);
```

**LAYOUT Y DISEÑO:**

- Formulario en Container con maxWidth="sm"
- Campos organizados en Grid con spacing apropiado
- Validación visual con colores Material-UI
- Loading states durante envío
- Responsive design completo

**API SERVICE:**

```typescript
const API_URL = 'http://localhost:3010/api';

export const candidateService = {
  async createCandidate(data: CreateCandidateDto) {
    const response = await axios.post(`${API_URL}/candidates`, data);
    return response.data;
  },

  async uploadCV(id: number, file: File) {
    const formData = new FormData();
    formData.append('cv', file);
    const response = await axios.post(`${API_URL}/candidates/${id}/cv`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getCandidates() {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
  },
};
```

Implementa el frontend completo con estas especificaciones exactas, asegurando una experiencia de usuario fluida y profesional.

````

---

## 🔧 PROMPT ESPECÍFICO - MODELO DE DATOS Y BACKEND

```markdown
**OBJETIVO:** Implementar backend completo con API REST, base de datos y manejo de archivos para sistema ATS.

**STACK:** Node.js + Express + TypeScript + Prisma + PostgreSQL + Multer + Zod

**ESTRUCTURA DEL BACKEND:**
````

backend/
├── src/
│ ├── controllers/
│ │ ├── candidate.controller.ts # CRUD operations
│ │ └── cv.controller.ts # File upload/download
│ ├── routes/
│ │ ├── candidate.routes.ts # API routes
│ │ └── cv.routes.ts # CV routes
│ ├── middleware/
│ │ └── upload.middleware.ts # Multer configuration
│ ├── types/
│ │ └── candidate.ts # TypeScript interfaces
│ ├── app.ts # Express app setup
│ └── index.ts # Server entry point
├── prisma/
│ ├── schema.prisma # Database schema
│ ├── seed.ts # Test data
│ └── migrations/ # DB migrations
├── uploads/
│ └── cvs/ # CV files storage
└── package.json

````

**SCHEMA PRISMA EXACTO:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Candidate {
  id                    Int             @id @default(autoincrement())
  firstName             String          @db.VarChar(100)
  lastName              String          @db.VarChar(100)
  email                 String          @unique
  phone                 String
  educationLevel        EducationLevel
  institution           String          @db.VarChar(200)
  degree                String          @db.VarChar(150)
  graduationYear        Int
  currentPosition       String          @db.VarChar(100)
  currentCompany        String          @db.VarChar(150)
  totalExperience       Int
  startDate             DateTime
  isCurrentlyWorking    Boolean         @default(true)
  endDate               DateTime?
  experienceDescription String          @db.Text
  cvPath                String?
  createdAt             DateTime        @default(now())
  updatedAt             DateTime        @updatedAt

  @@index([email])
  @@index([firstName, lastName])
}

enum EducationLevel {
  Primaria
  Secundaria
  Terciaria
  Universitaria
  Posgrado
  Doctorado
}
````

**API ENDPOINTS REQUERIDOS:**

```typescript
// GET /api/candidates - Listar con paginación
interface GetCandidatesQuery {
  page?: number;
  limit?: number;
}
Response: { data: Candidate[], meta: { total, page, limit, totalPages } }

// POST /api/candidates - Crear candidato
Body: CreateCandidateDto
Response: Candidate

// GET /api/candidates/:id - Obtener por ID
Response: Candidate

// PUT /api/candidates/:id - Actualizar
Body: Partial<CreateCandidateDto>
Response: Candidate

// DELETE /api/candidates/:id - Eliminar
Response: { message: string }

// POST /api/candidates/:id/cv - Subir CV
FormData: { cv: File }
Response: { message: string, candidate: Candidate }

// GET /api/candidates/:id/cv - Descargar CV
Response: File download
```

**VALIDACIONES CON ZOD:**

```typescript
const candidateSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/),
  lastName: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/),
  email: z.string().email(),
  phone: z
    .string()
    .min(6)
    .regex(/^[0-9]+$/),
  educationLevel: z.enum([
    'Primaria',
    'Secundaria',
    'Terciaria',
    'Universitaria',
    'Posgrado',
    'Doctorado',
  ]),
  institution: z.string().min(1).max(200),
  degree: z.string().min(1).max(150),
  graduationYear: z
    .number()
    .min(1950)
    .max(new Date().getFullYear() + 4),
  currentPosition: z.string().min(1).max(100),
  currentCompany: z.string().min(1).max(150),
  totalExperience: z.number().min(0).max(50),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date))),
  isCurrentlyWorking: z.boolean(),
  endDate: z.string().nullable(),
  experienceDescription: z.string().min(10).max(2000),
});
```

**CONFIGURACIÓN MULTER:**

```typescript
const storage = multer.diskStorage({
  destination: 'uploads/cvs/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `cv-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  cb(null, allowedTypes.includes(file.mimetype));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
```

**SEED DATA REALISTA:**
Incluir al menos 15 candidatos con datos variados en español, algunos con CV paths simulados.

**CONFIGURACIÓN CORS:**

```typescript
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
```

**MANEJO DE ERRORES:**
Implementar middleware global de manejo de errores con logging estructurado.

**DEPENDENCIAS PACKAGE.JSON:**

```json
{
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "multer": "^2.0.0",
    "zod": "^3.25.27"
  },
  "devDependencies": {
    "@types/express": "^4.17.9",
    "@types/multer": "^1.4.12",
    "@types/node": "^22.15.21",
    "prisma": "^5.13.0",
    "ts-node-dev": "^1.1.6",
    "typescript": "^5.8.3"
  }
}
```

**SCRIPTS NPM:**

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:generate": "npx prisma generate",
    "prisma:seed": "ts-node prisma/seed.ts"
  }
}
```

Implementa el backend completo con estas especificaciones exactas, incluyendo manejo robusto de errores, validaciones y documentación API.

````

---

## 🎨 PROMPT ESPECÍFICO - FRONTEND REACT

```markdown
**OBJETIVO:** Crear interfaz React completa con formulario avanzado, autocompletado inteligente y validación en tiempo real.

**STACK:** React 19 + TypeScript + Vite + Material-UI + React Hook Form + Yup + React Router

**ESTRUCTURA DEL FRONTEND:**
````

frontend/
├── src/
│ ├── components/
│ │ ├── CandidateForm.tsx # Formulario principal
│ │ ├── CVUpload.tsx # Drag & drop para CVs
│ │ └── AutocompleteField.tsx # Campo con autocompletado
│ ├── hooks/
│ │ └── useAutocomplete.ts # Hook para autocompletado
│ ├── services/
│ │ └── candidateService.ts # API calls
│ ├── types/
│ │ └── candidate.ts # Interfaces TypeScript
│ ├── pages/
│ │ └── AddCandidate.tsx # Página principal
│ ├── theme.ts # Material-UI theme
│ ├── App.tsx # Router setup
│ └── main.tsx # Entry point
├── public/
├── index.html
└── package.json

````

**DEPENDENCIAS EXACTAS:**
```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@hookform/resolvers": "^5.0.1",
    "@mui/icons-material": "^7.1.0",
    "@mui/material": "^7.1.0",
    "axios": "^1.9.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.56.4",
    "react-router-dom": "^7.6.0",
    "react-toastify": "^11.0.5",
    "yup": "^1.6.1"
  }
}
````

**FORMULARIO CON VALIDACIÓN AVANZADA:**

```typescript
// Schema Yup con validaciones específicas
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'Debe tener al menos 3 letras')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Solo letras y espacios')
    .test('not-only-spaces', 'No puede contener solo espacios en blanco', (value) => {
      if (!value) return true;
      return value.trim().length > 0;
    }),
  phone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'Solo números')
    .min(6, 'Debe tener al menos 6 números')
    .test('not-all-same', 'Los números no pueden ser todos iguales', (value) => {
      if (!value) return true;
      return !/^(\d)\1{5,}$/.test(value);
    }),
  // ... resto de validaciones
});

// Configuración React Hook Form
const {
  control,
  handleSubmit,
  formState: { errors },
  trigger,
} = useForm<CreateCandidateDto>({
  resolver: yupResolver(schema),
  mode: 'onChange', // Validación en tiempo real
  reValidateMode: 'onChange', // Re-validación en tiempo real
});
```

**AUTOCOMPLETADO INTELIGENTE:**

```typescript
// Hook useAutocomplete
export const useAutocomplete = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await candidateService.getCandidates();
        setCandidates(response.data || []);
      } catch (error) {
        console.error('Error fetching candidates for autocomplete:', error);
      }
    };

    fetchCandidates();
  }, []);

  const getFieldOptions = (field: keyof Candidate, limit: number = 10): string[] => {
    const uniqueValues = [
      ...new Set(
        candidates
          .map((candidate) => candidate[field])
          .filter((value): value is string => typeof value === 'string' && value.trim().length > 0),
      ),
    ];

    return uniqueValues.slice(-limit);
  };

  const getFilteredOptions = (field: keyof Candidate, inputValue: string): string[] => {
    const allOptions = getFieldOptions(field, 50);
    if (!inputValue.trim()) return allOptions.slice(0, 10);

    return allOptions
      .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 10);
  };

  return { getFieldOptions, getFilteredOptions };
};

// Componente AutocompleteField
interface AutocompleteFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  trigger: UseFormTrigger<any>;
  options: string[];
  onInputChange: (value: string) => void;
  onValueChange: (value: string) => void;
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  name,
  label,
  control,
  error,
  trigger,
  options,
  onInputChange,
  onValueChange,
}) => {
  // Implementación completa del autocompletado con Material-UI
  // Incluyendo manejo de clicks, filtrado en tiempo real, y validación
};
```

**UPLOAD DE CVS CON DRAG & DROP:**

```typescript
export const CVUpload = ({ onFileSelect }: CVUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validar tipo de archivo
      if (
        ![
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type)
      ) {
        setUploadStatus('error');
        setErrorMessage('Solo se permiten archivos PDF y DOCX');
        return;
      }

      // Validar tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadStatus('error');
        setErrorMessage('El archivo no debe superar los 5MB');
        return;
      }

      setSelectedFile(file);
      setUploadStatus('success');
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  // UI con Paper, iconos y estados visuales
};
```

**NOTIFICACIONES TOAST:**

```typescript
// En App.tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        {/* routes */}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

// En CandidateForm.tsx
import { toast } from 'react-toastify';

const onSubmit = async (data: CreateCandidateDto) => {
  try {
    // ... lógica de envío
    toast.success('¡Candidato agregado exitosamente!');
    setShouldRedirect(true);
  } catch (error) {
    // ... manejo de errores
  }
};

const onInvalidSubmit = () => {
  toast.error('No se puede guardar el candidato porque hay al menos un error en el formulario');
};
```

**CAMPOS CON AUTOCOMPLETADO:**
Implementar autocompletado en estos 6 campos específicos:

1. `firstName` (nombre)
2. `lastName` (apellido)
3. `institution` (institución)
4. `degree` (título)
5. `currentPosition` (puesto actual)
6. `currentCompany` (empresa actual)

**REDIRECCIÓN AUTOMÁTICA:**

```typescript
const [shouldRedirect, setShouldRedirect] = useState(false);

useEffect(() => {
  if (shouldRedirect) {
    const timer = setTimeout(() => {
      window.location.replace('/');
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [shouldRedirect]);
```

**LAYOUT Y DISEÑO:**

- Formulario en Container con maxWidth="sm"
- Campos organizados en Grid con spacing apropiado
- Validación visual con colores Material-UI
- Loading states durante envío
- Responsive design completo

**API SERVICE:**

```typescript
const API_URL = 'http://localhost:3010/api';

export const candidateService = {
  async createCandidate(data: CreateCandidateDto) {
    const response = await axios.post(`${API_URL}/candidates`, data);
    return response.data;
  },

  async uploadCV(id: number, file: File) {
    const formData = new FormData();
    formData.append('cv', file);
    const response = await axios.post(`${API_URL}/candidates/${id}/cv`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async getCandidates() {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
  },
};
```

Implementa el frontend completo con estas especificaciones exactas, asegurando una experiencia de usuario fluida y profesional.

````

---

## 📝 NOTAS DE IMPLEMENTACIÓN

**ORDEN DE DESARROLLO RECOMENDADO:**
1. Setup inicial del proyecto y configuración
2. Base de datos y backend API
3. Frontend básico con formulario
4. Integración y funcionalidades avanzadas
5. Testing y refinamiento

**PUNTOS CRÍTICOS DE VALIDACIÓN:**
- ✅ Autocompletado funcionando en 6 campos específicos
- ✅ Validación en tiempo real (onChange mode)
- ✅ Upload de CVs con validación de tipo y tamaño
- ✅ Notificaciones toast para feedback
- ✅ Redirección automática después de guardar
- ✅ API endpoints todos operativos
- ✅ Base de datos poblada con datos de prueba

**CONFIGURACIÓN DE DESARROLLO:**
```bash
# Terminal 1: Base de datos
docker-compose up -d

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend
cd frontend && npm run dev
````

**URLs DE DESARROLLO:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3010/api
- Base de datos: localhost:5432

Estos prompts están diseñados para replicar exactamente la aplicación actual funcionando, incluyendo todas las características avanzadas implementadas.
