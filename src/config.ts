export interface PageConfig {
  title: string;
  description: string;
  whatsappNumber: string;
  contentDelay: number;
  ctaText: string;
  pageTitle: string;
  vturbScript: string;
  showCTAButton: boolean;
  whatsappLink: string;
}

const baseConfig: PageConfig = {
  title: "Descubra Como Curar la Selectividad Alimentaria de Tu Hijo(a) en 4 días",
  description: "Cómo superar definitivamente el miedo a los alimentos nuevos",
  whatsappNumber: "5585981173668",
  contentDelay: 60000, // 60 seconds
  ctaText: "Quiero curar a mi hijo",
  pageTitle: "VSL Landing Page - Selectividad Alimentaria",
  vturbScript: `<div id="vid_67eda53da631089c50619e53" style="position: relative; width: 100%; padding: 125% 0 0;"> <img id="thumb_67eda53da631089c50619e53" src="https://images.converteai.net/f91220c1-587a-4429-81d3-1c00950f45eb/players/67eda53da631089c50619e53/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail"> <div id="backdrop_67eda53da631089c50619e53" style=" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; "></div> </div> <script type="text/javascript" id="scr_67eda53da631089c50619e53"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/f91220c1-587a-4429-81d3-1c00950f45eb/players/67eda53da631089c50619e53/player.js", s.async=!0,document.head.appendChild(s); </script>`,
  showCTAButton: true,
  whatsappLink: "https://wa.me/5585981173668"
};

export const CONFIG = {
  // Base configuration for the default route
  default: baseConfig,
  
  // Configuration for /gjgks01
  gjgks01: {
    ...baseConfig,
    title: "Descubra el Método Comprobado para Curar la Selectividad Alimentaria",
    description: "Cómo superar definitivamente el miedo a los alimentos nuevos hoy",
    contentDelay: 45000, // 45 seconds
    whatsappNumber: "5585981173668",
    pageTitle: "Método Comprobado - Selectividad Alimentaria",
    showCTAButton: true,
    whatsappLink: "https://wa.me/5585981173668?text=Hola%2C%20me%20interesa%20el%20programa%20de%20selectividad%20alimentaria",
    vturbScript: `<div id="vid_67eda53da631089c50619e53" style="position: relative; width: 100%; padding: 125% 0 0;"> <img id="thumb_67eda53da631089c50619e53" src="https://images.converteai.net/f91220c1-587a-4429-81d3-1c00950f45eb/players/67eda53da631089c50619e53/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail"> <div id="backdrop_67eda53da631089c50619e53" style=" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; "></div> </div> <script type="text/javascript" id="scr_67eda53da631089c50619e53"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/f91220c1-587a-4429-81d3-1c00950f45eb/players/67eda53da631089c50619e53/player.js", s.async=!0,document.head.appendChild(s); </script>`
  },
  
  // Configuration for /gjgks02
  gjgks02: {
    ...baseConfig,
    title: "¡Transforma la Alimentación de Tu Hijo en Solo 4 Días!",
    description: "Método científico para superar la selectividad alimentaria",
    contentDelay: 30000,
    whatsappNumber: "5585981173668",
    pageTitle: "Transformación Alimentaria - 4 Días",
    showCTAButton: true,
    whatsappLink: "https://wa.me/5585981173668?text=Quiero%20transformar%20la%20alimentación%20de%20mi%20hijo",
    vturbScript: "" // Add your vturb script here
  },
  
  // Configuration for /gjgks03
  gjgks03: {
    ...baseConfig,
    title: "Solución Definitiva para la Selectividad Alimentaria Infantil",
    description: "Ayuda a tu hijo a disfrutar de nuevos alimentos",
    ctaText: "¡Quiero Empezar Ahora!",
    contentDelay: 90000,
    whatsappNumber: "5585981173668",
    pageTitle: "Solución Definitiva - Alimentación Infantil",
    showCTAButton: false,
    whatsappLink: "https://wa.me/5585981173668?text=Me%20interesa%20la%20solución%20definitiva",
    vturbScript: "" // Add your vturb script here
  }
};