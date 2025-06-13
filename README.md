# 📖 Clon Google Translate

Un clon funcional de Google Translate utilizando React y OpenAI para traducción de texto.

## 🚀 Características
- Traducción automática entre múltiples idiomas.
- Integración con OpenAI para mejorar la precisión.
- Interfaz sencilla y fácil de usar con Bootstrap.
- Síntesis de voz para leer las traducciones en voz alta.
- Selector de idioma con una interfaz interactiva.

## 🔧 Instalación

Clona el repositorio:

git clone https://github.com/CristhianZ2022/Clon-Google-Translate.git
cd Clon-Google-Translate
Instala las dependencias:


npm install
Configura la API Key de OpenAI en un archivo .env:


VITE_OPENAI_API_KEY=tu_api_key_aqui
Ejecuta la aplicación:


npm run dev

🛠 Tecnologías Utilizadas
React - Framework frontend.

OpenAI API - Traducción inteligente.

Bootstrap - Estilización rápida.

Vite - Entorno de desarrollo rápido.

🏗 Estructura del Proyecto
Clon-Google-Translate/
│── src/
│   ├── components/
│   │   ├── LanguageSelector.tsx
│   │   ├── Icons.tsx
│   ├── hooks/
│   │   ├── useStore.ts
│   ├── constans.ts
│   ├── App.tsx
│   ├── main.tsx
│── public/
│── package.json