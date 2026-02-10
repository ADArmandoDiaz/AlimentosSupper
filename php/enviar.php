<?php
// Evitar que accedan al archivo directamente desde el navegador
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: ../index.html");
    exit;
}

// ==========================================
// 1. CONFIGURACIÓN (Aquí cambias los correos)
// ==========================================
$destinatario = "armandojesusdiazpizarro@gmail.com"; // <--- Poner aquí el correo real del cliente
$asunto_email = "Nuevo Mensaje desde la Web (Grupo RPS)";

// ==========================================
// 2. OBTENER Y LIMPIAR DATOS
// ==========================================
// Usamos trim() para quitar espacios y htmlspecialchars() por seguridad
$nombre  = htmlspecialchars(trim($_POST["nombre"]));
$email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$mensaje = htmlspecialchars(trim($_POST["mensaje"]));

// Validaciones básicas
if (empty($nombre) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Datos inválidos"]);
    exit;
}

// ==========================================
// 3. CUERPO DEL CORREO
// ==========================================
$contenido = "
<html>
<head>
  <title>$asunto_email</title>
</head>
<body>
  <h2>Has recibido una nueva consulta:</h2>
  <p><strong>Nombre:</strong> $nombre</p>
  <p><strong>Email:</strong> $email</p>
  <hr>
  <p><strong>Mensaje:</strong></p>
  <p>$mensaje</p>
  <hr>
  <p><small>Este mensaje fue enviado desde el formulario de www.gruporps.com</small></p>
</body>
</html>
";

// ==========================================
// 4. CABECERAS (Para evitar SPAM)
// ==========================================
// El "From" debe ser un correo del dominio (aunque no exista) para que los filtros no lo bloqueen.
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: Webmaster <noreply@gruporps.com>" . "\r\n"; 
$headers .= "Reply-To: $email" . "\r\n"; // Para que al responder, le llegue al cliente

// ==========================================
// 5. ENVIAR Y RESPONDER AL JAVASCRIPT
// ==========================================
if (mail($destinatario, $asunto_email, $contenido, $headers)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Enviado correctamente"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al enviar el correo"]);
}
?>