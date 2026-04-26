import React, { useState, useEffect } from 'react';
import './index.css';

const MOCK_MEMBERS = [
  {
    id: 1, name: "Elena García", esfera: "LEGAL Y FINANCIERO",
    desc: "Asesoría fiscal experta para pymes y autónomos.",
    phone: "600111222", email: "elena@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2, name: "Carlos Ruiz", esfera: "SERVICIOS A EMPRESAS",
    desc: "Consultoría y estrategia empresarial avanzada.",
    phone: "600333444", email: "carlos@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 3, name: "Marta Sánchez", esfera: "MARKETING Y OTROS PROFESIONALES",
    desc: "Agencia de marketing digital y redes sociales.",
    phone: "600555666", email: "marta@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 4, name: "Javier López", esfera: "CONSTRUCCIÓN Y REFORMAS",
    desc: "Reformas integrales y diseño de interiores funcionales.",
    phone: "600777888", email: "javier@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=14"
  },
  {
    id: 5, name: "Ana Martínez", esfera: "PROYECTO Y COMERCIO INMOBILIARIO",
    desc: "Gestión experta en compraventa de inmuebles.",
    phone: "600999000", email: "ana@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 6, name: "Luis Fernández", esfera: "SERVICIOS COMERCIALES Y OTROS SERVICIOS",
    desc: "Atención comercial, logística y distribución.",
    phone: "600123123", email: "luis@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 7, name: "Sofía Romero", esfera: "SERVICIOS DE SALUD Y BIENESTAR",
    desc: "Clínica de fisioterapia y osteopatía avanzada.",
    phone: "600456456", email: "sofia@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 8, name: "Fundación Ejemplo", esfera: "FUNDACION/ONG",
    desc: "Proyectos solidarios y ONG local activa.",
    phone: "600789789", email: "ong@grupotrabajobni.com", web: "www.ejemplo.es", photo: "https://i.pravatar.cc/150?img=3"
  }
];

const SvgIconWrapper = ({ children }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--bni-red)' }}>
    {children}
  </svg>
);

const ESFERA_ICONS = {
  "LEGAL Y FINANCIERO": <SvgIconWrapper><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></SvgIconWrapper>,
  "SERVICIOS A EMPRESAS": <SvgIconWrapper><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></SvgIconWrapper>,
  "MARKETING Y OTROS PROFESIONALES": <SvgIconWrapper><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></SvgIconWrapper>,
  "CONSTRUCCIÓN Y REFORMAS": <SvgIconWrapper><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></SvgIconWrapper>,
  "PROYECTO Y COMERCIO INMOBILIARIO": <SvgIconWrapper><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></SvgIconWrapper>,
  "SERVICIOS COMERCIALES Y OTROS SERVICIOS": <SvgIconWrapper><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></SvgIconWrapper>,
  "SERVICIOS DE SALUD Y BIENESTAR": <SvgIconWrapper><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></SvgIconWrapper>,
  "FUNDACION/ONG": <SvgIconWrapper><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></SvgIconWrapper>
};

