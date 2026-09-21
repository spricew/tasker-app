import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo Tasker recopila, utiliza y protege tu información personal.",
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="min-h-screen overflow-x-clip text-on-surface">
      <Navbar />

      <section className="mx-auto max-w-3xl py-28">
        <h1 className="text-3xl font-semibold leading-[1.09] tracking-tight md:text-5xl">
          Política de Privacidad
        </h1>
        <p className="mt-4 text-sm text-ash">
          Última actualización: 15 de septiembre de 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-[1.6] text-on-surface-variant">
          {/* Introducción */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              1. Introducción
            </h2>
            <p>
              En Tasker (&quot;nosotros&quot;, &quot;el Servicio&quot;), respetamos y protegemos la
              privacidad de nuestros usuarios. Esta Política de Privacidad
              describe de manera clara y completa la forma en que recopilamos,
              utilizamos, almacenamos y compartimos la información personal
              obtenida a través de nuestra plataforma web y servicios asociados.
            </p>
            <p className="mt-3">
              Al acceder o utilizar Tasker, usted (&quot;el Usuario&quot;) declara haber
              leído, comprendido y aceptado los términos establecidos en la
              presente Política. Si no está de acuerdo con alguno de estos
              términos, le solicitamos que no utilice el Servicio.
            </p>
          </section>

          {/* Información recopilada */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              2. Información que Recopilamos
            </h2>
            <p>Podemos recopilar y procesar las siguientes categorías de datos:</p>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-charcoal-primary">
                  2.1 Datos de registro
                </h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Contraseña (almacenada exclusivamente en formato hash irreversible)</li>
                  <li>Rol asignado dentro de la plataforma (Usuario o Administrador)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-medium text-charcoal-primary">
                  2.2 Datos de uso y actividad
                </h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Títulos, estados y fechas de las tareas creadas</li>
                  <li>Patrones de uso de la plataforma (frecuencia de acceso, funcionalidades utilizadas)</li>
                  <li>Registros de inicio de sesión y cierre de sesión</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-medium text-charcoal-primary">
                  2.3 Datos técnicos
                </h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Dirección IP</li>
                  <li>Tipo y versión del navegador</li>
                  <li>Sistema operativo</li>
                  <li>Información de dispositivo</li>
                  <li>Cookies y tecnologías de rastreo similares (ver Sección 6)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalidad */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              3. Finalidad del Tratamiento de Datos
            </h2>
            <p>La información recopilada se utiliza exclusivamente para los siguientes fines:</p>
            <ul className="mt-3 ml-6 list-disc space-y-1">
              <li>
                <strong>Prestación del Servicio:</strong> Facilitar la gestión de tareas,
                el control de progreso y la funcionalidad central de la plataforma.
              </li>
              <li>
                <strong>Autenticación y seguridad:</strong> Verificar la identidad de los
                usuarios, prevenir accesos no autorizados y proteger contra fraudes.
              </li>
              <li>
                <strong>Comunicación:</strong> Enviar notificaciones relacionadas con el
                servicio, actualizaciones importantes y, únicamente con su consentimiento
                previo, comunicaciones promocionales.
              </li>
              <li>
                <strong>Mejora continua:</strong> Analizar patrones de uso agregados y
                anónimos para optimizar la experiencia del usuario y el rendimiento
                de la plataforma.
              </li>
              <li>
                <strong>Cumplimiento legal:</strong> Atender obligaciones legales,
                regulatorias o judiciales cuando así sea requerido por autoridad competente.
              </li>
            </ul>
          </section>

          {/* Base legal */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              4. Base Legal del Tratamiento
            </h2>
            <p>
              El tratamiento de sus datos personales se fundamenta en las siguientes
              bases legales, según corresponda:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1">
              <li>
                <strong>Consentimiento:</strong> Al registrarse y utilizar Tasker, usted
                otorga su consentimiento explícito para el tratamiento de sus datos
                conforme a esta política.
              </li>
              <li>
                <strong>Ejecución de contrato:</strong> El tratamiento es necesario para
                cumplir con las obligaciones del servicio que usted ha solicitado.
              </li>
              <li>
                <strong>Interés legítimo:</strong> Para fines de seguridad, prevención de
                fraude y mejora del servicio, cuando dichos intereses no prevalezcan
                sobre sus derechos fundamentales.
              </li>
            </ul>
          </section>

          {/* Compartición */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              5. Compartición de Datos con Terceros
            </h2>
            <p>
              Tasker no vende, alquila ni comercializa su información personal con
              terceros. Sus datos únicamente podrán ser compartidos en los siguientes
              supuestos:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1">
              <li>
                <strong>Proveedores de infraestructura:</strong> Servicios de alojamiento
                en la nube que almacenan los datos bajo estrictas medidas de seguridad.
              </li>
              <li>
                <strong>Obligaciones legales:</strong> Cuando exista una orden judicial,
                requerimiento de autoridad competente o obligación legal aplicable.
              </li>
              <li>
                <strong>Protección de derechos:</strong> Cuando sea necesario para
                proteger los derechos, la seguridad o la propiedad de Tasker, sus
                usuarios o el público.
              </li>
            </ul>
          </section>

          {/* Retención */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              6. Retención de Datos
            </h2>
            <p>
              Sus datos personales serán almacenados únicamente durante el período
              necesario para cumplir con las finalidades para las que fueron
              recopilados, o según lo requiera la legislación aplicable. Una vez
              finalizada la relación con el Usuario, sus datos serán eliminados o
              anonimizados de manera segura dentro de los plazos establecidos por
              la normativa vigente.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              7. Política de Cookies
            </h2>
            <p>
              Tasker utiliza exclusivamente cookies estrictamente necesarias para
              el funcionamiento de la plataforma. Estas cookies son esenciales
              para la autenticación del usuario y el mantenimiento de la sesión
              activa.
            </p>
            <p className="mt-3">
              Al ser cookies estrictamente necesarias, no se requiere
              consentimiento previo del usuario para su instalación, de conformidad
              con la normativa aplicable en materia de protección de datos y
              comunicaciones electrónicas.
            </p>
            <p className="mt-3">
              Tasker no utiliza cookies de funcionalidad, analíticas ni de
              rastreo. En caso de incorporar nuevas categorías de cookies en el
              futuro, esta política será actualizada y se solicitará el
              consentimiento correspondiente.
            </p>
            <p className="mt-3">
              Puede configurar su navegador para bloquear o eliminar cookies.
              No obstante, la desactivación de cookies esenciales afectará el
              funcionamiento correcto del Servicio.
            </p>
          </section>

          {/* Seguridad */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              8. Medidas de Seguridad
            </h2>
            <p>
              Tasker implementa medidas de seguridad técnicas y organizativas
              robustas para proteger su información personal contra accesos no
              autorizados, alteraciones, divulgaciones o destrucciones, incluyendo:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1">
              <li>Cifrado de contraseñas mediante algoritmos de hash irreversibles</li>
              <li>Comunicaciones seguras mediante protocolo HTTPS/TLS</li>
              <li>Control de acceso basado en roles y autenticación por tokens JWT</li>
              <li>Monitoreo de registros de actividad y auditoría de accesos</li>
            </ul>
          </section>

          {/* Derechos */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              9. Derechos del Usuario
            </h2>
            <p>
              De conformidad con la legislación aplicable en materia de protección
              de datos, usted tiene derecho a:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1">
              <li>
                <strong>Acceso:</strong> Solicitar información sobre los datos personales
                que mantenemos sobre usted.
              </li>
              <li>
                <strong>Rectificación:</strong> Solicitar la corrección de datos inexactos
                o incompletos.
              </li>
              <li>
                <strong>Eliminación:</strong> Solicitar la supresión de sus datos personales,
                sujeto a las obligaciones legales aplicables.
              </li>
              <li>
                <strong>Oposición:</strong> Oponerse al tratamiento de sus datos cuando
                existan motivos legítimos para ello.
              </li>
              <li>
                <strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado,
                de uso común y lectura mecánica.
              </li>
              <li>
                <strong>Revocación del consentimiento:</strong> Retirar su consentimiento
                en cualquier momento, sin que ello afecte la licitud del tratamiento
                previo.
              </li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, puede contacting a través
              de los medios indicados en la sección de contacto de esta plataforma.
            </p>
          </section>

          {/* Menores */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              10. Menores de Edad
            </h2>
            <p>
              Tasker no está dirigido a menores de 16 años. No recopilamos
              intencionalmente datos personales de menores de edad. Si un usuario
              menor de 16 años utiliza el Servicio sin la supervisión de un
              padre o tutor legal, procederemos a eliminar dicha información
              de nuestros sistemas tan pronto como tengamos conocimiento de ello.
            </p>
          </section>

          {/* Cambios */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              11. Modificaciones de esta Política
            </h2>
            <p>
              Tasker se reserva el derecho de modificar la presente Política de
              Privacidad en cualquier momento. Cualquier cambio será publicado
              en esta página con la fecha de la última actualización. Le
              recomendamos revisar esta política periódicamente. El uso continuado
              del Servicio después de las modificaciones constituye la aceptación
              de los mismos.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-charcoal-primary">
              12. Contacto
            </h2>
            <p>
              Si tiene preguntas, inquietudes o solicitudes relacionadas con esta
              Política de Privacidad o con el tratamiento de sus datos personales,
              puede contactarnos a través de los medios disponibles en nuestra
              plataforma.
            </p>
          </section>
        </div>

        <TertiaryButton 
          text="Volver al inicio"
          extraclass="mt-12"
          Icon={<ChevronLeft/>}
          iconPosition="left"
          />
      </section>
      <Footer />
    </main>
  );
}
