import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import { LandingNavBar } from "@/components/layout/LandingNavBar";
import TertiaryButton from "@/components/ui/Buttons/TertiaryButton";
import {
  FEATURES,
  STEPS,
  family,
} from "@/lib/landing";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip text-on-surface">

      <LandingNavBar />
      <Hero />

      {/*  Features  */}
      <section
        id="features"
        className="mx-auto mt-30 max-w-300 px-6 md:mt-40"
      >
        <h2 className="max-w-2xl text-3xl font-semibold leading-[1.09] tracking-tight md:text-5xl">
          Todo lo que necesitas,{" "}
          <span className="text-primary">sin fricción</span>
        </h2>
        <p className="mt-6 max-w-140 text-lg leading-[1.47]">
          Una sola herramienta para planificar tu semana, cumplir tus plazos y
          sentir el progreso. Sin anuncios, sin ruido, sin curvas de
          aprendizaje.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-white p-8 shadow-elevated"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${feature.badge}`}
              >
                <feature.icon size={20} strokeWidth={2.25} />
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-[1.38] tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-[1.47]">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*  How it works  */}
      <section
        id="como-funciona"
        className="mx-auto mt-24 max-w-300 px-6 md:mt-40"
      >
        <h2 className="max-w-2xl text-4xl font-semibold leading-[1.09] tracking-tight md:text-5xl">
          Empieza en <span className="text-tertiary">tres pasos</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-surface-container-lowest p-8 shadow-elevated"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${step.badge}`}
              >
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-[1.38] tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-[1.47]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*  CTA  */}
      <section className="mx-auto mt-24 max-w-300 px-6 text-center md:mt-36">
        <h2
          className={`${family.className} mx-auto max-w-2xl text-5xl font-semibold leading-[1.09] tracking-tight md:text-6xl`}
        >
          ¿Listo para fluir con tu día?
        </h2>
        <p className="mx-auto mt-6 max-w-120 text-lg leading-[1.47]">
          Crea tu cuenta gratis y descubre lo fácil que se siente un día bien
          organizado.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TertiaryButton
            href="#features"
            text="Ver características →"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
