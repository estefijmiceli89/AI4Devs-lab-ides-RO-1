# 📄 Documentación - Modelo de Candidatos (Prisma)

## Descripción General

El modelo `Candidate` representa a un candidato en el sistema ATS. Está diseñado para almacenar información personal, educativa, laboral y de archivos de manera estructurada y eficiente, siguiendo las mejores prácticas de bases de datos y Prisma.

---

## Estructura del Modelo

**Archivo:** `backend/prisma/schema.prisma`

### Enum: EducationLevel

- `PRIMARY`: Primaria
- `SECONDARY`: Secundaria
- `TERTIARY`: Terciaria
- `UNIVERSITY`: Universitaria
- `POSTGRADUATE`: Posgrado
- `DOCTORATE`: Doctorado

### Modelo: Candidate

| Campo                   | Tipo           | Descripción                                                                                  | Validación/Constraint                  |
|-------------------------|----------------|----------------------------------------------------------------------------------------------|----------------------------------------|
| id                      | Int            | ID autoincremental                                                                           | Primary Key                            |
| firstName               | String         | Nombre del candidato (máx 100 caracteres)                                                    | Obligatorio, @db.VarChar(100)          |
| lastName                | String         | Apellido del candidato (máx 100 caracteres)                                                  | Obligatorio, @db.VarChar(100)          |
| email                   | String         | Email único del candidato                                                                    | Obligatorio, Único, formato válido     |
| phone                   | String         | Teléfono en formato internacional                                                            | Obligatorio                            |
| educationLevel          | EducationLevel | Nivel educativo (enum)                                                                       | Obligatorio                            |
| institution             | String         | Institución educativa (máx 200 caracteres)                                                   | @db.VarChar(200)                       |
| degree                  | String         | Título obtenido (máx 150 caracteres)                                                         | @db.VarChar(150)                       |
| graduationYear          | Int            | Año de graduación (1950 a año actual + 4)                                                    | Validar en backend                     |
| currentPosition         | String         | Puesto actual (máx 100 caracteres)                                                           | @db.VarChar(100)                       |
| currentCompany          | String         | Empresa actual (máx 150 caracteres)                                                          | @db.VarChar(150)                       |
| totalExperience         | Int            | Años de experiencia total (0-50)                                                             | Validar en backend                     |
| startDate               | DateTime       | Fecha de inicio laboral                                                                      | No mayor a fecha actual                |
| isCurrentlyWorking      | Boolean        | ¿Actualmente trabajando? (default: true)                                                     | Default: true                          |
| endDate                 | DateTime?      | Fecha de fin laboral (opcional, debe ser > startDate si existe)                              | Validar en backend                     |
| experienceDescription   | String         | Descripción de experiencia (máx 2000 caracteres)                                             | @db.Text                               |
| cvPath                  | String?        | Ruta del archivo CV (opcional)                                                               | Opcional                               |
| createdAt               | DateTime       | Fecha de creación (auto-generado)                                                            | Default: now()                         |
| updatedAt               | DateTime       | Fecha de actualización (auto-actualizado)                                                    | @updatedAt                             |

---

## Índices y Constraints

- Índice único en `email`
- Índice compuesto en `firstName` y `lastName`
- Constraints de longitud en campos de texto
- Validaciones adicionales a implementar en backend:
  - Formato de email (RFC 5322)
  - Rango de años para `graduationYear` y `totalExperience`
  - Formato internacional de teléfono
  - `endDate` debe ser mayor a `startDate` si existe

---

## Migraciones y Seed

- Para crear la base de datos y aplicar el modelo:
  ```bash
  npx prisma migrate dev --name init-candidate-model
  ```
- Para poblar la base de datos con datos de prueba:
  ```bash
  npm run prisma:seed
  ```

---

## Notas Técnicas

- El modelo está documentado con comentarios en el propio archivo `schema.prisma`.
- Las validaciones que no pueden implementarse a nivel de base de datos deben ser manejadas en la capa backend (Express/TypeScript).
- El script de seed (`prisma/seed.ts`) crea candidatos de ejemplo para testing y desarrollo. 