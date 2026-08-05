# CrediULEP - Pre-Aprobación Express

Plataforma fintech de créditos express y servicios financieros en convenio con la Comunidad ULEP Colombia.

## 🚀 Requisitos e Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/groupulep/credito.git
cd credito
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en entorno local
```bash
npm run dev
```
Accede en tu navegador a `http://localhost:3000`.

---

## 🛠️ Compilación y Despliegue en GitHub Pages

### Compilación Manual
Para generar el paquete listo para producción en la carpeta `dist/`:
```bash
npm run build
```

### Despliegue Automático (GitHub Actions)
El proyecto incluye un flujo de trabajo configurado en `.github/workflows/deploy.yml`:
1. Sube tus cambios a la rama `main` o `master`.
2. Ve a la pestaña **Settings > Pages** en tu repositorio de GitHub.
3. En **Source**, selecciona **GitHub Actions**.
4. Cada vez que hagas `git push`, GitHub Actions compilará y desplegará la aplicación automáticamente en tu URL de GitHub Pages (ej. `https://groupulep.github.io/credito/`).

---

## 💻 Tecnologías Utilizadas
- **React 19** + **TypeScript**
- **Vite 6** + **Tailwind CSS v4**
- **Lucide React** (Iconografía)
- **GitHub Actions** (CI/CD para GitHub Pages)
