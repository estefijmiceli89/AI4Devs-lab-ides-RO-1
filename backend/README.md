# 📑 Documentación API - Gestión de Candidatos

## Endpoints

---

### 1. Crear Candidato

**POST** `/api/candidates`

- **Body (JSON):**
  ```json
  {
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@email.com",
    "phone": "+541112345678",
    "educationLevel": "UNIVERSITY",
    "institution": "UBA",
    "degree": "Ingeniería",
    "graduationYear": 2020,
    "currentPosition": "Developer",
    "currentCompany": "Tech SA",
    "totalExperience": 3,
    "startDate": "2020-01-01",
    "isCurrentlyWorking": true,
    "endDate": null,
    "experienceDescription": "Desarrollo de software"
  }
  ```

- **Validaciones:**
  - Todos los campos obligatorios.
  - Email único y formato válido.
  - Teléfono internacional.
  - Rango de años y experiencia.
  - Fechas lógicas.

- **Respuestas:**
  - `201 Created`:
    ```json
    { "success": true, "message": "Candidato creado exitosamente", "data": { ...candidato } }
    ```
  - `400 Bad Request`: Errores de validación.
  - `500 Internal Server Error`: Error inesperado.

---

### 2. Obtener Candidato por ID

**GET** `/api/candidates/:id`

- **Validaciones:**
  - ID debe ser entero positivo.

- **Respuestas:**
  - `200 OK`:
    ```json
    { "success": true, "message": "Candidato encontrado", "data": { ...candidato } }
    ```
  - `400 Bad Request`: ID inválido.
  - `404 Not Found`: Candidato no existe.

---

### 3. Listar Candidatos

**GET** `/api/candidates`

- **Query Params:**
  - `limit` (default: 10, max: 100)
  - `offset` (default: 0)
  - `name` (filtro por nombre o apellido)
  - `email` (filtro por email)
  - `educationLevel` (enum)
  - `minExperience`, `maxExperience` (rango de experiencia)
  - `orderBy` (campo de orden, ej: `createdAt`)
  - `order` (`asc` o `desc`)

- **Respuestas:**
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Lista de candidatos",
      "data": [ ... ],
      "meta": { "total": 50, "limit": 10, "offset": 0, "count": 10 }
    }
    ```

---

### 4. Subir/Actualizar CV

**POST** `/api/candidates/:id/cv`

- **Form Data:**
  - Campo: `cv` (archivo PDF o DOCX, máx. 5MB)

- **Validaciones:**
  - ID válido y candidato existente.
  - Archivo obligatorio, tipo y tamaño.

- **Respuestas:**
  - `200 OK`:
    ```json
    { "success": true, "message": "CV subido y actualizado exitosamente", "data": { "cvPath": "uploads/cv/cv-1-123.pdf" } }
    ```
  - `400 Bad Request`: ID inválido, sin archivo, tipo/tamaño incorrecto.
  - `404 Not Found`: Candidato no existe.

---

## Validaciones Generales

- Todos los endpoints devuelven respuestas estructuradas:  
  `{ success, data, message, errors/meta }`
- Errores de validación y negocio retornan `400`.
- Errores de servidor retornan `500` con mensaje genérico.

---

## Ejemplo de Respuesta de Error

```json
{
  "success": false,
  "message": "Datos de candidato inválidos",
  "errors": ["El email no es válido", "El campo phone es requerido"]
}
```

---

## Testing

- Todos los endpoints tienen tests unitarios con Jest.
- Se mockea PrismaClient y Multer para simular la base de datos y archivos.
- Los tests cubren casos de éxito, errores de validación y errores de negocio.

---

## Notas Técnicas

- Los archivos de CV se almacenan en `backend/uploads/cv/`.
- El campo `cvPath` guarda la ruta relativa al archivo.
- El backend está preparado para integración con frontend React y para futuras mejoras (autenticación, roles, etc). 