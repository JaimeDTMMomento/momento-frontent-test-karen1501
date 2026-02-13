![momento](assets/momento.png)

# Prueba tecnica frontend Momento:

## Contexto:

Este proyecto consiste en construir un cotizador de seguros sencillo, basado en un caso de uso real que ocurrió en algún momento en la historia de Momento.

El objetivo no es buscar la perfección en todos los aspectos, sino lograr un balance entre lo estéticamente agradable y la funcionalidad. Se evaluará cómo estructuras el estado, manejas flujos asincrónicos y tomas decisiones técnicas en React con Next.js, así como tus habilidades de resolución de problemas.

![formulario_final](assets/screenshots/Formulario%20cotización%20momento.png)

## Sobre el stack de este proyecto:

- Next.js con App Router
- React
- Typescript
- RTK
- RTK Query
- Custom hooks
- react-hook-form
- SCSS
- tailwind (opcional)
- `VSCode` ( o cualquier fork )

**Para poder utilizar el archivo [api.rest](api.rest), es necesaria la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).**

## Funcionalidad esperada:

### Formulario de cotización

- El formulario debe crearse utilizando `useForm` de [react-hook-form](https://react-hook-form.com/).
- El formulario debe estar dividido en dos secciones (a nivel visual):
  - A: `Datos sobre ti`
    - Nombre(s)
    - Apellido Paterno
    - Apellido Materno
    - Código Postal
    - Correo electrónico
    - Teléfono (opcional)
    - Fecha de nacimiento
    - Género en tu licencia (campo de catálogo)
  - B: `Datos sobre tu vehiculo`
    - Marca (campo de catálogo)
    - Tipo de vehículo (campo de catálogo)
    - Modelo (campo de catálogo)
    - Año (campo de catálogo)
    - Versión (campo de catálogo)

- Todos los campos del formulario deben tener las validaciones correspondientes. En caso de no cumplir con alguna validación, **se debe mostrar un texto de ayuda en rojo debajo del input correspondiente**, indicando la validación que no se cumple. Por ejemplo, si el campo es **requerido**, se debe mostrar un mensaje como "Campo requerido". Si el campo es un correo y **no cumple con el formato**, mostrar un mensaje como "Correo inválido".

- La validación de los campos deberá ejecutarse en el evento `onBlur`.

- Para los campos que están marcados como `campo de catálogo`, los datos de catálogo deben obtenerse mediante la API proporcionada ([ver endpoints](api.rest)).

- Los campos de catálogo deben obtenerse utilizando [RTK Query](https://redux-toolkit.js.org/rtk-query/overview). **Cualquier otro método, como custom hooks usando fetch/axios, useQuery, etc., será considerado una omisión de las instrucciones.**

- En la sección A, `Datos sobre ti`, el campo _Fecha de nacimiento_ debe ser un input de texto que solo acepte el formato `dd/mm/yyyy` (por ejemplo, 25/12/1990).  
  Es importante que, antes de enviar el formulario, este valor sea transformado al formato de fecha ISO (`AAAA-MM-DD`, por ejemplo, 1990-12-25).  
  Si no se realiza esta conversión y el valor se envía en otro formato, el backend regresará un error de formato.

- En la sección B, `Datos sobre tu vehículo`, los campos deben completarse de forma secuencial, siguiendo el orden en que se mencionan. Si el usuario modifica un campo anterior (por ejemplo, la _Marca_), los campos dependientes que ya hayan sido llenados (como _Tipo de vehículo_) deben vaciarse y volver a seleccionarse, ya que su valor depende de la nueva selección.

- En la sección B, `Datos sobre tu vehículo`, los campos dependientes deben permanecer deshabilitados hasta que se haya seleccionado el valor necesario en el campo anterior. Por ejemplo, si ya se eligieron la _Marca_ y el _Tipo de vehículo_, el campo _Modelo_ debe estar habilitado, pero _Año_ y _Versión_ deben seguir deshabilitados hasta que se seleccione el _Modelo_.

### Envío del formulario de cotización:

- El envío (submit) del formulario de cotización debe ser gestionado utilizando `useForm` de [react-hook-form](https://react-hook-form.com/).

- El formulario debe enviarse mediante un botón con el texto `Cotizar ahora`, el cual solo estará habilitado cuando todos los campos requeridos estén completos y no haya ningún error de validación.

- El formulario debe poder enviarse tanto al hacer clic en el botón como al presionar la tecla Enter, siempre y cuando se cumplan las condiciones anteriores.

- Al enviar el formulario, se debe realizar una petición POST a la API en la ruta `${API_BASE_PATH}/api/quote` utilizando RTK Query. El cuerpo (body) de la petición debe cumplir con el tipo [QuotationPayload](src/types/quotation.ts).

- El botón `Cotizar ahora` debe permanecer deshabilitado mientras el formulario esté en estado de carga (isLoading) durante la solicitud de cotización.

- Si el envío del formulario es exitoso, muestra un `modal/dialog` con el mensaje:  
  **¡Felicidades! Tu cotización tiene el ID `${response.data.id}`**.

- Si el envío del formulario devuelve un error, muestra un `modal/dialog` con el mensaje:  
  **Lo sentimos, hubo un error en el proceso**.

- Si el envío devuelve un error y dicho error tiene `error.details.code` con el valor `ALREADY_EXISTS`, muestra un `modal/dialog` con el texto de `error.message`.

#### Condiciones para disparar errores del backend:

- Para el caso del error `ALREADY_EXISTS`, es necesario que ya se haya cotizado la **misma versión de vehículo** y el **mismo correo**.  
  Es decir, si el usuario con el correo `test@correo.com` ya tiene cotizada un Nissan Altima 2021 Advance CVT, al intentar cotizar de nuevo con ese correo y esa versión de vehículo, aparecerá el error.

**Para más referencias sobre la respuesta del servicio de cotización, revisa el namespace [CreateQuote](src/types/quotation.ts).**

### Sobre el modal/dialog

El diseño está abierto a la creatividad del usuario. Se recomienda seguir la línea de diseño del layout para mantener coherencia visual.

## Layout/Diseño

- Se proporciona el siguiente [layout](https://penpot.caloria.online/#/workspace?team-id=670ff78a-96e5-81a0-8007-8c6c00baa715&file-id=670ff78a-96e5-81a0-8007-8c6c09fa4bea&page-id=670ff78a-96e5-81a0-8007-8c6c09fa4beb) (estilo figma), en el cual podras encontrar los assets necesarios y estilos detallados de los resultados esperados.

- Es necesario respetar los estilos y tipografías indicados en el layout.

- Todas las tipografías están disponibles a través de [Google Fonts](https://fonts.google.com/).

- Todos los assets pueden descargarse desde el proyecto del [layout (Penpot)](https://penpot.caloria.online/#/workspace?team-id=670ff78a-96e5-81a0-8007-8c6c00baa715&file-id=670ff78a-96e5-81a0-8007-8c6c09fa4bea&page-id=670ff78a-96e5-81a0-8007-8c6c09fa4beb) o utilizarse directamente desde las siguientes URLs:
  - [asset_1](https://momento-api-sandbox.caloria.online/uploads/happy_ppl_4478275194.svg)
  - [asset_2](https://momento-api-sandbox.caloria.online/uploads/momento_dark_f013f29ec1.svg)

- Las credenciales para acceder al layout serán otorgadas el día y la hora pactados para la prueba.

## Sobre la entrega

Es necesario realizar el último `commit/merge` a la rama `main` dentro del plazo límite acordado. Cualquier `commit/merge` generado fuera de ese horario no será tomado en cuenta.

Si al cumplirse el plazo pactado no has logrado terminar, no importa: sube tus cambios hasta ese punto y se realizará la evaluación con respecto a lo que hayas logrado.

# Recuerda:
Debes asignar el valor de el token proporcionado a `API_TOKEN` en el archivo [api.rest](api.rest) para poder ejecutar los request documentados.
