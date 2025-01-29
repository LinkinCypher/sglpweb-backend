<h1>⚖️ LegalPro</h1>

<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.mongodb.com/try/download/community-kubernetes-operator" target="_blank"><img src="https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png" width="200" alt="Mongo Logo" /></a>
  <a href="https://nodejs.org/en" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png" width="200" alt="Node Logo" /></a>
</p>

<p align="center">npm v10.2.4</p>
<p align="center">node v20.9.0</p>


## 📥 Clonar el repositorio
Se puede descargar y descomprimir el código fuente en el equipo, o ejecutar los siguientes comandos en la terminal:
```bash
cd C:/proyecto/
```
```bash
git clone https://github.com/LinkinCypher/sglpweb-backend.git
```
```bash
cd sglpweb-backend
```


## 📥 Instalación en Windows
Las siguientes herramientas son importantes:
<li><a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a></li>
<li><a href="https://git-scm.com/" target="_blank">Git</a></li>
<li><a href="https://nodejs.org/en" target="_blank">Node</a></li>
<li><a href="https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.4-signed.msi" target="_blank">MondoDb</a></li>
<li><a href="https://downloads.mongodb.com/compass/mongodb-compass-1.41.0-win32-x64.exe" target="_blank">MongoDb - Compass</a></li>


## ⚙️ Ejecutar la aplicación
Navegar a la carpeta del proyecto y ejecutar los siguientes comandos:
```bash
npm install  # Instalar dependencias del proyecto
```
Compilar y crear la carpeta dist:
```bash
npm run build
```
Ejecutar el servidor en modo desarrollo:
```bash
npm run start:dev
```



## 🔑 Cargar usuarios a MongoDB
<li>Conéctate a tu instancia de MongoDB.</li>
<li>Selecciona la base de datos utilizada en el proyecto.</li>
<li>Abre la colección de usuarios (users).</li>
<li>Inserta el siguiente JSON:</li>

```bash
[
  {
    "_id": { "$oid": "6793ea20bbc86804ca46e7ec" },
    "username": "admin",
    "password": "1",
    "role": "admin",
    "__v": 0
  },
]
```

### ✅ Credenciales de acceso:
Usuario: admin
Contraseña: admin