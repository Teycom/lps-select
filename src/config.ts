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
  title: "x",
  description: "x",
  whatsappNumber: "5585981173668",
  contentDelay: 60000, // 60 seconds
  ctaText: "Quiero curar a mi hijo",
  pageTitle: "x",
    vturbScript: `<div id="vid_681ef539fed15d19aa9f0155" style="position: relative; width: 100%; padding: 56.25% 0 0;"> <img id="thumb_681ef539fed15d19aa9f0155" src="https://images.converteai.net/51fda5f6-4360-43a5-b8f0-6b573e0e0bea/players/681ef539fed15d19aa9f0155/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail"> <div id="backdrop_681ef539fed15d19aa9f0155" style=" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; "></div> </div> <script type="text/javascript" id="scr_681ef539fed15d19aa9f0155"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/51fda5f6-4360-43a5-b8f0-6b573e0e0bea/players/681ef539fed15d19aa9f0155/player.js", s.async=!0,document.head.appendChild(s); </script>`,
  showCTAButton: true,
  whatsappLink: "https://wa.me/5585981173668"
};

export const CONFIG = {
  // Base configuration for the default route
  default: baseConfig,
  
  // Configuration for /gjgks01
  gjgks01: {
    ...baseConfig,
    title: "x",
    description: "x",
    contentDelay: 45000000000000000, // 45 seconds
    whatsappNumber: "5585981173668",
    pageTitle: "x",
    showCTAButton: true,
    whatsappLink: "https://wa.me/5585981173668?text=Hola%2C%20me%20interesa%20el%20programa%20de%20selectividad%20alimentaria",
    vturbScript: `<div id="vid_681ef539fed15d19aa9f0155" style="position: relative; width: 100%; padding: 56.25% 0 0;"> <img id="thumb_681ef539fed15d19aa9f0155" src="https://images.converteai.net/51fda5f6-4360-43a5-b8f0-6b573e0e0bea/players/681ef539fed15d19aa9f0155/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail"> <div id="backdrop_681ef539fed15d19aa9f0155" style=" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; "></div> </div> <script type="text/javascript" id="scr_681ef539fed15d19aa9f0155"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/51fda5f6-4360-43a5-b8f0-6b573e0e0bea/players/681ef539fed15d19aa9f0155/player.js", s.async=!0,document.head.appendChild(s); </script>`
  },
  
  // Configuration for /gjgks02
  gjgks02: {
    ...baseConfig,
    title: "x",
    description: "x",
    contentDelay: 30000000000000000,
    whatsappNumber: "5585981173668",
    pageTitle: "x",
    showCTAButton: true,
    whatsappLink: "https://wa.me/5585981173668?text=Quiero%20transformar%20la%20alimentación%20de%20mi%20hijo",
    vturbScript: `<div id="vid_681ef50fe3b3cfc4a138c00d" style="position: relative; width: 100%; padding: 56.25% 0 0;"> <img id="thumb_681ef50fe3b3cfc4a138c00d" src="https://images.converteai.net/51fda5f6-4360-43a5-b8f0-6b573e0e0bea/players/681ef50fe3b3cfc4a138c00d/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail"> <div id="backdrop_681ef50fe3b3cfc4a138c00d" style=" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; "></div> </div> <script type="text/javascript" id="scr_681ef50fe3b3cfc4a138c00d"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/51fda5f6-4360-43a5-b8f0-6b573e0e0bea/players/681ef50fe3b3cfc4a138c00d/player.js", s.async=!0,document.head.appendChild(s); </script>` // Add your vturb script here
  },
  
  // Configuration for /gjgks03
  gjgks03: {
    ...baseConfig,
    title: "x",
    description: "x",
    ctaText: "¡Quiero Empezar Ahora!",
    contentDelay: 90000,
    whatsappNumber: "5585981173668",
    pageTitle: "x",
    showCTAButton: false,
    whatsappLink: "https://wa.me/5585981173668?text=Me%20interesa%20la%20solución%20definitiva",
    vturbScript: "" // Add your vturb script here
  }
};
