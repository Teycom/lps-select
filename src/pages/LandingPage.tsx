import React, { useEffect, useState, useRef } from 'react';
import { AlertCircle, X, CheckCircle2, Clock, Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { CONFIG, PageConfig } from '../config';

function LandingPage() {
  const { slug = 'default' } = useParams();
  const config: PageConfig = CONFIG[slug as keyof typeof CONFIG] || CONFIG.default;
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  const [showCTA, setShowCTA] = useState(false);
  const [remainingSpots, setRemainingSpots] = useState(20);
  const [showExitModal, setShowExitModal] = useState(false);
  const [socialProofName, setSocialProofName] = useState('');
  const [viewerCount, setViewerCount] = useState(439);
  const [isVideoFocused, setIsVideoFocused] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [usedNames, setUsedNames] = useState(new Set());
  const [userCity, setUserCity] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [hasSeenDelay, setHasSeenDelay] = useState(false);
  const [isVideoInitialized, setIsVideoInitialized] = useState(false);

  useEffect(() => {
    document.title = config.pageTitle;
  }, [config]);

  const latinNames = [
    "Guadalupe", "María", "Valentina", "Isabella", "Camila",
    "Sofia", "Ana Paula", "Luciana", "Carolina", "Fernanda",
    "Mariana", "Daniela", "Gabriela", "Victoria", "Andrea",
    "Alejandra", "Patricia", "Rosa", "Carmen", "Laura"
  ];

  useEffect(() => {
    const hasSeenDelayStorage = localStorage.getItem(`hasSeenDelay_${slug}`);
    if (hasSeenDelayStorage === 'true') {
      setHasSeenDelay(true);
      setShowCTA(true);
      setIsVideoFocused(true);
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
    const formattedTime = now.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    setClosingDate(formattedDate);
    setClosingTime(formattedTime);

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserCity(data.city || 'su ciudad');
      })
      .catch(() => setUserCity('su ciudad'));
  }, [slug]);

  useEffect(() => {
    if (!videoContainerRef.current || isVideoInitialized) {
      return;
    }

    const initializeVideo = () => {
      try {
        if (videoContainerRef.current) {
          videoContainerRef.current.innerHTML = '';

          const videoWrapper = document.createElement('div');
          videoWrapper.className = 'video-wrapper';
          videoWrapper.style.position = 'relative';
          videoWrapper.style.width = '100%';
          videoWrapper.style.height = '100%';

          const videoDiv = document.createElement('div');
          videoDiv.innerHTML = config.vturbScript;

          videoDiv.addEventListener('click', () => {
            if (!isVideoFocused) {
              setIsVideoFocused(true);
              if (!hasSeenDelay) {
                setTimeout(() => {
                  setShowCTA(true);
                  setHasSeenDelay(true);
                  localStorage.setItem(`hasSeenDelay_${slug}`, 'true');
                }, config.contentDelay);
              }
            }
          });

          videoWrapper.appendChild(videoDiv);
          videoContainerRef.current.appendChild(videoWrapper);

          const scriptElement = videoDiv.querySelector('script');
          if (scriptElement && scriptElement.parentNode) {
            const newScript = document.createElement('script');
            newScript.text = scriptElement.text;
            newScript.id = scriptElement.id;
            newScript.async = true;
            newScript.onerror = (error) => {
              console.error('Error loading video script:', error);
            };
            scriptElement.parentNode.replaceChild(newScript, scriptElement);
            setIsVideoInitialized(true);
          } else {
            console.warn('Script element or parent node not found, retrying...');
            setTimeout(initializeVideo, 500);
          }
        }
      } catch (error) {
        console.error('Error initializing video:', error);
        setTimeout(initializeVideo, 500);
      }
    };

    initializeVideo();

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'video-start' || event.data?.type === 'video-start') {
        setIsVideoFocused(true);
        if (!hasSeenDelay) {
          setTimeout(() => {
            setShowCTA(true);
            setHasSeenDelay(true);
            localStorage.setItem(`hasSeenDelay_${slug}`, 'true');
          }, config.contentDelay);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [config.vturbScript, slug, config.contentDelay, hasSeenDelay, isVideoFocused, isVideoInitialized]);

  const getRandomUnusedName = () => {
    const availableNames = latinNames.filter(name => !usedNames.has(name));
    if (availableNames.length === 0) {
      setUsedNames(new Set());
      return latinNames[Math.floor(Math.random() * latinNames.length)];
    }
    const name = availableNames[Math.floor(Math.random() * availableNames.length)];
    setUsedNames(new Set([...usedNames, name]));
    return name;
  };

  useEffect(() => {
    const viewerTimer = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 5) + 1;
        const decrease = Math.random() < 0.3;
        return decrease ? prev - Math.min(3, change) : prev + change;
      });
    }, 3000);

    let socialProofTimer: NodeJS.Timeout;
    if (showCTA) {
      socialProofTimer = setInterval(() => {
        const newName = getRandomUnusedName();
        setSocialProofName(newName);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }, 3000);
    }

    const fomoTimer = setInterval(() => {
      setRemainingSpots((prev) => {
        if (prev <= 1) return 1;
        return prev - 1;
      });
    }, 2000);

    const handleExit = (e: MouseEvent) => {
      if (e.clientY <= 0 && showCTA) {
        setShowExitModal(true);
      }
    };

    const handlePopState = () => {
      if (showCTA) {
        setShowExitModal(true);
        history.pushState(null, '', window.location.pathname);
      }
    };

    if (showCTA) {
      history.pushState(null, '', window.location.pathname);
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('mouseleave', handleExit);
    }

    return () => {
      clearInterval(viewerTimer);
      if (socialProofTimer) clearInterval(socialProofTimer);
      clearInterval(fomoTimer);
      if (showCTA) {
        document.removeEventListener('mouseleave', handleExit);
        window.removeEventListener('popstate', handlePopState);
      }
    };
  }, [showCTA]);

  const handleWhatsApp = () => {
    window.open(config.whatsappLink, '_blank');
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="sticky top-0 z-50 bg-red-600 text-white py-2 px-4 text-center font-medium shadow-lg">
        <Clock className="inline-block mr-2 h-4 w-4" />
        Este sitio se cerrará día {closingDate} a las {closingTime}
      </div>

      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&q=80')",
          opacity: isVideoFocused ? 0 : 0.3,
          transition: 'opacity 1s ease-in-out'
        }}
      />

      {isVideoFocused && (
        <div 
          className="fixed inset-0 bg-black z-10 transition-opacity duration-1000"
          style={{ opacity: 0.95 }}
        />
      )}

      <div className="relative z-20 max-w-4xl mx-auto pt-8 px-4">
        <div className="text-center mb-4 animate-fade-in">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-1000 ${
            isVideoFocused ? 'text-white' : 'text-red-600'
          } bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent`}>
            {config.title}
          </h1>
          <p className="text-lg bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent font-semibold transition-colors duration-1000">
            {config.description}
          </p>
        </div>

        <div className="text-center mb-4">
          <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full text-sm shadow-lg">
            {viewerCount} mamás viendo ahora en {userCity}
          </span>
        </div>

        {showCTA && socialProofName && showNotification && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white/90 shadow-lg rounded-lg p-3 animate-slide-in-right transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">
                    {socialProofName} compró ahora ✨
                  </p>
                  <p className="text-xs text-gray-500">Hace unos momentos</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative max-w-3xl mx-auto mb-8">
          <div 
            ref={videoContainerRef}
            className={`relative rounded-xl shadow-2xl border-2 border-pink-200/30 transition-all duration-700 ${
              isVideoFocused ? 'scale-100 transform-none' : 'hover:scale-[1.02]'
            }`}
          />
        </div>

        {showCTA && config.showCTAButton && (
          <div className="text-center animate-slide-up">
            <button
              onClick={handleWhatsApp}
              className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl font-bold py-6 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-attention w-full max-w-2xl"
            >
              {config.ctaText}
              <div className="text-sm mt-1 text-green-100">
                Solo resta {remainingSpots} {remainingSpots === 1 ? 'vacante disponible' : 'vacantes disponibles'}
              </div>
            </button>
          </div>
        )}

        <footer className="py-8 mt-12 text-center">
          <div className="space-x-4 mb-4">
            <button 
              onClick={() => setShowPrivacyPolicy(true)}
              className={`text-sm ${isVideoFocused ? 'text-gray-400' : 'text-gray-600'} hover:underline`}
            >
              Política de Privacidad
            </button>
            <button 
              onClick={() => setShowTerms(true)}
              className={`text-sm ${isVideoFocused ? 'text-gray-400' : 'text-gray-600'} hover:underline`}
            >
              Términos de Uso
            </button>
          </div>
          <p className={`text-sm ${isVideoFocused ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Todos los derechos reservados
          </p>
        </footer>
      </div>

      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto relative">
            <button
              onClick={() => setShowPrivacyPolicy(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Política de Privacidad</h2>
            <div className="prose prose-sm max-h-[70vh] overflow-y-auto">
              <p>Última actualización: {new Date().toLocaleDateString()}</p>
              
              <h3>1. Información que Recopilamos</h3>
              <p>Recopilamos información que usted nos proporciona directamente cuando:</p>
              <ul>
                <li>Se registra en nuestro sitio web</li>
                <li>Realiza una compra</li>
                <li>Se comunica con nosotros a través de WhatsApp</li>
                <li>Participa en nuestros programas de tratamiento</li>
              </ul>

              <h3>2. Uso de la Información</h3>
              <p>Utilizamos la información recopilada para:</p>
              <ul>
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Procesar sus transacciones</li>
                <li>Enviar información sobre nuestros programas</li>
                <li>Personalizar su experiencia</li>
              </ul>

              <h3>3. Compartir Información</h3>
              <p>No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información con:</p>
              <ul>
                <li>Proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                <li>Autoridades legales cuando sea requerido por ley</li>
              </ul>

              <h3>4. Cookies y Tecnologías Similares</h3>
              <p>Utilizamos cookies y tecnologías similares para:</p>
              <ul>
                <li>Mejorar la experiencia del usuario</li>
                <li>Analizar el uso del sitio</li>
                <li>Personalizar el contenido</li>
              </ul>

              <h3>5. Facebook Ads</h3>
              <p>Utilizamos Facebook Ads y cumplimos con sus políticas de publicidad, incluyendo:</p>
              <ul>
                <li>Pixel de Facebook para seguimiento de conversiones</li>
                <li>Remarketing a usuarios interesados</li>
                <li>Creación de audiencias similares</li>
              </ul>

              <h3>6. Sus Derechos</h3>
              <p>Usted tiene derecho a:</p>
              <ul>
                <li>Acceder a sus datos personales</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al procesamiento de sus datos</li>
              </ul>

              <h3>7. Seguridad</h3>
              <p>Implementamos medidas de seguridad para proteger su información personal contra acceso, alteración o divulgación no autorizada.</p>

              <h3>8. Cambios en esta Política</h3>
              <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>

              <h3>9. Contacto</h3>
              <p>Si tiene preguntas sobre esta política de privacidad, puede contactarnos a través de WhatsApp.</p>
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto relative">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Términos de Uso</h2>
            <div className="prose prose-sm max-h-[70vh] overflow-y-auto">
              <p>Última actualización: {new Date().toLocaleDateString()}</p>

              <h3>1. Aceptación de los Términos</h3>
              <p>Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad.</p>

              <h3>2. Descripción del Servicio</h3>
              <p>Ofrecemos programas de tratamiento para la selectividad alimentaria infantil. Nuestros servicios incluyen:</p>
              <ul>
                <li>Consultas personalizadas</li>
                <li>Materiales educativos</li>
                <li>Seguimiento del progreso</li>
                <li>Soporte por WhatsApp</li>
              </ul>

              <h3>3. Elegibilidad</h3>
              <p>Para utilizar nuestros servicios, usted debe:</p>
              <ul>
                <li>Ser mayor de 18 años</li>
                <li>Tener capacidad legal para contratar</li>
                <li>Proporcionar información precisa y completa</li>
              </ul>

              <h3>4. Pagos y Reembolsos</h3>
              <p>Al realizar una compra:</p>
              <ul>
                <li>Los precios están en la moneda local especificada</li>
                <li>Los pagos son procesados de forma segura</li>
                <li>Las políticas de reembolso se aplican según lo especificado en la compra</li>
              </ul>

              <h3>5. Propiedad Intelectual</h3>
              <p>Todo el contenido del sitio web está protegido por derechos de autor y no puede ser:</p>
              <ul>
                <li>Copiado sin autorización</li>
                <li>Distribuido comercialmente</li>
                <li>Modificado o alterado</li>
              </ul>

              <h3>6. Limitación de Responsabilidad</h3>
              <p>No nos hacemos responsables de:</p>
              <ul>
                <li>Resultados específicos del tratamiento</li>
                <li>Daños indirectos o consecuentes</li>
                <li>Interrupciones del servicio</li>
              </ul>

              <h3>7. Modificaciones del Servicio</h3>
              <p>Nos reservamos el derecho de:</p>
              <ul>
                <li>Modificar o discontinuar el servicio</li>
                <li>Actualizar precios y características</li>
                <li>Cambiar proveedores y métodos de entrega</li>
              </ul>

              <h3>8. Terminación</h3>
              <p>Podemos terminar o suspender el acceso a nuestros servicios por:</p>
              <ul>
                <li>Violación de estos términos</li>
                <li>Conducta fraudulenta</li>
                <li>Uso indebido del servicio</li>
              </ul>

              <h3>9. Ley Aplicable</h3>
              <p>Estos términos se rigen por las leyes del país donde operamos y cualquier disputa será resuelta en los tribunales correspondientes.</p>

              <h3>10. Contacto</h3>
              <p>Para cualquier pregunta sobre estos términos, contáctenos a través de WhatsApp.</p>
            </div>
          </div>
        </div>
      )}

      {showExitModal && showCTA && config.showCTAButton && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowExitModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart className="text-pink-500 w-16 h-16 animate-pulse" />
                <div className="absolute -top-1 -right-1">
                  <Heart className="text-red-500 w-6 h-6" />
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
              ¡Mamá, no te vayas todavía!
            </h3>
            
            <p className="text-gray-600 mb-6 text-center">
              Entendemos tu preocupación por la alimentación de tu hijo. ¡Nuestra especialista está disponible para resolver tus dudas!
            </p>
            
            <button
              onClick={handleWhatsApp}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-colors"
            >
              Hablar con Especialista
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;