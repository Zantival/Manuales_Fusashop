/**
 * FusaBot IA - Asistente Contextual Especializado por Manual
 * FusaShop - Universidad de Cundinamarca
 */
(function() {
  if (typeof window === 'undefined') return;

  function getManualContext() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/usuario')) {
      return {
        id: 'usuario',
        name: 'Manual de Usuario',
        icon: '📘',
        desc: 'Compras, comercios, onboarding KYC, despacho Envía, pagos Wompi y PQRS.',
        color: '#006C47'
      };
    }
    if (path.includes('/desarrollador') || path.includes('ecosistema-tecnologico')) {
      return {
        id: 'desarrollador',
        name: 'Manual del Desarrollador',
        icon: '💻',
        desc: 'Laravel 12, Alpine.js, servicios de dominio, APIs, servidor MCP y tests.',
        color: '#0D9488'
      };
    }
    if (path.includes('/tecnico')) {
      return {
        id: 'tecnico',
        name: 'Manual Técnico',
        icon: '⚙️',
        desc: 'Base de datos MariaDB, máquinas de estados, hardening CSP y servidores VPS.',
        color: '#0369A1'
      };
    }
    return {
      id: 'general',
      name: 'Documentación General',
      icon: '🏛️',
      desc: 'Acceso a los tres manuales de FusaShop.',
      color: '#006C47'
    };
  }

  function initAssistant() {
    if (document.getElementById('fusabot-assistant-root')) return;

    // Inject CSS styles with high specificity and !important
    const style = document.createElement('style');
    style.id = 'fusabot-assistant-styles';
    style.textContent = `
      #fusabot-assistant-root {
        position: fixed !important;
        bottom: 24px !important;
        right: 24px !important;
        z-index: 999999 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      }
      #fusabot-toggle-btn {
        background: linear-gradient(135deg, #006C47 0%, #10B981 100%) !important;
        color: #ffffff !important;
        border: none !important;
        border-radius: 9999px !important;
        padding: 12px 20px !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        box-shadow: 0 10px 25px -5px rgba(0, 108, 71, 0.45), 0 8px 10px -6px rgba(0, 108, 71, 0.25) !important;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      #fusabot-toggle-btn:hover {
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 14px 28px -4px rgba(0, 108, 71, 0.55) !important;
      }
      #fusabot-toggle-btn svg {
        width: 20px !important;
        height: 20px !important;
        fill: #ffffff !important;
      }
      #fusabot-pulse-dot {
        width: 8px !important;
        height: 8px !important;
        background: #34D399 !important;
        border-radius: 50% !important;
        display: inline-block !important;
        animation: fusabot-pulse 2s infinite !important;
      }
      @keyframes fusabot-pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
      }
      #fusabot-chat-box {
        position: absolute !important;
        bottom: 70px !important;
        right: 0 !important;
        width: 420px !important;
        max-width: calc(100vw - 32px) !important;
        height: 600px !important;
        max-height: calc(100vh - 120px) !important;
        background: #ffffff !important;
        color: #111827 !important;
        border-radius: 20px !important;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08) !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateY(20px) scale(0.96) !important;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      #fusabot-chat-box.open {
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateY(0) scale(1) !important;
      }
      .fusabot-header {
        background: linear-gradient(135deg, #004d32 0%, #006C47 100%) !important;
        color: #ffffff !important;
        padding: 14px 18px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }
      .fusabot-header-info {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }
      .fusabot-avatar {
        width: 38px !important;
        height: 38px !important;
        border-radius: 10px !important;
        background: rgba(255,255,255,0.2) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 20px !important;
      }
      .fusabot-title {
        font-size: 15px !important;
        font-weight: 700 !important;
        margin: 0 !important;
        line-height: 1.2 !important;
        color: #ffffff !important;
      }
      .fusabot-sub {
        font-size: 11.5px !important;
        color: #E2E8F0 !important;
        margin: 0 !important;
      }
      .fusabot-close-btn {
        background: none !important;
        border: none !important;
        color: #ffffff !important;
        cursor: pointer !important;
        font-size: 20px !important;
        padding: 4px 8px !important;
        opacity: 0.8 !important;
      }
      .fusabot-close-btn:hover { opacity: 1 !important; }
      
      .fusabot-context-bar {
        background: #F0FDF4 !important;
        border-bottom: 1px solid #DCFCE7 !important;
        padding: 8px 16px !important;
        font-size: 11.5px !important;
        color: #166534 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        font-weight: 600 !important;
      }
      .fusabot-context-pill {
        background: #DCFCE7 !important;
        color: #14532D !important;
        padding: 2px 8px !important;
        border-radius: 9999px !important;
        font-size: 10.5px !important;
      }

      .fusabot-messages {
        flex: 1 !important;
        overflow-y: auto !important;
        padding: 16px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        background: #F9FAFB !important;
      }
      .fusabot-msg {
        max-width: 88% !important;
        padding: 12px 16px !important;
        border-radius: 16px !important;
        font-size: 13.5px !important;
        line-height: 1.5 !important;
        word-break: break-word !important;
        box-sizing: border-box !important;
      }
      .fusabot-msg-bot {
        align-self: flex-start !important;
        background: #ffffff !important;
        color: #1F2937 !important;
        border: 1px solid #E5E7EB !important;
        border-bottom-left-radius: 4px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.04) !important;
      }
      .fusabot-msg-user {
        align-self: flex-end !important;
        background: #006C47 !important;
        color: #ffffff !important;
        border-bottom-right-radius: 4px !important;
      }
      .fusabot-msg-bot a {
        color: #006C47 !important;
        font-weight: 700 !important;
        text-decoration: underline !important;
      }
      .fusabot-msg-bot code {
        background: #F3F4F6 !important;
        color: #006C47 !important;
        padding: 2px 5px !important;
        border-radius: 4px !important;
        font-size: 12px !important;
        font-family: monospace !important;
      }
      .fusabot-chips {
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
        margin-top: 10px !important;
      }
      .fusabot-chip {
        background: #ffffff !important;
        border: 1px solid #A7F3D0 !important;
        color: #065F46 !important;
        border-radius: 10px !important;
        padding: 8px 12px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        text-align: left !important;
        cursor: pointer !important;
        transition: all 0.15s ease !important;
      }
      .fusabot-chip:hover {
        background: #EDFDF5 !important;
        border-color: #34D399 !important;
        transform: translateX(2px) !important;
      }
      
      .fusabot-scope-warning {
        background: #FEF2F2 !important;
        border: 1px solid #FECACA !important;
        color: #991B1B !important;
        border-radius: 10px !important;
        padding: 10px 12px !important;
        font-size: 12.5px !important;
        margin-bottom: 8px !important;
      }

      .fusabot-input-bar {
        padding: 12px 16px !important;
        background: #ffffff !important;
        border-top: 1px solid #E5E7EB !important;
        display: flex !important;
        gap: 8px !important;
        align-items: center !important;
        box-sizing: border-box !important;
      }
      .fusabot-input {
        flex: 1 !important;
        background-color: #ffffff !important;
        color: #111827 !important;
        -webkit-text-fill-color: #111827 !important;
        caret-color: #006C47 !important;
        border: 1.5px solid #D1D5DB !important;
        border-radius: 12px !important;
        padding: 11px 14px !important;
        font-size: 14px !important;
        line-height: 20px !important;
        outline: none !important;
        box-shadow: none !important;
        font-family: inherit !important;
        box-sizing: border-box !important;
      }
      .fusabot-input::placeholder {
        color: #6B7280 !important;
        -webkit-text-fill-color: #6B7280 !important;
        opacity: 1 !important;
      }
      .fusabot-input:focus {
        border-color: #006C47 !important;
        box-shadow: 0 0 0 3px rgba(0, 108, 71, 0.2) !important;
      }
      .fusabot-send-btn {
        background: #006C47 !important;
        color: #ffffff !important;
        border: none !important;
        border-radius: 12px !important;
        padding: 11px 18px !important;
        font-size: 13.5px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        transition: background 0.15s ease !important;
        white-space: nowrap !important;
      }
      .fusabot-send-btn:hover {
        background: #004d32 !important;
      }
    `;
    document.head.appendChild(style);

    // Create Assistant DOM
    const root = document.createElement('div');
    root.id = 'fusabot-assistant-root';

    const ctx = getManualContext();

    root.innerHTML = `
      <div id="fusabot-chat-box">
        <div class="fusabot-header">
          <div class="fusabot-header-info">
            <div class="fusabot-avatar">🤖</div>
            <div>
              <p class="fusabot-title">FusaBot IA</p>
              <p class="fusabot-sub">Asistente FusaShop</p>
            </div>
          </div>
          <button class="fusabot-close-btn" id="fusabot-close-x" title="Cerrar">✕</button>
        </div>
        <div class="fusabot-context-bar" id="fusabot-context-bar">
          <span id="fusabot-ctx-label">${ctx.icon} ${ctx.name}</span>
          <span class="fusabot-context-pill">Alcance activo</span>
        </div>
        <div class="fusabot-messages" id="fusabot-messages-list"></div>
        <div class="fusabot-input-bar">
          <input type="text" id="fusabot-user-input" class="fusabot-input" placeholder="Pregunta sobre este manual..." autocomplete="off">
          <button id="fusabot-submit-btn" class="fusabot-send-btn">Enviar</button>
        </div>
      </div>

      <button id="fusabot-toggle-btn" title="Preguntar al Ayudante de IA">
        <span id="fusabot-pulse-dot"></span>
        <svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5"/></svg>
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
    const ctxLabel = document.getElementById('fusabot-ctx-label');

    // Populate initial welcome message based on context
    function renderWelcomeMessage() {
      const currentCtx = getManualContext();
      ctxLabel.textContent = `${currentCtx.icon} ${currentCtx.name}`;

      let welcomeHtml = '';
      if (currentCtx.id === 'usuario') {
        welcomeHtml = `
          👋 <strong>Hola, estás en el Manual de Usuario.</strong><br>
          En esta sección <strong>solo respondo preguntas operativas de este manual</strong>: cómo comprar, registrarte con OTP, pagar con Wompi, despachar pedidos, requisitos KYC para comerciantes y soporte PQRS.
          <div class="fusabot-chips">
            <button class="fusabot-chip" data-q="¿Cómo funciona el proceso de compra con Wompi y PSE?">💳 ¿Cómo comprar con Wompi y PSE?</button>
            <button class="fusabot-chip" data-q="¿Cómo registrarse como comerciante y validar el KYC?">🏪 ¿Cómo vender y validar KYC con RUT?</button>
            <button class="fusabot-chip" data-q="¿Cómo rastrear mi pedido con guía de Envía Colvanes?">📦 ¿Cómo rastrear mi pedido con Envía?</button>
            <button class="fusabot-chip" data-q="¿Cómo descargar la factura electrónica DIAN?">🧾 ¿Cómo descargar mi factura legal DIAN?</button>
            <button class="fusabot-chip" data-q="¿Cómo radicar una PQRS y tiempos de respuesta?">⚖️ ¿Cómo radicar una PQRS (Ley 1480)?</button>
          </div>
        `;
      } else if (currentCtx.id === 'desarrollador') {
        welcomeHtml = `
          💻 <strong>Hola, estás en el Manual del Desarrollador.</strong><br>
          En esta sección <strong>solo respondo preguntas de desarrollo y programación</strong>: arquitectura Laravel 12 SSR, Alpine.js, Tailwind v4, servicios de dominio, APIs (Wompi, Envía, Factus), servidor MCP y tests automatizados.
          <div class="fusabot-chips">
            <button class="fusabot-chip" data-q="¿Por qué arquitectura SSR con Blade y Alpine en lugar de SPA?">⚡ ¿Por qué SSR Blade + Alpine en vez de SPA?</button>
            <button class="fusabot-chip" data-q="¿Cómo se valida la firma de integridad de Wompi con SHA-256?">🔐 ¿Cómo validar el webhook de Wompi?</button>
            <button class="fusabot-chip" data-q="¿Cómo funciona el servidor MCP en /api/mcp?">🤖 ¿Cómo funciona el servidor MCP JSON-RPC?</button>
            <button class="fusabot-chip" data-q="¿Cómo funciona el cifrado AES-256-CBC en modelos Eloquent?">🔒 ¿Cómo se cifran las credenciales bancarias?</button>
            <button class="fusabot-chip" data-q="¿Cómo ejecutar las pruebas automatizadas con PHPUnit?">🧪 ¿Cómo ejecutar la suite de 76 tests?</button>
          </div>
        `;
      } else if (currentCtx.id === 'tecnico') {
        welcomeHtml = `
          ⚙️ <strong>Hola, estás en el Manual Técnico.</strong><br>
          En esta sección <strong>solo respondo sobre diseño de sistemas y operaciones</strong>: modelo relacional MariaDB, máquinas de estados finitos (FSM), concurrencia atómica de inventario, hardening HTTP (CSP) y despliegue en VPS con Supervisor.
          <div class="fusabot-chips">
            <button class="fusabot-chip" data-q="¿Cuáles son las tablas principales del diccionario de base de datos?">🗄️ ¿Cuáles son las tablas clave en MariaDB?</button>
            <button class="fusabot-chip" data-q="¿Cómo funciona la máquina de estados de una orden?">🔄 ¿Cuál es el ciclo de vida de una orden?</button>
            <button class="fusabot-chip" data-q="¿Cómo se previene la sobreventa con bloqueos pesimistas?">🛑 ¿Cómo funciona lockForUpdate en compras?</button>
            <button class="fusabot-chip" data-q="¿Qué cabeceras de seguridad CSP implementa SecurityHeaders?">🛡️ ¿Qué cabeceras CSP inyecta el sistema?</button>
            <button class="fusabot-chip" data-q="¿Cómo se configuran los workers de Supervisor en producción?">🚀 ¿Cómo configurar Supervisor y Cron?</button>
          </div>
        `;
      } else {
        welcomeHtml = `
          🏛️ <strong>Hola, soy FusaBot IA.</strong><br>
          Selecciona el manual sobre el cual deseas consultar:
          <div class="fusabot-chips">
            <button class="fusabot-chip" data-q="¿Qué temas aborda el Manual de Usuario?">📘 Manual de Usuario (Compras, Tiendas, KYC)</button>
            <button class="fusabot-chip" data-q="¿Qué temas aborda el Manual de Desarrollador?">💻 Manual del Desarrollador (Código, Laravel, APIs)</button>
            <button class="fusabot-chip" data-q="¿Qué temas aborda el Manual Técnico?">⚙️ Manual Técnico (Base de datos, FSM, Servidores)</button>
          </div>
        `;
      }

      messagesList.innerHTML = `<div class="fusabot-msg fusabot-msg-bot">${welcomeHtml}</div>`;
    }

    renderWelcomeMessage();

    // Check URL changes periodically to adapt context
    let lastPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        renderWelcomeMessage();
      }
    }, 1000);

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

      // Typing indicator
      const typing = document.createElement('div');
      typing.className = 'fusabot-msg fusabot-msg-bot';
      typing.innerHTML = '<em>Consultando manual activo...</em>';
      messagesList.appendChild(typing);
      messagesList.scrollTop = messagesList.scrollHeight;

      setTimeout(() => {
        typing.remove();
        const currentCtx = getManualContext();
        const response = evaluateScopedAnswer(query, currentCtx);
        appendMessage(response, 'bot', true);
      }, 350);
    }

    function evaluateScopedAnswer(q, ctx) {
      const lower = q.toLowerCase();

      // CLASSIFY INTENT
      const isDevQuestion = lower.includes('laravel') || lower.includes('blade') || lower.includes('alpine') || lower.includes('ssr') || lower.includes('spa') || lower.includes('mcp') || lower.includes('json-rpc') || lower.includes('cifrado') || lower.includes('aes-256') || lower.includes('controller') || lower.includes('service') || lower.includes('stockservice') || lower.includes('phpunit') || lower.includes('test') || lower.includes('codigo') || lower.includes('código') || lower.includes('sha-256') || lower.includes('firma de integridad') || lower.includes('composer') || lower.includes('npm');

      const isTecQuestion = lower.includes('mariadb') || lower.includes('mysql') || lower.includes('tabla') || lower.includes('diccionario de datos') || lower.includes('llave foranea') || lower.includes('fsm') || lower.includes('maquina de estado') || lower.includes('máquina de estado') || lower.includes('lockforupdate') || lower.includes('bloqueo pesimista') || lower.includes('sobreventa') || lower.includes('securityheaders') || lower.includes('csp') || lower.includes('content-security-policy') || lower.includes('supervisor') || lower.includes('vps') || lower.includes('hostinger') || lower.includes('cron') || lower.includes('despliegue en produccion') || lower.includes('checklist');

      const isUserQuestion = lower.includes('comprar') || lower.includes('pago') || lower.includes('wompi') || lower.includes('pse') || lower.includes('nequi') || lower.includes('daviplata') || lower.includes('bancolombia') || lower.includes('kyc') || lower.includes('rut') || lower.includes('comerciante') || lower.includes('vender') || lower.includes('tienda') || lower.includes('guia') || lower.includes('guía') || lower.includes('envia') || lower.includes('envía') || lower.includes('rastrear') || lower.includes('factura') || lower.includes('factus') || lower.includes('dian') || lower.includes('pqrs') || lower.includes('retracto') || lower.includes('fusacoin') || lower.includes('registro') || lower.includes('otp');

      // 1. ENFORCE SCOPE: MANUAL DE USUARIO
      if (ctx.id === 'usuario') {
        if (isDevQuestion && !isUserQuestion) {
          return `
            <div class="fusabot-scope-warning">
              ⚠️ <strong>Pregunta fuera del alcance del Manual de Usuario</strong>
            </div>
            Actualmente estás en el <strong>Manual de Usuario</strong>, por lo que solo respondo sobre compras, onboarding KYC, despachos y radicación de solicitudes.<br><br>
            Tu consulta sobre arquitectura de software o código corresponde al <a href="/desarrollador">Manual del Desarrollador</a>.<br>
            👉 Navega a la pestaña de Desarrollador para consultar sobre Laravel 12, servicios, MCP o APIs.
          `;
        }
        if (isTecQuestion && !isUserQuestion) {
          return `
            <div class="fusabot-scope-warning">
              ⚠️ <strong>Pregunta fuera del alcance del Manual de Usuario</strong>
            </div>
            Actualmente estás en el <strong>Manual de Usuario</strong>. Tu consulta sobre base de datos, infraestructura o servidores corresponde al <a href="/tecnico">Manual Técnico</a>.<br>
            👉 Visita el Manual Técnico para revisar el diccionario de tablas MariaDB, máquinas de estados o despliegue en VPS.
          `;
        }

        // Answer User questions
        if (lower.includes('comprar') || lower.includes('wompi') || lower.includes('pago') || lower.includes('pse')) {
          return `
            <strong>¿Cómo comprar y pagar en FusaShop? (Manual de Usuario)</strong><br>
            1. <strong>Explorar:</strong> Selecciona productos en el catálogo territorial.<br>
            2. <strong>Carrito:</strong> Elige dirección de envío. El sistema cotiza flete con Envía Colvanes en tiempo real.<br>
            3. <strong>Pago:</strong> Se procesa con Wompi Bancolombia (tarjetas débito/crédito, PSE, Nequi o Botón Bancolombia).<br>
            4. <strong>Confirmación:</strong> Recibes comprobante, guía de transporte y factura DIAN.<br>
            👉 Consulta la <a href="/usuario/consumidor">Guía del Consumidor</a>.
          `;
        }
        if (lower.includes('kyc') || lower.includes('comerciante') || lower.includes('vender') || lower.includes('rut')) {
          return `
            <strong>Onboarding y Validación KYC de Comerciantes (Manual de Usuario)</strong><br>
            1. Regístrate en la plataforma como comerciante.<br>
            2. Adjunta en tu perfil: <strong>RUT actualizado</strong>, Cédula de Ciudadanía y Cámara de Comercio.<br>
            3. Un analista institucional valida los documentos fiscales.<br>
            4. Con la aprobación KYC activa, puedes publicar productos, configurar cuentas de abono (Bancolombia, Nequi, Daviplata) y despachar pedidos.<br>
            👉 Consulta la <a href="/usuario/comerciante">Guía del Comerciante</a>.
          `;
        }
        if (lower.includes('envia') || lower.includes('guia') || lower.includes('rastreo') || lower.includes('envío') || lower.includes('envio')) {
          return `
            <strong>Rastreo y Logística con Envía Colvanes (Manual de Usuario)</strong><br>
            - Una vez aprobado el pago, se genera automáticamente el número de guía de Envía.<br>
            - Puedes ingresar a <strong>Mis Pedidos</strong> y hacer clic en <em>Rastrear Envío</em> para consultar la ubicación en tiempo real del paquete.<br>
            👉 Más información en el <a href="/usuario/consumidor">Módulo del Consumidor</a>.
          `;
        }
        if (lower.includes('factura') || lower.includes('factus') || lower.includes('dian')) {
          return `
            <strong>Facturación Electrónica DIAN (Manual de Usuario)</strong><br>
            - Cada compra confirmada emite factura legal validada ante la DIAN mediante Factus API v2.<br>
            - En el detalle de tu pedido dispones de los botones para descargar la representación gráfica oficial (PDF) y el XML legal firmado.<br>
            👉 Revisa la sección de facturación en la <a href="/usuario/consumidor">Guía del Consumidor</a>.
          `;
        }
        if (lower.includes('pqrs') || lower.includes('retracto') || lower.includes('soporte')) {
          return `
            <strong>Derecho de Retracto y PQRS (Manual de Usuario)</strong><br>
            - Conforme a la Ley 1480 de 2011, tienes 5 días hábiles tras la entrega para ejercer derecho de retracto.<br>
            - Radica tu solicitud en <strong>Mis Pedidos > Radicar PQRS</strong> con SLA de respuesta legal de máximo 15 días hábiles.<br>
            👉 Consulta la <a href="/usuario/faq-soporte">Mesa de Ayuda y FAQ</a>.
          `;
        }

        return `
          <strong>Consulta de Usuario en FusaShop:</strong><br>
          En este manual puedes consultar sobre compras, registro con código OTP de 6 dígitos, billeteras de pago (Wompi, Nequi), despacho de productos, gestión de tiendas y radicación de solicitudes.<br>
          👉 Explora el <a href="/usuario/consumidor">Módulo del Consumidor</a> o el <a href="/usuario/comerciante">Módulo del Comerciante</a>.
        `;
      }

      // 2. ENFORCE SCOPE: MANUAL DE DESARROLLADOR
      if (ctx.id === 'desarrollador') {
        if (isUserQuestion && !isDevQuestion) {
          return `
            <div class="fusabot-scope-warning">
              ⚠️ <strong>Pregunta fuera del alcance del Manual de Desarrollador</strong>
            </div>
            Actualmente estás en el <strong>Manual del Desarrollador</strong>. Como programador, aquí solo respondo sobre arquitectura de código, servicios de dominio, APIs, servidor MCP y tests.<br><br>
            Tu consulta operativa sobre cómo comprar o usar la tienda corresponde al <a href="/usuario">Manual de Usuario</a>.<br>
            👉 Navega a la pestaña de Usuario para revisar los flujos de cliente y comerciante.
          `;
        }
        if (isTecQuestion && !isDevQuestion) {
          return `
            <div class="fusabot-scope-warning">
              ⚠️ <strong>Pregunta fuera del alcance del Manual de Desarrollador</strong>
            </div>
            Actualmente estás en el <strong>Manual del Desarrollador</strong>. Tu consulta sobre tablas relacionales MariaDB, máquinas de estados o servidores VPS corresponde al <a href="/tecnico">Manual Técnico</a>.<br>
            👉 Visita el Manual Técnico para revisar diseño de sistemas e infraestructura.
          `;
        }

        // Answer Dev questions
        if (lower.includes('ssr') || lower.includes('blade') || lower.includes('alpine') || lower.includes('spa') || lower.includes('react')) {
          return `
            <strong>ADR-001: Justificación de SSR Blade + Alpine.js (Manual Desarrollador)</strong><br>
            - <strong>Contexto Sumapaz:</strong> >70% de usuarios usan móviles de gama media en redes celulares 3G/4G con alta latencia.<br>
            - <strong>Rendimiento:</strong> Alpine.js pesa solo <strong>15 KB gzipped</strong> vs bundles de 1.5MB+ en SPAs, logrando First Contentful Paint en <strong>&lt; 380 ms</strong>.<br>
            - <strong>SEO Nativo:</strong> Indexación inmediata y vistas previas en WhatsApp sin complejidad de hydration.<br>
            👉 Revisa el <a href="/desarrollador/index">ADR-001 completo</a>.
          `;
        }
        if (lower.includes('wompi') || lower.includes('sha-256') || lower.includes('webhook') || lower.includes('integridad')) {
          return `
            <strong>Integración Wompi y Firma SHA-256 (Manual Desarrollador)</strong><br>
            - Firma de integridad: <code>SHA256(reference + amount_in_cents + 'COP' + integrity_secret)</code>.<br>
            - Webhook en <code>/api/webhooks/wompi</code>: Valida checksum e idempotencia antes de despachar el job <code>ProcessWompiEvent</code> a la cola.<br>
            👉 Ver código en <a href="/desarrollador/integraciones">Integraciones Externas</a>.
          `;
        }
        if (lower.includes('mcp') || lower.includes('claude') || lower.includes('cursor')) {
          return `
            <strong>Servidor Model Context Protocol (Manual Desarrollador)</strong><br>
            - Endpoint: <code>POST /api/mcp</code> bajo transporte JSON-RPC 2.0.<br>
            - Autenticación: <code>Authorization: Bearer &lt;mcp_token&gt;</code>.<br>
            - Herramientas expuestas: <code>search_catalog</code>, <code>get_order_status</code>, <code>get_store_metrics</code>.<br>
            👉 Ver configuración para Claude Desktop en <a href="/desarrollador/fusabot-mcp">Servidor MCP</a>.
          `;
        }
        if (lower.includes('cifrado') || lower.includes('aes') || lower.includes('secret')) {
          return `
            <strong>Cifrado Transparente en Modelos (Manual Desarrollador)</strong><br>
            - Cast Eloquent <code>EncryptedGatewaySecret</code> aplica cifrado autenticado <strong>AES-256-CBC</strong> derivado de <code>APP_KEY</code>.<br>
            - Impide que secretos de Wompi o credenciales bancarias de comerciantes se almacenen en texto plano.<br>
            👉 Ver detalles en <a href="/desarrollador/modelos-cifrado">Modelado y Cifrado</a>.
          `;
        }
        if (lower.includes('test') || lower.includes('phpunit')) {
          return `
            <strong>Suite de Pruebas Automatizadas (Manual Desarrollador)</strong><br>
            - 76 tests automatizados con PHPUnit cubriendo registro OTP, checkout Wompi, cálculo de existencias y permisos de rol.<br>
            - Se ejecutan con <code>php artisan test</code> utilizando <code>Http::fake()</code> para desacoplar pasarelas externas.<br>
            👉 Ver reporte de cobertura en <a href="/desarrollador/seguridad-testing">Seguridad y Testing</a>.
          `;
        }

        return `
          <strong>Consulta de Desarrollo (Manual de Desarrollador):</strong><br>
          En este manual puedes consultar sobre arquitectura Laravel 12 SSR, servicios de dominio, APIs externas, servidor MCP y testing.<br>
          👉 Consulta la sección <a href="/desarrollador/estructura">Estructura del Proyecto</a> o <a href="/desarrollador/servicios-dominio">Servicios del Dominio</a>.
        `;
      }

      // 3. ENFORCE SCOPE: MANUAL TÉCNICO
      if (ctx.id === 'tecnico') {
        if (isUserQuestion && !isTecQuestion) {
          return `
            <div class="fusabot-scope-warning">
              ⚠️ <strong>Pregunta fuera del alcance del Manual Técnico</strong>
            </div>
            Actualmente estás en el <strong>Manual Técnico</strong>. Aquí solo respondo sobre diseño de sistemas, esquema relacional MariaDB, máquinas de estados finitos, seguridad de cabeceras y servidores.<br><br>
            Tu consulta de usuario final corresponde al <a href="/usuario">Manual de Usuario</a>.<br>
            👉 Navega a la pestaña de Usuario para revisar el uso del portal.
          `;
        }
        if (isDevQuestion && !isTecQuestion) {
          return `
            <div class="fusabot-scope-warning">
              ⚠️ <strong>Pregunta fuera del alcance del Manual Técnico</strong>
            </div>
            Actualmente estás en el <strong>Manual Técnico</strong>. Tu consulta sobre implementación de controladores, servicios de código o tests corresponde al <a href="/desarrollador">Manual del Desarrollador</a>.<br>
            👉 Visita el Manual del Desarrollador para consultar sobre código Laravel y servidor MCP.
          `;
        }

        // Answer Technical questions
        if (lower.includes('mariadb') || lower.includes('tabla') || lower.includes('base de datos') || lower.includes('diccionario')) {
          return `
            <strong>Diccionario de Datos MariaDB InnoDB (Manual Técnico)</strong><br>
            - <code>company_profiles</code>: Perfiles de comercios, llaves bancarias cifradas y estado KYC.<br>
            - <code>orders</code>: Órdenes de compra con referencia única, total, dirección foránea y estados.<br>
            - <code>order_items</code>: Ítems comprados con precio histórico unitario y relación a productos.<br>
            - <code>admin_audit_logs</code>: Bitácora inmutable de auditoría para trazabilidad de analistas.<br>
            👉 Revisa la definición completa en el <a href="/tecnico/diccionario-datos">Diccionario de Datos</a>.
          `;
        }
        if (lower.includes('maquina') || lower.includes('máquina') || lower.includes('estado') || lower.includes('orden') || lower.includes('ciclo')) {
          return `
            <strong>Máquinas de Estados Finitos (Manual Técnico)</strong><br>
            - <strong>Órdenes:</strong> <code>pending</code> (reserva con lock) ➔ <code>paid</code> (confirmada por webhook) ➔ <code>processing</code> ➔ <code>shipped</code> (con tracking Envía) ➔ <code>delivered</code>.<br>
            - <strong>Transiciones canceladas:</strong> Liberan inmediatamente el inventario retenido.<br>
            👉 Ver diagrama de estados en <a href="/tecnico/maquinas-estados">Máquinas de Estados</a>.
          `;
        }
        if (lower.includes('lockforupdate') || lower.includes('bloqueo') || lower.includes('concurrencia') || lower.includes('sobreventa')) {
          return `
            <strong>Concurrencia Atómica y Bloqueo Pesimista (Manual Técnico)</strong><br>
            - Durante el checkout se ejecuta <code>SELECT ... FOR UPDATE</code> dentro de una transacción <code>DB::transaction</code>.<br>
            - Esto previene condiciones de carrera (*race conditions*) y sobreventa si múltiples usuarios intentan comprar el último ítem simultáneamente.<br>
            👉 Ver especificación en <a href="/tecnico/maquinas-estados">Concurrencia e Idempotencia</a>.
          `;
        }
        if (lower.includes('securityheaders') || lower.includes('csp') || lower.includes('hardening') || lower.includes('seguridad')) {
          return `
            <strong>Hardening HTTP y Cabeceras de Seguridad (Manual Técnico)</strong><br>
            El middleware <code>SecurityHeaders</code> inyecta en cada respuesta:<br>
            - <code>Content-Security-Policy</code>: Restringe orígenes de scripts e imágenes.<br>
            - <code>X-Frame-Options: SAMEORIGIN</code>: Previene clickjacking.<br>
            - <code>X-Content-Type-Options: nosniff</code>: Impide MIME-type sniffing.<br>
            - <code>Referrer-Policy: strict-origin-when-cross-origin</code>.<br>
            👉 Ver detalles en <a href="/tecnico/seguridad-hardening">Seguridad y Hardening</a>.
          `;
        }
        if (lower.includes('supervisor') || lower.includes('vps') || lower.includes('hostinger') || lower.includes('cron') || lower.includes('despliegue')) {
          return `
            <strong>Despliegue en Servidores VPS y Supervisor (Manual Técnico)</strong><br>
            - <strong>Supervisor:</strong> Mantiene activos los workers de cola: <code>php artisan queue:work --tries=3</code>.<br>
            - <strong>Cron:</strong> Programa cada minuto: <code>* * * * * php /ruta/artisan schedule:run >> /dev/null 2>&1</code>.<br>
            - <strong>Caché en producción:</strong> <code>config:cache</code>, <code>route:cache</code>, <code>view:cache</code>.<br>
            👉 Ver guía paso a paso en <a href="/tecnico/despliegue-operaciones">Despliegue y Operaciones</a>.
          `;
        }

        return `
          <strong>Consulta Técnica (Manual Técnico):</strong><br>
          En este manual puedes consultar sobre el diccionario de base de datos MariaDB, máquinas de estados finitos, bloqueos atómicos, cabeceras CSP y despliegue en VPS con Supervisor.<br>
          👉 Explora el <a href="/tecnico/diccionario-datos">Diccionario de Datos</a> o <a href="/tecnico/despliegue-operaciones">Despliegue en VPS</a>.
        `;
      }

      // 4. GENERAL PORTAL CONTEXT
      return `
        <strong>Centro de Documentación FusaShop:</strong><br>
        Puedo ayudarte a navegar hacia cualquiera de los tres manuales especializados:<br>
        - 📘 <a href="/usuario">Manual de Usuario</a>: Para compras, comercios, KYC y despachos.<br>
        - 💻 <a href="/desarrollador">Manual del Desarrollador</a>: Para código Laravel 12 SSR, servicios, MCP y APIs.<br>
        - ⚙️ <a href="/tecnico">Manual Técnico</a>: Para base de datos MariaDB, máquinas de estados y servidores.<br><br>
        ¡Ingresa a cualquiera de ellos para hacer preguntas especializadas con alcance restringido!
      `;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }
})();
