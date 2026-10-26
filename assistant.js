/**
 * FusaBot IA - Asistente de Documentación Oficial de FusaShop
 * Universidad de Cundinamarca
 */
(function() {
  if (typeof window === 'undefined') return;

  function initAssistant() {
    if (document.getElementById('fusabot-assistant-root')) return;

    // Inject CSS styles
    const style = document.createElement('style');
    style.id = 'fusabot-assistant-styles';
    style.textContent = `
      #fusabot-assistant-root {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      #fusabot-toggle-btn {
        background: linear-gradient(135deg, #006C47 0%, #10B981 100%);
        color: white;
        border: none;
        border-radius: 9999px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 25px -5px rgba(0, 108, 71, 0.4), 0 8px 10px -6px rgba(0, 108, 71, 0.2);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #fusabot-toggle-btn:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 14px 28px -4px rgba(0, 108, 71, 0.5);
      }
      #fusabot-toggle-btn svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
      #fusabot-pulse-dot {
        width: 8px;
        height: 8px;
        background: #34D399;
        border-radius: 50%;
        display: inline-block;
        animation: fusabot-pulse 2s infinite;
      }
      @keyframes fusabot-pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
      }
      #fusabot-chat-box {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 400px;
        max-width: calc(100vw - 32px);
        height: 580px;
        max-height: calc(100vh - 120px);
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 20px 40px -10px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px) scale(0.96);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #fusabot-chat-box.open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }
      .fusabot-header {
        background: linear-gradient(135deg, #004d32 0%, #006C47 100%);
        color: white;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .fusabot-header-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .fusabot-avatar {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: rgba(255,255,255,0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      .fusabot-title {
        font-size: 15px;
        font-weight: 700;
        margin: 0;
        line-height: 1.2;
      }
      .fusabot-sub {
        font-size: 11px;
        opacity: 0.85;
        margin: 0;
      }
      .fusabot-close-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 20px;
        padding: 4px 8px;
        opacity: 0.8;
      }
      .fusabot-close-btn:hover { opacity: 1; }
      .fusabot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #F9FAFB;
      }
      .fusabot-msg {
        max-width: 85%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 13.5px;
        line-height: 1.45;
        word-break: break-word;
      }
      .fusabot-msg-bot {
        align-self: flex-start;
        background: #ffffff;
        color: #1F2937;
        border: 1px solid #E5E7EB;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.03);
      }
      .fusabot-msg-user {
        align-self: flex-end;
        background: #006C47;
        color: #ffffff;
        border-bottom-right-radius: 4px;
      }
      .fusabot-msg-bot a {
        color: #006C47;
        font-weight: 600;
        text-decoration: underline;
      }
      .fusabot-chips {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 8px;
      }
      .fusabot-chip {
        background: #EDFDF5;
        border: 1px solid #A7F3D0;
        color: #065F46;
        border-radius: 10px;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .fusabot-chip:hover {
        background: #D1FAE5;
        border-color: #6EE7B7;
        transform: translateX(2px);
      }
      .fusabot-input-bar {
        padding: 12px 16px;
        background: #ffffff;
        border-top: 1px solid #E5E7EB;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .fusabot-input {
        flex: 1;
        border: 1px solid #D1D5DB;
        border-radius: 12px;
        padding: 10px 14px;
        font-size: 13.5px;
        outline: none;
        transition: border-color 0.15s ease;
      }
      .fusabot-input:focus {
        border-color: #006C47;
        box-shadow: 0 0 0 2px rgba(0, 108, 71, 0.15);
      }
      .fusabot-send-btn {
        background: #006C47;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 10px 16px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .fusabot-send-btn:hover {
        background: #004d32;
      }
    `;
    document.head.appendChild(style);

    // Create Assistant DOM
    const root = document.createElement('div');
    root.id = 'fusabot-assistant-root';

    root.innerHTML = `
      <div id="fusabot-chat-box">
        <div class="fusabot-header">
          <div class="fusabot-header-info">
            <div class="fusabot-avatar">🤖</div>
            <div>
              <p class="fusabot-title">FusaBot IA</p>
              <p class="fusabot-sub">Ayudante de Manuales FusaShop</p>
            </div>
          </div>
          <button class="fusabot-close-btn" id="fusabot-close-x" title="Cerrar">✕</button>
        </div>
        <div class="fusabot-messages" id="fusabot-messages-list">
          <div class="fusabot-msg fusabot-msg-bot">
            👋 <strong>¡Hola! Soy FusaBot</strong>, el asistente inteligente de la documentación oficial de FusaShop (Universidad de Cundinamarca).
            <br><br>
            Puedo responder cualquier consulta técnica o de usuario sobre compras, comerciantes, KYC, arquitectura Laravel 12 SSR, pagos con Wompi, guías Envía o servidor MCP.
            <div class="fusabot-chips">
              <button class="fusabot-chip" data-q="¿Cómo funciona el proceso de compra con Wompi?">💳 ¿Cómo comprar con Wompi y PSE?</button>
              <button class="fusabot-chip" data-q="¿Cómo registrarse como comerciante y validar el KYC?">🏪 ¿Cómo ser comerciante y pasar KYC?</button>
              <button class="fusabot-chip" data-q="¿Por qué arquitectura SSR con Blade y Alpine en lugar de SPA?">⚡ ¿Por qué SSR Blade + Alpine en vez de SPA?</button>
              <button class="fusabot-chip" data-q="¿Cómo se generan las facturas electrónicas de la DIAN con Factus?">🧾 ¿Cómo funciona la facturación electrónica DIAN?</button>
              <button class="fusabot-chip" data-q="¿Cómo conectarse al servidor MCP de FusaBot?">🔌 ¿Cómo conectar al servidor MCP JSON-RPC?</button>
            </div>
          </div>
        </div>
        <div class="fusabot-input-bar">
          <input type="text" id="fusabot-user-input" class="fusabot-input" placeholder="Pregunta sobre los manuales..." autocomplete="off">
          <button id="fusabot-submit-btn" class="fusabot-send-btn">Enviar</button>
        </div>
      </div>

      <button id="fusabot-toggle-btn" title="Preguntar al Ayudante de IA">
        <span id="fusabot-pulse-dot"></span>
        <svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5"/></svg>
        <span>Ayudante IA</span>
      </button>
    `;

    document.body.appendChild(root);

    const toggleBtn = document.getElementById('fusabot-toggle-btn');
    const chatBox = document.getElementById('fusabot-chat-box');
    const closeBtn = document.getElementById('fusabot-close-x');
    const input = document.getElementById('fusabot-user-input');
    const submitBtn = document.getElementById('fusabot-submit-btn');
    const messagesList = document.getElementById('fusabot-messages-list');

    toggleBtn.addEventListener('click', () => {
      chatBox.classList.toggle('open');
      if (chatBox.classList.contains('open')) input.focus();
    });

    closeBtn.addEventListener('click', () => chatBox.classList.remove('open'));

    // Handle suggestion chips
    messagesList.addEventListener('click', (e) => {
      const chip = e.target.closest('.fusabot-chip');
      if (chip && chip.dataset.q) {
        handleUserMessage(chip.dataset.q);
      }
    });

    submitBtn.addEventListener('click', () => {
      const text = input.value.trim();
      if (text) {
        handleUserMessage(text);
        input.value = '';
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = input.value.trim();
        if (text) {
          handleUserMessage(text);
          input.value = '';
        }
      }
    });

    function appendMessage(text, sender, isHtml = false) {
      const msg = document.createElement('div');
      msg.className = 'fusabot-msg ' + (sender === 'user' ? 'fusabot-msg-user' : 'fusabot-msg-bot');
      if (isHtml) {
        msg.innerHTML = text;
      } else {
        msg.textContent = text;
      }
      messagesList.appendChild(msg);
      messagesList.scrollTop = messagesList.scrollHeight;
    }

    function handleUserMessage(query) {
      appendMessage(query, 'user');

      // Simple typing indicator
      const typing = document.createElement('div');
      typing.className = 'fusabot-msg fusabot-msg-bot';
      typing.innerHTML = '<em>Consultando manuales...</em>';
      messagesList.appendChild(typing);
      messagesList.scrollTop = messagesList.scrollHeight;

      setTimeout(() => {
        typing.remove();
        const response = generateAnswer(query);
        appendMessage(response, 'bot', true);
      }, 350);
    }

    function generateAnswer(q) {
      const lower = q.toLowerCase();

      if (lower.includes('wompi') || lower.includes('pago') || lower.includes('pse') || lower.includes('tarjeta')) {
        return `
          <strong>Pasarela de Pagos Wompi Bancolombia:</strong><br>
          1. En el checkout, se calcula la cotización del flete con Envía y se genera una firma de integridad SHA-256 única.<br>
          2. El comprador paga mediante tarjeta, PSE, Nequi o Botón Bancolombia.<br>
          3. Wompi envía un webhook asíncrono a <code>/api/webhooks/wompi</code>, donde el job <code>ProcessWompiEvent</code> valida el checksum e idempotencia antes de marcar el pedido como <code>paid</code>.<br>
          👉 <a href="/desarrollador/integraciones">Ver detalles de Integración con Wompi</a> o el <a href="/usuario/consumidor">Manual del Consumidor</a>.
        `;
      }

      if (lower.includes('kyc') || lower.includes('comerciante') || lower.includes('vender') || lower.includes('rut') || lower.includes('tienda')) {
        return `
          <strong>Onboarding de Comerciantes y Verificación KYC:</strong><br>
          1. <strong>Registro:</strong> El comerciante se registra y completa datos de su empresa.<br>
          2. <strong>Carga de Documentos:</strong> Debe adjuntar RUT vigente, Cédula de Ciudadanía y Cámara de Comercio.<br>
          3. <strong>Auditoría:</strong> Un analista institucional valida el RUT y aprueba el comercio.<br>
          4. <strong>Operación:</strong> Una vez aprobado, el comerciante puede publicar productos, configurar cuentas de pago (Bancolombia, Nequi, Daviplata) y despachar órdenes con guías Envía.<br>
          👉 <a href="/usuario/comerciante">Consultar el Módulo del Comerciante</a>.
        `;
      }

      if (lower.includes('ssr') || lower.includes('blade') || lower.includes('alpine') || lower.includes('spa') || lower.includes('react') || lower.includes('arquitectura')) {
        return `
          <strong>Decisión de Arquitectura (ADR-001): ¿Por qué SSR Blade + Alpine?</strong><br>
          - <strong>Contexto Regional:</strong> En Fusagasugá y el Sumapaz, más del 70% de usuarios usan móviles de gama media en redes celulares 3G/4G.<br>
          - <strong>Rendimiento:</strong> El bundle JS de Alpine pesa sólo <strong>15 KB</strong> (frente a 1.5MB+ de SPAs), logrando un First Contentful Paint en <strong>&lt; 380 ms</strong>.<br>
          - <strong>SEO Nativo:</strong> Todas las páginas renderizan HTML completo en servidor, optimizando la indexación y previsualizaciones en WhatsApp.<br>
          👉 <a href="/desarrollador">Ver el ADR completo en el Manual de Desarrollador</a>.
        `;
      }

      if (lower.includes('factura') || lower.includes('factus') || lower.includes('dian') || lower.includes('cufe')) {
        return `
          <strong>Facturación Electrónica DIAN con Factus API v2:</strong><br>
          - Al confirmarse el pago por webhook, se despacha el job asíncrono <code>IssueFactusInvoice</code>.<br>
          - La API transmite los datos fiscales a la DIAN, generando el Código Único de Facturación Electrónica (CUFE) y el código QR oficial.<br>
          - El comprador puede descargar su factura legal en PDF y XML desde la sección de pedidos.<br>
          👉 <a href="/desarrollador/integraciones">Revisar especificación técnica de Factus v2</a>.
        `;
      }

      if (lower.includes('mcp') || lower.includes('claude') || lower.includes('cursor') || lower.includes('fusabot')) {
        return `
          <strong>Servidor Model Context Protocol (MCP):</strong><br>
          - Endpoint: <code>POST /api/mcp</code> (especificación JSON-RPC 2.0).<br>
          - Seguridad: Token Bearer Sanctum en cabecera <code>Authorization</code>.<br>
          - Herramientas: <code>search_catalog</code>, <code>get_order_status</code>, <code>get_store_metrics</code>.<br>
          - Compatible con Claude Desktop (vía <code>claude_desktop_config.json</code>) y Cursor.<br>
          👉 <a href="/desarrollador/fusabot-mcp">Ver guía de configuración MCP</a>.
        `;
      }

      if (lower.includes('orden') || lower.includes('pedido') || lower.includes('estado') || lower.includes('maquina')) {
        return `
          <strong>Máquina de Estados de Órdenes de Compra:</strong><br>
          <code>pending</code> (reserva temporal con lock) ➔ <code>paid</code> (pago confirmado, stock descontado) ➔ <code>processing</code> (alistamiento en tienda) ➔ <code>shipped</code> (guía Envía generada) ➔ <code>delivered</code> (entrega final).<br>
          - Cancelaciones liberan el inventario de inmediato con <code>StockService</code>.<br>
          👉 <a href="/tecnico/maquinas-estados">Ver diagrama de Máquinas de Estados</a>.
        `;
      }

      if (lower.includes('despliegue') || lower.includes('vps') || lower.includes('hostinger') || lower.includes('supervisor') || lower.includes('docker')) {
        return `
          <strong>Despliegue y Operaciones en VPS:</strong><br>
          - <strong>Workers:</strong> Gestionados con Supervisor (<code>php artisan queue:work --tries=3</code>).<br>
          - <strong>Scheduler:</strong> Cron ejecutando cada minuto <code>php artisan schedule:run</code>.<br>
          - <strong>Caché:</strong> Comandos <code>php artisan config:cache</code>, <code>route:cache</code>, <code>view:cache</code>.<br>
          👉 <a href="/tecnico/despliegue-operaciones">Ver Checklist de Pase a Producción</a>.
        `;
      }

      if (lower.includes('envia') || lower.includes('guia') || lower.includes('rastreo') || lower.includes('flete')) {
        return `
          <strong>Logística y Envíos con Envía Colvanes:</strong><br>
          - Cotización automática por peso y código DANE.<br>
          - Generación de guía con número de rastreo y etiqueta PDF descargable.<br>
          - Seguimiento en vivo del estado del paquete.<br>
          👉 <a href="/usuario/consumidor">Ver flujo de rastreo en el Manual del Consumidor</a>.
        `;
      }

      // Default contextual response
      return `
        He analizado tu consulta sobre <em>"${q}"</em> en los tres manuales oficiales de FusaShop:<br><br>
        - Para temas de compras, KYC y uso del portal, consulta el <a href="/usuario">Manual de Usuario</a>.<br>
        - Para la arquitectura Laravel 12, servicios de dominio y webhooks, consulta el <a href="/desarrollador">Manual de Desarrollador</a>.<br>
        - Para la estructura de la base de datos MariaDB y servidores, consulta el <a href="/tecnico">Manual Técnico</a>.<br><br>
        ¿Deseas detalles específicos sobre algún módulo o integración?
      `;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }
})();
