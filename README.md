# Cotizador de Seguros - Momento

Proyecto desarrollado como prueba técnica utilizando Next.js (App Router), React, TypeScript, RTK Query y react-hook-form.

---

## 🚀 Stack Tecnológico

- Next.js 16 (App Router)
- React
- TypeScript
- Redux Toolkit (RTK)
- RTK Query
- react-hook-form
- TailwindCSS
- SCSS
- REST Client (para pruebas de endpoints)

---

## 📌 Funcionalidad

Formulario de cotización dividido en dos secciones:

### A) Datos sobre ti

- Nombre(s)
- Apellido Paterno
- Apellido Materno
- Código Postal
- Correo electrónico
- Teléfono (opcional)
- Fecha de nacimiento (formato dd/mm/yyyy)
- Género en licencia (catálogo desde API)

### B) Datos sobre tu vehículo

- Marca (catálogo)
- Tipo de vehículo (catálogo dependiente)
- Modelo (dependiente)
- Año (dependiente)
- Versión (dependiente)

---

## ✅ Validaciones

- Validación en `onBlur`
- Mensajes de error personalizados
- Formato de correo válido
- Código postal de 5 dígitos
- Teléfono de 10 dígitos
- Fecha en formato `dd/mm/yyyy`
- Conversión automática a formato ISO antes del submit

---

## 🔄 Comportamiento de campos dependientes

Los campos del vehículo siguen flujo secuencial:

Marca → Tipo → Modelo → Año → Versión

Si se modifica un campo anterior, los campos dependientes se limpian automáticamente.

---

## 📡 Consumo de API

Todos los catálogos se obtienen usando **RTK Query**, como lo requieren las instrucciones.

El envío del formulario se realiza mediante:

---

## 🎯 Envío del formulario

- Botón siempre habilitado
- Validación manual usando `trigger()`
- Mientras la petición está en curso, el botón se deshabilita
- Manejo de errores:
  - Error genérico
  - Error ALREADY_EXISTS
  - Mensajes detallados del backend

---

## 🖥️ Instalación

1. Clonar repositorio

```bash
git clone <repo-url>

2. Instalar dependencias
npm install

3.Crear archivo .env.local

NEXT_PUBLIC_API_URL=<api_base_url>
NEXT_PUBLIC_API_TOKEN=<token>

4.Ejecutar proyecto

npm run dev

Abrir en:
http://localhost:3000


📌 Notas
Se utilizó App Router

Se respetaron tipografías del layout

Diseño responsive

Separación por componentes

Custom hooks

Arquitectura limpia y escalable

✨ Autor
Karen Corona
```
