# Portal de Reportes IA — División Informática · Loan Software

Sitio estático con reportes de seguimiento del proyecto de **generación automatizada de QA con Inteligencia Artificial**, organizado por las tres áreas involucradas: Análisis Funcional, Software Factory y Quality Assurance.

## Estructura del proyecto

El flujo del proyecto sigue una cadena secuencial entre las tres áreas:

```
AF (genera el DCR) → SWF (desarrolla) → QA (prueba y automatiza)
```

---

## Áreas y reportes

### AF — Análisis Funcional
**Archivo:** [`presentacion-af.html`](./presentacion-af.html)

El área de Análisis Funcional es el punto de inicio del flujo. Es responsable de generar el **DCR (Documento de Cambio de Requerimiento)** que define los requisitos funcionales del sistema. Este documento guía tanto el desarrollo de SWF como las pruebas de QA.

El reporte de AF incluye una presentación interactiva con el contexto del área, su rol en el proyecto IA y los documentos funcionales generados.

---

### SWF — Software Factory
**Archivo:** [`NPA-283-documento-funcional.html`](./NPA-283-documento-funcional.html)

El área de Software Factory toma el DCR generado por AF y lleva a cabo el **desarrollo de las funcionalidades requeridas**. Sus entregas constituyen la base sobre la que QA ejecuta las pruebas.

El reporte de SWF documenta el desarrollo realizado en el marco del proyecto IA, detallando los cambios implementados a partir del documento funcional.

---

### QA — Quality Assurance
**Archivo:** [`reporte_proyecto_ia.html`](./reporte_proyecto_ia.html)

El área de QA cierra el ciclo del proyecto. Toma el DCR de AF y el desarrollo de SWF para **generar casos de prueba y tests automatizados mediante agentes de IA**.

El reporte de QA incluye contexto del proyecto, metodología de automatización con IA, resultados obtenidos y próximos pasos.

---

## Archivos del sitio

| Archivo | Descripción |
|---|---|
| [`main_portal.html`](./main_portal.html) | Portal central — acceso a los tres reportes de área |
| [`presentacion-af.html`](./presentacion-af.html) | Reporte AF — Análisis Funcional |
| [`NPA-283-documento-funcional.html`](./NPA-283-documento-funcional.html) | Reporte SWF — Software Factory |
| [`reporte_proyecto_ia.html`](./reporte_proyecto_ia.html) | Reporte QA — Quality Assurance |
| [`qa_reports_portal.html`](./qa_reports_portal.html) | Portal interno del área QA |

## Deploy

El sitio es 100% estático (HTML + CSS + JS vanilla, sin dependencias externas ni build step). Se puede deployar directamente en **GitHub Pages** o **Vercel**:

### GitHub Pages
1. Ir a **Settings → Pages** del repositorio
2. En *Source*, seleccionar la rama y la carpeta raíz (`/`)
3. La página de entrada principal es `main_portal.html`

### Vercel
El sitio está configurado para deploy automático en Vercel desde la rama `master`.

---

> Proyecto interno · División Informática — Loan Software
