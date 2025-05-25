Prompts Iniciales - Sistema ATS para Añadir Candidatos
Contexto del Proyecto
Sistema ATS (Applicant Tracking System) que permite a los reclutadores añadir y gestionar candidatos de manera eficiente.
Historia de Usuario
Como reclutador,
Quiero tener la capacidad de añadir candidatos al sistema ATS,
Para que pueda gestionar sus datos y procesos de selección de manera eficiente.
Tickets de Trabajo Definidos

TICKET 1: Base de Datos - Modelo de Candidatos
Descripción: Crear el modelo de datos y migración para almacenar información de candidatos.
Prompt para IA:
Necesito crear un modelo de datos para candidatos en un sistema ATS usando Prisma y PostgreSQL. 

El modelo debe incluir:
- id (auto-incremental)
- firstName (nombre)
- lastName (apellido) 
- email (único, obligatorio)
- phone (teléfono)

EDUCACIÓN (campos separados):
- educationLevel (enum: PRIMARY, SECONDARY, TERTIARY, UNIVERSITY, POSTGRADUATE, DOCTORATE)
- institution (institución educativa)
- degree (título/carrera)
- graduationYear (año de graduación)

EXPERIENCIA (campos separados):
- currentPosition (puesto actual)
- currentCompany (empresa actual)
- totalExperience (enum: LESS_THAN_1, ONE_TO_THREE, THREE_TO_FIVE, FIVE_TO_TEN, MORE_THAN_TEN)
- startDate (fecha inicio trabajo actual)
- isCurrentlyWorking (boolean)
- endDate (fecha fin - opcional)
- experienceDescription (descripción completa de experiencia)

- cvPath (ruta del archivo CV)
- createdAt (fecha de creación)
- updatedAt (fecha de actualización)

Por favor:
1. Crea el modelo en schema.prisma con los enums apropiados
2. Genera la migración correspondiente
3. Incluye validaciones apropiadas

TICKET 2: Backend - API para Candidatos
Descripción: Desarrollar endpoints REST para crear y obtener candidatos.
Prompt para IA:
Necesito crear una API REST para manejar candidatos en un sistema ATS usando Express.js, TypeScript y Prisma.

Requiero:
1. POST /api/candidates - Crear nuevo candidato
2. GET /api/candidates - Obtener lista de candidatos
3. Validación de datos con express-validator
4. Manejo de errores apropiado
5. Subida de archivos CV (PDF/DOCX)
6. Estructura de respuestas consistente

El modelo de candidato incluye: firstName, lastName, email, phone, educationLevel, institution, degree, graduationYear, currentPosition, currentCompany, totalExperience, startDate, isCurrentlyWorking, endDate, experienceDescription, cvPath.

Por favor implementa todos los endpoints con sus validaciones y manejo de errores.

TICKET 3: Frontend - Interfaz de Usuario
Descripción: Crear la interfaz para que los reclutadores puedan añadir candidatos.
Prompt para IA:
Necesito crear una interfaz de usuario en React con TypeScript para un sistema ATS que permita añadir candidatos.

Componentes necesarios:
1. Dashboard principal con botón "Añadir Candidato"
2. Formulario de candidato con campos:
   - Nombre y apellido
   - Email y teléfono  
   - Educación (nivel, institución, título, año)
   - Experiencia laboral (puesto actual, empresa, años totales, fechas, descripción)
   - Subida de CV (PDF/DOCX)
3. Validación de formulario
4. Mensajes de éxito/error
5. Lista de candidatos añadidos

Características:
- Diseño responsive y moderno
- Validación en tiempo real
- Manejo de estados de carga
- Integración con API backend
- Interfaz intuitiva y fácil de usar

Usa React hooks y componentes funcionales.
Criterios de Aceptación Técnicos
Base de Datos

 Modelo de candidato creado en Prisma
 Migración ejecutada correctamente
 Relaciones y validaciones implementadas

Backend

 Endpoint POST /api/candidates funcional
 Endpoint GET /api/candidates funcional
 Validación de datos implementada
 Manejo de archivos CV funcional
 Manejo de errores apropiado

Frontend

 Dashboard principal con navegación
 Formulario de candidato completo
 Validación de formulario en tiempo real
 Subida de archivos funcional
 Lista de candidatos
 Mensajes de confirmación/error
 Diseño responsive

Tecnologías Utilizadas

Frontend: React, TypeScript, CSS/Styled Components
Backend: Node.js, Express.js, TypeScript
Base de Datos: PostgreSQL con Prisma ORM
Herramientas: Docker para PostgreSQL

Notas de Implementación

Todas las implementaciones fueron realizadas con asistencia de IA (Cursor/Copilot)
Se priorizó la funcionalidad y experiencia de usuario
El código sigue las mejores prácticas de cada tecnología
Se implementaron validaciones tanto en frontend como backend para mayor seguridad