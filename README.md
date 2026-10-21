# Documentación Oficial de FusaShop (Mintlify & PDFs)

Repositorio oficial de documentación técnica y de usuario para el ecosistema **FusaShop**, diseñado para publicarse en [Mintlify](https://mintlify.com) y distribuirse como manuales independientes en formato PDF.

---

## 📚 Contenido de la Documentación

La documentación está organizada en tres manuales exhaustivos correspondientes a la versión **FusaShop v2.4-LTS (Rama Final)**:

1. **Manual de Usuario (`usuario/`):**
   - **Consumidores:** Registro OTP de 6 dígitos, omnibar con IA (voz/imagen), carrito con separación O2O/físicos, pasarela Wompi (Tarjetas, PSE, Nequi), rastreo logístico Envía Colvanes, facturación electrónica DIAN (Factus API v2), FusaCoins, FusaBot y PQRS.
   - **Comerciantes:** Onboarding KYC con RUT/Cámara de Comercio, configuración de cuentas bancarias y billeteras digitales (Nequi y Daviplata), inventario con umbrales de stock bajo, despacho y rótulos de transporte, liquidación semanal y pauta publicitaria.
   - **Analistas / Administradores:** Consola de operaciones, auditoría KYC, bitácora forense (`AdminAuditLog`), supervisión de integraciones y configuración del destino de ingresos por banners publicitarios.
   - **Preguntas Frecuentes y Soporte:** Marco legal de retracto, tiempos bancarios y canales oficiales.

2. **Manual del Desarrollador (`desarrollador/`):**
   - **Ecosistema & Stack:** Laravel 12.x, PHP 8.2+, Tailwind CSS v4, Alpine.js y justificación SSR.
   - **Arquitectura & Modelado:** Cifrado simétrico AES-256-CBC con `EncryptedGatewaySecret` para secretos de pasarela.
   - **Lógica del Dominio:** `StockService` con reservas atómicas y bloqueos pesimistas (`lockForUpdate`), `CheckoutService` y `OrderPaymentService`.
   - **Integraciones:** Wompi (firmas SHA-256 e idempotencia), Envía Colvanes y Factus API v2 (DIAN).
   - **FusaBot & Servidor MCP:** Servidor Model Context Protocol bajo estándar JSON-RPC 2.0 (`/api/mcp`).
   - **Testing Automatizado:** Suite completa de 76 pruebas automatizadas (17 exclusivas de checkout e integraciones).
   - **Guía de Instalación:** Secuencia de comandos, seeders locales y convenciones Git Flow.

3. **Manual Técnico (`tecnico/`):**
   - **Diseño Multicapa:** Separación estricta de controladores, servicios puros, jobs asíncronos y persistencia.
   - **Diccionario de Datos:** Esquema relacional completo (ERD) con detalle de tablas, claves primarias, foráneas e índices.
   - **Máquinas de Estado:** Ciclo de vida determinista de órdenes y mitigación de condiciones de carrera.
   - **Seguridad & Hardening:** Cabeceras HTTP `SecurityHeaders`, compresión dinámica `CompressResponse` y mitigación del OWASP Top 10.
   - **Optimización:** Negociación gráfica WebP y erradicación de consultas N+1 con Eager Loading.
   - **Despliegue & Operaciones:** Configuración de Supervisor para workers, cron jobs de Scheduler y checklist de Go-Live.

---

## 📄 Descarga de Manuales en PDF

Los tres manuales independientes se encuentran compilados y disponibles dentro de la carpeta [`pdfs/`](./pdfs/):

- 📥 [Manual de Usuario (PDF)](./pdfs/Manual_de_Usuario_FusaShop.pdf)
- 📥 [Manual del Desarrollador (PDF)](./pdfs/Manual_de_Desarrollador_FusaShop.pdf)
- 📥 [Manual Técnico (PDF)](./pdfs/Manual_Tecnico_FusaShop.pdf)

---

## 🚀 Vista Previa y Despliegue en Mintlify

### Previsualización Local con Mintlify CLI

1. Instala el CLI de Mintlify globalmente:
   ```bash
   npm i -g mint
   ```
2. Inicia el servidor de desarrollo en la raíz del repositorio:
   ```bash
   mint dev
   ```
3. Abre tu navegador en `http://localhost:3000`.

### Despliegue en Producción
Al conectar este repositorio con tu proyecto en [dashboard.mintlify.com](https://dashboard.mintlify.com), cada commit a la rama `main` se compila y publica automáticamente.
