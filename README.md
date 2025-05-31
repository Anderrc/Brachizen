# 🪄 Branchizen

Generador interactivo y configurable de nombres de ramas Git  
Ideal para equipos que siguen convenciones como:  
`feature/FE_1234_fix_ui_bug_jdoe`

---

## 🚀 ¿Qué es Branchizen?

Branchizen facilita la creación de nombres de ramas consistentes, personalizados y alineados con las convenciones de tu equipo.  
A través de un flujo interactivo, te guía paso a paso para construir ramas como:

```
feature/1234_fix_login_jdoe
```

---

## ⚙️ Primeros pasos

Antes de usar Branchizen por primera vez, es recomendable generar el archivo de configuración `.branchizenrc.json`, que define el orden y el texto de las preguntas que quieres personalizar.

Puedes hacerlo manualmente o usando el comando interactivo:

```bash
branchizen config
```

Esto te permite seleccionar el orden de los campos que compondrán tu rama. Luego podrás editar el archivo manualmente para agregar más campos o cambiar los mensajes.

---

## 🛠️ Personalización: agrega nuevas preguntas

Branchizen es altamente flexible y extensible. Puedes definir nuevas preguntas fácilmente para adaptar el nombre de la rama a tu flujo de trabajo.

### ➕ ¿Cómo agregar nuevos campos?

1. **Edita el archivo `.branchizenrc.json`**  
   Agrega una nueva clave al array `order` y define el texto de la pregunta en el objeto `questions`.

    Ejemplo:

    ```json
    {
    	"order": ["ticket", "description", "user"],
    	"questions": {
    		"ticket": "ID del ticket:",
    		"description": "Descripción (en snake_case):",
    		"user": "Tu nombre de usuario:"
    	}
    }
    ```

2. **Guarda el archivo y ejecuta `branchizen`.**  
   El flujo te pedirá los nuevos campos en el orden indicado.

> 🧠 **Tip:** A futuro, agregar un nuevo campo es tan simple como:
>
> -   Añadirlo en el array `order`
> -   Definir el mensaje correspondiente en `questions`

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

-   Selecciona el tipo de rama (`feature`, `bugfix`, `hotfix`, `release`)
-   Responde las preguntas según tu configuración
-   Confirma si deseas crear la rama con Git

### Configurar orden de campos (opcional)

```bash
npx branchizen config
```

Este comando te permite elegir el orden de los campos interactivos definidos en `.branchizenrc.json`.

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

Branchizen guarda su configuración en un archivo oculto en el directorio raíz del proyecto:

```
.branchizenrc.json
```

Este archivo controla:

-   El orden de los campos que forman el nombre de la rama
-   El texto que se mostrará como prompt para cada campo

---

## ✅ Requisitos

-   Node.js v14 o superior
-   Git instalado y disponible en el PATH

---

## 🧠 Ideas futuras

-   Validaciones personalizadas por tipo de rama
-   Plantillas específicas por equipo/proyecto
-   Integración con herramientas como Jira, Linear, Trello, etc.

---

## 👤 Autor

Desarrollado por Anderson Castaño  
Inspirado en la necesidad de mantener convenciones claras y consistentes en Git.

---

## 📄 Licencia

MIT

