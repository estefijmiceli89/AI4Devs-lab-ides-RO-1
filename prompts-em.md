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
