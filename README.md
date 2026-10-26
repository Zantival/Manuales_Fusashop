# Documentación Oficial de FusaShop (Universidad de Cundinamarca)

Repositorio oficial de documentación técnica, operativa y de usuario para el ecosistema **FusaShop**, diseñado para publicarse en [Mintlify](https://mintlify.com) y consultar en línea a través del portal de documentación.

* **Portal Oficial de la Tienda:** [https://fusashop.shop](https://fusashop.shop)
* **Organización:** Universidad de Cundinamarca - Programa de Ingeniería de Sistemas
* **Provincia:** Sumapaz (Fusagasugá y municipios aledaños)

---

## 📚 Estructura de los Manuales

La documentación está organizada en tres manuales exhaustivos correspondientes a la versión **FusaShop v2.4-LTS (Rama Final)**:

1. **Manual de Usuario (`usuario/`):**
   - **Consumidores:** Registro con verificación OTP de 6 dígitos, búsqueda inteligente y directorio territorial, carrito con separación O2O vs. despacho físico, pasarela Wompi (Tarjetas, PSE, Nequi, Botón Bancolombia), rastreo logístico con Envía Colvanes, facturación electrónica DIAN (Factus API v2 con CUFE y QR), FusaCoins, asistente FusaBot y radicación de PQRS.
   - **Comerciantes:** Onboarding KYC con RUT/Cámara de Comercio, configuración de cuentas bancarias y billeteras digitales (Nequi y Daviplata), inventario con umbrales de stock bajo, despacho y rótulos de transporte, liquidación de ventas y solicitud de pauta publicitaria (banners rotativos y tarjetas patrocinadas).
   - **Analistas / Administradores:** Panel ejecutivo con métricas territoriales, auditoría y validación documental KYC, dispersión y destino de ingresos por banners, bitácora inmutable `AdminAuditLog` y monitoreo de salud de APIs (`/admin/integrations`).
   - **Mesa de Ayuda y Soporte:** Preguntas frecuentes, derecho de retracto (Ley 1480 de 2011) y canales de contacto directo.

2. **Manual del Desarrollador (`desarrollador/`):**
   - **Ecosistema & Decisiones (ADR-001):** Laravel 12.x, PHP 8.3, Tailwind CSS v4, Alpine.js y fundamentación de arquitectura Server-Rendered (SSR) sobre SPA para la Provincia del Sumapaz.
   - **Estructura del Proyecto:** Topología de carpetas, controladores, FormRequests, middlewares y seeders.
   - **Servicios de Dominio:** Gestión atómica de existencias (`StockService` con `lockForUpdate`), orquestación del checkout y analítica.
   - **Modelos y Cifrado:** Relaciones Eloquent y cifrado transparente AES-256-CBC (`EncryptedGatewaySecret`) para credenciales bancarias.
   - **Integraciones Externas:** Wompi (integridad HMAC-SHA256 y webhooks), Envía Colvanes (cotización, rastreo y guías) y Factus API v2 (facturación electrónica DIAN).
   - **Asistente Virtual & Servidor MCP:** Servidor Model Context Protocol (`/api/mcp`) con transporte JSON-RPC 2.0 y herramientas para agentes autónomos.
   - **Seguridad & Testing:** Middlewares de seguridad, prevención CSRF, rate limiting y suite de 76 pruebas automatizadas con PHPUnit.
   - **Instalación Local:** Guía paso a paso para desplegar el entorno de desarrollo.

3. **Manual Técnico y de Operaciones (`tecnico/`):**
   - **Arquitectura Multicapa:** Diagrama de componentes, flujo de datos y principios SOLID.
   - **Diccionario de Datos y ERD:** Definición completa de tablas (`company_profiles`, `orders`, `order_items`, `banner_requests`, `admin_audit_logs`), tipos de datos, índices y claves foráneas.
   - **Máquinas de Estados:** Ciclo de vida estricto de órdenes (`pending` $\rightarrow$ `paid` $\rightarrow$ `processing` $\rightarrow$ `shipped` $\rightarrow$ `delivered`) e idempotencia de webhooks.
   - **Seguridad y Hardening:** Cabeceras HTTP (`SecurityHeaders`), Content-Security-Policy (CSP), política de cookies y mitigación OWASP Top 10.
   - **Rendimiento y Resiliencia:** Eager loading sin N+1, negociación de activos WebP y caché Redis.
   - **Despliegue y Operaciones:** Configuración de Supervisor para colas, Cron para Laravel Scheduler y checklist de producción.

---

## 🤖 Asistente de IA Integrado (FusaBot)

El repositorio incluye:
- `.mintlify/Assistant.md`: Instrucciones de sistema para el Asistente de IA de Mintlify.
- `assistant.js`: Widget flotante interactivo de IA cargado en todas las páginas de la documentación para responder dudas de usuarios y desarrolladores en tiempo real.
