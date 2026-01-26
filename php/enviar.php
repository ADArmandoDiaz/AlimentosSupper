<?php
// enviar.php

// 1. Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 2. Configuración del Correo
    // AQUÍ PONES EL CORREO DONDE QUIERES RECIBIR LOS MENSAJES
    $destinatario = "ventas@alimentossupper.com"; 
    $asunto = "Nuevo Contacto desde la Web - Alimentos Supper";

    // 3. Recibir y limpiar los datos (Sanitización básica)
    $nombre = strip_tags(trim($_POST["nombre"]));
    $telefono = strip_tags(trim($_POST["telefono"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags(trim($_POST["mensaje"]));

    // 4. Validar que los campos obligatorios no estén vacíos
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        // Si falta algo, redirigir con error
        header("Location: index.html?status=error&msg=campos_vacios#contacto");
        exit;
    }

    // 5. Construir el cuerpo del correo
    $contenido = "Has recibido un nuevo mensaje de contacto:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: $telefono\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    // 6. Encabezados (Para que no llegue a SPAM y puedas responder)
    $headers = "From: $nombre <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 7. Enviar el correo
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        // Éxito: Redirigir al usuario con mensaje de éxito
        header("Location: index.html?status=success#contacto");
    } else {
        // Fallo: Redirigir con mensaje de error
        header("Location: index.html?status=error&msg=fallo_envio#contacto");
    }

} else {
    // Si intentan entrar directo a enviar.php sin enviar formulario, los botamos al inicio
    header("Location: index.html");
    exit;
}
?>