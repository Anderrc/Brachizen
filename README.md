# 🪄 Branchizen

Generador interactivo y configurable de nombres de ramas Git
Ideal para equipos que siguen convenciones como:
`feature/FE_1234_fix_ui_bug_jdoe`

---

## 🚀 ¿Qué es Branchizen?

Branchizen facilita la **creación de nombres de ramas consistentes**, personalizados y alineados con las convenciones de tu equipo. A través de un flujo interactivo, te guía paso a paso para construir ramas como:

```
feature/1234_fix_login_jdoe
```

---

## ⚙️ Primeros pasos

Antes de usar Branchizen, es recomendable generar el archivo de configuración `.branchizenrc.json`. Este archivo define la estructura de tus ramas y las preguntas asociadas.

Puedes configurarlo de forma interactiva con el siguiente comando:

```bash
branchizen config
```

Este comando te permitirá **elegir entre varias convenciones de nombres de rama predefinidas**, como:

-   **compact-dev**: Ideal para ramas cortas de desarrollo.
-   **detailed-tracking**: Para una trazabilidad completa de los cambios.
-   **release-heavy**: Orientado a ramas de release con versión y fecha.
-   **ticket-centric**: Centrado en el ID de un ticket (Jira, Linear, etc.).
-   **squad-structured**: Para equipos grandes, incluyendo nombre de la célula y autor.

Una vez seleccionado un estándar, Branchizen creará o actualizará tu archivo `.branchizenrc.json` con la configuración elegida. Después de generarlo, puedes **editar el archivo manualmente** para ajustar los mensajes de las preguntas o el orden si lo deseas.

---

## 🛠️ Personalización: agrega nuevas preguntas

Branchizen es altamente flexible y extensible. Si las configuraciones predefinidas no se ajustan por completo, puedes definir nuevas preguntas o modificar las existentes.

### ➕ ¿Cómo agregar o modificar campos?

1.  **Edita el archivo `.branchizenrc.json`**
    Agrega o modifica claves en el array `order` y define el texto de la pregunta en el objeto `questions`.

    Ejemplo:

    ```json
    {
    	"order": ["ticket", "description", "user"],
    	"questions": {
    		"ticket": "ID del ticket:",
    		"description": "Descripción (en snake_case):",
    		"user": "Tu nombre de usuario:"
    	},
    	"pattern": "[ticket]_[description]_[user]"
    }
    ```

    Asegúrate de que la clave `pattern` refleje el orden y los nombres de las variables que estás utilizando.

2.  **Guarda el archivo y ejecuta `branchizen`.**
    El flujo te pedirá los nuevos campos en el orden indicado.

> 🧠 **Tip:** Cada estándar predefinido viene con un `pattern` asociado. Si personalizas el `order` y `questions`, asegúrate de que tu `pattern` también se actualice para reflejar los nuevos campos y su estructura deseada.

---

## 📦 Instalación

```bash
npm install -g branchizen
```

Requiere Node.js v14 o superior y Git instalado en el sistema.

---

## 🧰 Uso

### Crear una nueva rama

```bash
npx branchizen
```

Flujo típico:

-   Selecciona el **tipo de rama** (`feature`, `bugfix`, `hotfix`, `release`).
-   **Responde las preguntas** según tu configuración (`.branchizenrc.json`).
-   **Confirma** si deseas crear la rama con Git.

### Configurar el estándar de nombres de rama (opcional)

```bash
npx branchizen config
```

Este comando te permite elegir interactivamente entre los estándares de nombres de rama predefinidos.

---

## 📁 Ejemplo de uso

```bash
$ npx branchizen
✔ ¿Qué tipo de rama quieres crear? › feature
✔ Descripción (en snake_case): › add_login_screen
✔ Tu nombre de usuario: › jdoe

✅ Nombre de rama sugerido:
feature/add_login_screen_jdoe

✔ ¿Deseas crear esta rama con Git? › (Y/n)
```

---

## 🧾 Archivo de configuración

Branchizen guarda su configuración en un archivo en el directorio raíz del proyecto:

```
.branchizenrc.json
```

Este archivo controla:

-   El **estándar de nombres de rama** activo.
-   El **orden de los campos** que forman el nombre de la rama.
-   El **texto** que se mostrará como prompt para cada campo.
-   El **patrón final** para construir el nombre de la rama.

---

## ✅ Requisitos

-   Node.js v14 o superior
-   Git instalado y disponible en el PATH

---

## 🧠 Ideas futuras

-   Validaciones personalizadas por tipo de rama.
-   Plantillas específicas por equipo/proyecto.
-   Integración con herramientas como Jira, Linear, Trello, etc.

---

## 👤 Autor

Desarrollado por Anderson Castaño
Inspirado en la necesidad de mantener convenciones claras y consistentes en Git.

---

## 📄 Licencia

MIT
