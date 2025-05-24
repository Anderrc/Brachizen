# 🪄 Branchizen

> Generador de nombres de ramas Git interactivo y configurable.  
Ideal para equipos que siguen convenciones de nombres como `feature_FE_1234_fix_ui_bug_jdoe`.

---

## 🚀 Instalación

```bash
npm install -g branchizen
```

> Asegúrate de tener Node.js instalado en tu sistema.

---

## 🧰 Uso

### Crear una nueva rama

```bash
branchizen
```

Te preguntará de forma interactiva:

1. Tipo de rama (`feature`, `bugfix`, `hotfix`, `release`)
2. Ticket, descripción, nombre de usuario y/o prefijo (según configuración)
3. Confirmación para crear la rama con Git

### Configurar orden de campos

```bash
branchizen config
```

Selecciona el orden de los siguientes campos:

- `description`: descripción de la tarea (ej. `fix_login_bug`)
- `user`: tu usuario (ej. `jdoe`)

El orden determina cómo se genera el nombre de la rama.

---

## 📁 Ejemplo de uso

```bash
$ branchizen
✔ ¿Qué tipo de rama quieres crear? › feature
✔ Descripción (en snake_case): › add_login_screen
✔ Tu nombre de usuario: › jdoe

✅ Nombre de rama sugerido:
feature/add_login_screen_jdoe

✔ ¿Deseas crear esta rama con Git? › (Y/n)
```

---

## ⚙️ Configuración local

Branchizen guarda tu configuración en un archivo oculto:

```
.branchizenrc.json
```

Este archivo contiene el orden de campos que se utilizará al construir nombres de rama.

---

## ✅ Requisitos

- Node.js v14 o superior
- Git instalado y disponible en el PATH

---

## 📦 Publicación del paquete

Si deseas contribuir o hacer tu propia versión:

```bash
git clone https://github.com/tuusuario/branchizen.git
cd branchizen
npm install
npm link   # Para usarlo localmente como CLI
```

---

## 🧠 Ideas futuras

- Validaciones por tipo de rama
- Personalización por equipo/proyecto
- Integración con sistemas de tickets (Jira, Linear, etc.)

---

## 🧑‍💻 Autor

Desarrollado por [Anderson Castaño](https://github.com/Anderrc)  
Inspirado en la necesidad de mantener convenciones claras y consistentes en Git.

---

## 📄 Licencia

MIT