function App() {
  const [openEsfera, setOpenEsfera] = useState(null);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  // --- CONEXIÓN CON N8N ---
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDirectorio = async () => {
      try {
        // Llama al Webhook de n8n
        const res = await fetch("https://n8n-n8n.npfusf.easypanel.host/webhook/bni-directorio");
        if (!res.ok) throw new Error("Fallo en la respuesta del Webhook");
        
        const data = await res.json();
        // Si n8n devuelve datos válidos, los usamos
        if (Array.isArray(data) && data.length > 0) {
          console.log("¡Datos cargados con éxito desde Google Sheets a través de n8n!", data);
          // Mapear los nombres de las columnas del Excel (en español) a los que usa la web
          const mappedData = data.map((item, index) => ({
            id: item.id || index + 1,
            name: item['Miembro'] || item['Nombre y apellido'] || item.name || "Sin nombre",
            company: item['Empresa'] || item.company || "",
            specialty: item['Especialidad'] || item.specialty || "",
            desc: item['Descripción'] || item.desc || "",
            phone: item['Teléfono'] || item.phone || "",
            email: item['E-mail'] || item['Email'] || item.email || "",
            web: item['Web'] || item.web || "",
            photo: item['FOTO'] || item['Foto'] || item.photo || "https://i.pravatar.cc/150?u=default",
            esfera: item['Esfera'] || item.esfera || "Otras Profesiones"
          }));
          setMembers(mappedData);
        } else {
          console.warn("Datos vacíos del webhook, usando datos de prueba temporales.");
        }
      } catch (error) {
        console.error("Aún no hay conexión con n8n, usando los datos de prueba:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDirectorio();
  }, []);
  // -------------------------

  useEffect(() => {
    const handleScroll = () => {
      if (!popupDismissed && window.scrollY > 300) {
        setShowChatPopup(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [popupDismissed]);
  const [cart, setCart] = useState([]);
  const [mesesCuota, setMesesCuota] = useState(1);
  
  // --- ESTADOS PARA FORMULARIOS DE PAGO ---
  const [miembroNombre, setMiembroNombre] = useState('');
  
  const [invitadoData, setInvitadoData] = useState({
    nombre: '', nif: '', direccion: '', email: '', telefono: '', host: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async (tipo) => {
    setIsSubmitting(true);
    let payload = {};
    
    // Preparar el paquete de datos según el formulario
    if (tipo === 'miembro') {
      if (!miembroNombre) {
        alert("Por favor, selecciona tu perfil oficial del listado.");
        setIsSubmitting(false);
        return;
      }
      payload = {
        tipo_pago: "Cuota Miembro",
        nombre: miembroNombre,
        meses_pagados: mesesCuota,
        importe_total: mesesCuota * 80,
        fecha_solicitud: new Date().toISOString()
      };
    } else {
      if (!invitadoData.nombre || !invitadoData.nif || !invitadoData.email) {
        alert("Por favor, rellena al menos tu nombre, NIF y email para la factura.");
        setIsSubmitting(false);
        return;
      }
      payload = {
        tipo_pago: "Acceso Invitado",
        nombre: invitadoData.nombre,
        nif: invitadoData.nif,
        direccion: invitadoData.direccion,
        email: invitadoData.email,
        telefono: invitadoData.telefono,
        miembro_anfitrion: invitadoData.host,
        importe_total: 20,
        fecha_solicitud: new Date().toISOString()
      };
    }

    // Enviar a n8n
    try {
      const res = await fetch("https://n8n-n8n.npfusf.easypanel.host/webhook/bni-facturacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Fallo en la conexión con n8n");
      
      alert("✅ ¡Datos recibidos correctamente por n8n! Generando tu factura...");
      
      // Limpiar los campos después del éxito
      if (tipo === 'miembro') {
        setMiembroNombre('');
        setMesesCuota(1);
      } else {
        setInvitadoData({ nombre: '', nif: '', direccion: '', email: '', telefono: '', host: '' });
      }
    } catch (error) {
      console.error("Error al enviar a n8n:", error);
      alert("⚠️ El sistema de facturación n8n parece estar desconectado ahora mismo (posiblemente esperando acceso a Google).");
    } finally {
      setIsSubmitting(false);
    }
  };

  
  // Group members by "esfera"
  const esferasMap = members.reduce((acc, member) => {
    // Si algún miembro del Excel no tiene esfera asignada, lo ponemos en una por defecto
    const nombreEsfera = member.esfera || "OTRAS ESFERAS";
    if (!acc[nombreEsfera]) acc[nombreEsfera] = [];
    acc[nombreEsfera].push(member);
    return acc;
  }, {});

  const esferas = Object.keys(esferasMap);

  const toggleEsfera = (esfera) => {
    setOpenEsfera(openEsfera === esfera ? null : esfera);
  };

  const toggleCart = (member) => {
    const exists = cart.find(item => item.id === member.id);
    if (exists) {
      setCart(cart.filter(item => item.id !== member.id));
    } else {
      setCart([...cart, member]);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      {/* ---------------------------------
          HIDDEN PRINT COMPONENT (PDF OUTPUT)
          --------------------------------- */}
      <div className="print-only pdf-document">
        <div className="pdf-header">
          <div>
            <img src="/logo_bni_trabajo.png" alt="Logo BNI Trabajo" />
            <p>Networking Sheet / Directorio</p>
          </div>
          <div style={{textAlign: 'right'}}>
            <h1>Mis Contactos BNI</h1>
            <p>Lista de Sinergias Seleccionadas</p>
          </div>
        </div>
        
        <table className="pdf-list">
          <thead>
            <tr>
              <th>Profesional / Empresa</th>
              <th>Contacto Principal</th>
              <th>Web</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(member => (
              <tr key={`print-${member.id}`}>
                <td>
                  <strong>{member.name}</strong><br/>
                  <span className="pdf-esfera-badge">{member.esfera}</span>
                </td>
                <td>
                  {member.phone}<br/>
                  {member.email}
                </td>
                <td>{member.web}</td>
              </tr>
            ))}
            {cart.length === 0 && (
              <tr>
                <td colSpan="3" style={{textAlign: 'center', padding: '20px'}}>No has seleccionado ningún contacto.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------------------------
          MAIN APP INTERFACE
          --------------------------------- */}
      <header className="bni-header">
        <div className="bni-header-logo-container">
          <img src="/logo_bni_trabajo.png" alt="Logo BNI Trabajo" />
          <span className="bni-header-title">Directorio BNI | Grupo Trabajo</span>
        </div>
      </header>

      <main className="container">
        
        {/* CARTRIDGE PANEL */}
        {cart.length > 0 && (
          <div className="cart-panel">
            <div className="cart-panel-header">
              <h3>Tu Selección de Networking ({cart.length})</h3>
              <button className="btn-secondary" style={{width: 'auto'}} onClick={handleDownloadPDF}>
                📥 Descargar PDF (Sinergias)
              </button>
            </div>
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={`cart-${item.id}`} className="cart-item">
                  <div>
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-esfera">{item.esfera}</span>
                  </div>
                  <button className="btn-remove" onClick={() => toggleCart(item)} title="Eliminar">×</button>
                </div>
              ))}
            </div>
            <p style={{fontSize: '0.85rem', color: '#666', margin: 0}}>
              * Al descargar, el sistema creará un documento limpio para imprimir o llevar en tu móvil.
            </p>
          </div>
        )}

        {/* DIRECTORIO SECTION */}
        <section>
          <h2 className="section-title">Nuestras Esferas de Especialización</h2>
          
          <div style={{ background: '#fff', borderLeft: '4px solid var(--bni-red)', padding: '15px 20px', marginBottom: '20px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--bni-dark-text)', fontSize: '1.1rem', marginBottom: '8px' }}>🚀 Maximiza tu visita: Prepara tu Networking</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', margin: 0 }}>
              Si es tu primera vez en una reunión de networking, el secreto del éxito está en la preparación. 
              Navega por nuestras esferas, descubre a los profesionales del grupo y haz clic en <strong>"+ Añadir a Sinergias"</strong> en aquellos con los que te interese hablar. 
              Al terminar, podrás descargar tu lista en PDF para llevarla a la reunión y tener claro con quién conectar. ¡Sácale el máximo partido a tu tiempo!
            </p>
          </div>

          <div style={{ background: '#f9f9f9', border: '1px solid #eee', padding: '20px', marginBottom: '30px', borderRadius: '6px' }}>
            <h3 style={{ color: 'var(--bni-red)', fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{fontSize: '1.3rem'}}>💡</span> Pautas para una Visita de Éxito
            </h3>
            
            <ul style={{ color: '#555', fontSize: '0.95rem', margin: 0, paddingLeft: '20px', lineHeight: '1.7' }}>
              <li><strong>Planificación:</strong> Guardar la dirección del lugar de la reunión y prever el desplazamiento con tiempo.</li>
              <li><strong>Puntualidad:</strong> Acudir a la hora establecida para aprovechar el networking libre inicial.</li>
              <li><strong>Contacto:</strong> Llevar tarjetas de visita si se utilizan habitualmente.</li>
              <li><strong>Presentación oficial:</strong> Será tu Miembro Anfitrión quien tome la palabra para presentarte ante el grupo. Como invitado, solo tendrás que levantarte para saludar; podrás explicar tu negocio ampliamente durante el networking libre.</li>
              <li><strong>Vestimenta:</strong> La recomendación es acudir con una imagen profesional y cuidada, acorde con un entorno de networking empresarial.</li>
            </ul>
          </div>
          
          {/* CIRCULAR ICONS GRID OR ACTIVE SPHERE VIEW */}
          {!openEsfera ? (
            <div className="esferas-circles-grid">
              {esferas.map((esfera) => (
                <div 
                  key={esfera} 
                  className="esfera-circle"
                  onClick={() => toggleEsfera(esfera)}
                >
                  <div className="esfera-icon">{ESFERA_ICONS[esfera] || "🔹"}</div>
                  <div className="esfera-name">{esfera}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="active-esfera-container">
              <button 
                onClick={() => setOpenEsfera(null)} 
                style={{ background: 'transparent', border: 'none', color: 'var(--bni-red)', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px', padding: 0 }}
              >
                <span style={{ fontSize: '1.2rem' }}>←</span> Volver a todas las esferas
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '6px', borderLeft: '4px solid var(--bni-red)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '2.5rem' }}>{ESFERA_ICONS[openEsfera] || "🔹"}</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--bni-dark-text)' }}>{openEsfera}</h2>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{esferasMap[openEsfera].length} Miembro(s) disponibles en esta especialidad</p>
                </div>
              </div>

              <div className="cards-grid">
                {esferasMap[openEsfera].map(member => {
                  const inCart = cart.find(i => i.id === member.id);
                  return (
                    <div key={member.id} className="bni-card" style={inCart ? {border: '2px solid var(--bni-red)'} : {}}>
                      <div className="bni-card-body">
                        <img src={member.photo} alt={member.name} className="bni-card-avatar" />
                        <h3 className="bni-card-name">{member.name}</h3>
                        <p className="bni-card-desc" style={{marginTop: '10px'}}>{member.desc}</p>
                        
                        <button 
                          className="btn-add"
                          onClick={() => toggleCart(member)}>
                          {inCart ? '✓ Añadido a Sinergias' : '+ Añadir a Sinergias'}
                        </button>
                      </div>
                      <div className="bni-card-footer">
                        <a href={`mailto:${member.email}`}>Email</a>
                        <a href={`tel:${member.phone}`}>Llamar</a>
                        <a href={`https://${member.web}`} target="_blank" rel="noreferrer">Web</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* PAGOS SECTION */}
        <section style={{ marginTop: '60px' }}>
          <h2 className="section-title">Gestión de Pagos y Facturas Activas</h2>
          <div className="payment-section">
            
            <div className="payment-card">
              <h3>Cuotas Miembros BNI</h3>
              <p>Selecciona tu nombre del listado oficial y abona los 80€ mensuales con un clic para generar tu factura VeriFactu.</p>
              
              <div className="form-group">
                <label>Selecciona tu Perfil Oficial</label>
                <input 
                  list="miembros-lista" 
                  className="form-control" 
                  placeholder="Empieza a escribir tu nombre..." 
                  value={miembroNombre}
                  onChange={(e) => setMiembroNombre(e.target.value)}
                />
                <datalist id="miembros-lista">
                  {members.map((m, i) => <option key={`miembro-${m.id || i}`} value={m.name} />)}
                </datalist>
              </div>
              <div className="form-group">
                <label>Meses a liquidar</label>
                <select className="form-control" value={mesesCuota} onChange={(e) => setMesesCuota(Number(e.target.value))}>
                  <option value={1}>1 mes (80€)</option>
                  <option value={2}>2 meses (160€)</option>
                  <option value={3}>3 meses (240€)</option>
                  <option value={4}>4 meses (320€)</option>
                  <option value={5}>5 meses (400€)</option>
                  <option value={6}>6 meses (480€)</option>
                </select>
              </div>
              <button 
                className="btn-primary" 
                style={{marginTop: '10px'}}
                onClick={() => handlePayment('miembro')}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : `Pagar Cuotas (${mesesCuota * 80}€)`}
              </button>
            </div>

            <div className="payment-card">
              <h3>Acceso para Invitados</h3>
              <p>¿Vienes a visitarnos al Grupo Trabajo? Rellena tus datos fiscales para emitir tu factura de asistencia a la reunión directamente.</p>
              
              <div className="form-group">
                <label>Nombre y Apellidos</label>
                <input type="text" className="form-control" placeholder="Ej: Juan Pérez" value={invitadoData.nombre} onChange={e => setInvitadoData({...invitadoData, nombre: e.target.value})} />
              </div>
              <div className="form-group">
                <label>NIF / CIF</label>
                <input type="text" className="form-control" placeholder="12345678A" value={invitadoData.nif} onChange={e => setInvitadoData({...invitadoData, nif: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Dirección Fiscal</label>
                <input type="text" className="form-control" placeholder="C/ Principal 1, 28001 Madrid" value={invitadoData.direccion} onChange={e => setInvitadoData({...invitadoData, direccion: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="juan@ejemplo.com" value={invitadoData.email} onChange={e => setInvitadoData({...invitadoData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" className="form-control" placeholder="600 123 456" value={invitadoData.telefono} onChange={e => setInvitadoData({...invitadoData, telefono: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Miembro Anfitrión (Quién te invita)</label>
                <input 
                  list="anfitriones-lista" 
                  className="form-control" 
                  placeholder="Escribe para buscar o selecciona..." 
                  value={invitadoData.host} 
                  onChange={e => setInvitadoData({...invitadoData, host: e.target.value})}
                />
                <datalist id="anfitriones-lista">
                  <option value="No lo recuerdo / LinkedIn" />
                  {members.map((m, i) => <option key={`host-${m.id || i}`} value={m.name} />)}
                </datalist>
              </div>
              <button 
                className="btn-primary" 
                style={{marginTop: '10px'}}
                onClick={() => handlePayment('invitado')}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Pagar Evento Invitado (20€)'}
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Footer SeviAI Ecosystem */}
      <footer className="seviai-footer">
        <p className="seviai-copyright">
          © 2026 BNI Trabajo
        </p>
        <a 
          href="https://www.seviai.es/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="seviai-link"
        >
          SeviAI Ecosystem
          <img 
            src="/logo_sin_fondo.png" 
            alt="SeviAI" 
            className="seviai-logo" 
          />
        </a>
      </footer>

      {/* CHAT POPUP PROACTIVE */}
      {showChatPopup && !popupDismissed && (
        <div className="chat-popup" onClick={() => {
          if (window.botpressWebChat) window.botpressWebChat.sendEvent({ type: 'show' });
          setShowChatPopup(false);
          setPopupDismissed(true);
        }}>
          <button className="chat-popup-close" onClick={(e) => {
            e.stopPropagation();
            setShowChatPopup(false);
            setPopupDismissed(true);
          }}>×</button>
          <p className="chat-popup-text">🤖 ¿Tienes dudas? ¡Pregúntale al asistente BNI!</p>
        </div>
      )}
    </>
  );
}

export default App;
