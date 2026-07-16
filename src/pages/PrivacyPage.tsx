import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/ui';
import { useBusinessInfo } from '../lib/businessStore';

export function PrivacyPage() {
  const bi = useBusinessInfo()
  return (
    <>
      <SEO
        title="РџРѕР»С–С‚РёРєР° РєРѕРЅС„С–РґРµРЅС†С–Р№РЅРѕСЃС‚С–"
        description="РџРѕР»С–С‚РёРєР° РєРѕРЅС„С–РґРµРЅС†С–Р№РЅРѕСЃС‚С– СЃР°Р»РѕРЅСѓ РєСЂР°СЃРё РњР°Р№СЃС‚РµСЂРЅСЏ РљСЂР°СЃРё."
      />

      <div className="pt-28 pb-16 bg-cream">
        <div className="container-custom">
          <Breadcrumbs />
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto prose prose-neutral"
          >
            <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-8">
              РџРѕР»С–С‚РёРєР° РєРѕРЅС„С–РґРµРЅС†С–Р№РЅРѕСЃС‚С–
            </h1>

            <p className="text-sm text-neutral-500 mb-8">
              РћСЃС‚Р°РЅРЅСЏ РѕРЅРѕРІР»РµРЅРЅСЏ: {new Date().toLocaleDateString('uk-UA')}
            </p>

            <div className="space-y-6 text-neutral-700">
              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">1. Р—Р°РіР°Р»СЊРЅС– РїРѕР»РѕР¶РµРЅРЅСЏ</h2>
                <p>
                  Р¦СЏ РџРѕР»С–С‚РёРєР° РєРѕРЅС„С–РґРµРЅС†С–Р№РЅРѕСЃС‚С– РІРёР·РЅР°С‡Р°С” РїРѕСЂСЏРґРѕРє Р·Р±РёСЂР°РЅРЅСЏ, РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ С‚Р° Р·Р°С…РёСЃС‚Сѓ
                  РїРµСЂСЃРѕРЅР°Р»СЊРЅРёС… РґР°РЅРёС… РєР»С–С”РЅС‚С–РІ СЃР°Р»РѕРЅСѓ {bi.name}.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">2. Р—Р±РёСЂР°РЅРЅСЏ РґР°РЅРёС…</h2>
                <p>
                  РњРё Р·Р±РёСЂР°С”РјРѕ С‚С–Р»СЊРєРё РЅРµРѕР±С…С–РґРЅС– РґР°РЅС– РґР»СЏ РЅР°РґР°РЅРЅСЏ РїРѕСЃР»СѓРі: С–Рј'СЏ, РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅСѓ,
                  email (Р·Р° Р±Р°Р¶Р°РЅРЅСЏРј РєР»С–С”РЅС‚Р°). Р”Р°РЅС– Р·Р±РёСЂР°СЋС‚СЊСЃСЏ РїСЂРё Р·Р°РїРёСЃС– РЅР° РїРѕСЃР»СѓРіРё Р°Р±Рѕ
                  С‡РµСЂРµР· С„РѕСЂРјРё Р·РІРѕСЂРѕС‚РЅРѕРіРѕ Р·РІ'СЏР·РєСѓ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">3. Р’РёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ РґР°РЅРёС…</h2>
                <p>
                  Р—С–Р±СЂР°РЅС– РґР°РЅС– РІРёРєРѕСЂРёСЃС‚РѕРІСѓСЋС‚СЊСЃСЏ РІРёРєР»СЋС‡РЅРѕ РґР»СЏ:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Р—Р°РїРёСЃСѓ РєР»С–С”РЅС‚С–РІ РЅР° РїРѕСЃР»СѓРіРё</li>
                  <li>РџРѕРІС–РґРѕРјР»РµРЅРЅСЏ РїСЂРѕ Р·РјС–РЅРё РІ Р·Р°РїРёСЃС–</li>
                  <li>РќР°РґСЃРёР»Р°РЅРЅСЏ С–РЅС„РѕСЂРјР°С†С–С— РїСЂРѕ Р°РєС†С–С— (Р·Р° Р·РіРѕРґРѕСЋ РєР»С–С”РЅС‚Р°)</li>
                  <li>РџРѕРєСЂР°С‰РµРЅРЅСЏ СЏРєРѕСЃС‚С– РѕР±СЃР»СѓРіРѕРІСѓРІР°РЅРЅСЏ</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">4. Р—Р°С…РёСЃС‚ РґР°РЅРёС…</h2>
                <p>
                  РњРё РІР¶РёРІР°С”РјРѕ РІСЃС–С… РЅРµРѕР±С…С–РґРЅРёС… Р·Р°С…РѕРґС–РІ РґР»СЏ Р·Р°С…РёСЃС‚Сѓ РїРµСЂСЃРѕРЅР°Р»СЊРЅРёС… РґР°РЅРёС… РєР»С–С”РЅС‚С–РІ.
                  Р”Р°РЅС– РЅРµ РїРµСЂРµРґР°СЋС‚СЊСЃСЏ С‚СЂРµС‚С–Рј РѕСЃРѕР±Р°Рј Р±РµР· Р·РіРѕРґРё РєР»С–С”РЅС‚Р°, Р·Р° РІРёРЅСЏС‚РєРѕРј РІРёРїР°РґРєС–РІ,
                  РїРµСЂРµРґР±Р°С‡РµРЅРёС… Р·Р°РєРѕРЅРѕРґР°РІСЃС‚РІРѕРј.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">5. РџСЂР°РІР° РєР»С–С”РЅС‚С–РІ</h2>
                <p>
                  РљР»С–С”РЅС‚Рё РјР°СЋС‚СЊ РїСЂР°РІРѕ:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>РћС‚СЂРёРјР°С‚Рё С–РЅС„РѕСЂРјР°С†С–СЋ РїСЂРѕ Р·С–Р±СЂР°РЅС– РґР°РЅС–</li>
                  <li>Р’РёРјР°РіР°С‚Рё РІРёРґР°Р»РµРЅРЅСЏ СЃРІРѕС—С… РґР°РЅРёС…</li>
                  <li>Р’С–РґРјРѕРІРёС‚РёСЃСЏ РІС–Рґ РѕС‚СЂРёРјР°РЅРЅСЏ РјР°СЂРєРµС‚РёРЅРіРѕРІРёС… РїРѕРІС–РґРѕРјР»РµРЅСЊ</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">6. Cookie</h2>
                <p>
                  РќР°С€ СЃР°Р№С‚ РІРёРєРѕСЂРёСЃС‚РѕРІСѓС” cookie РґР»СЏ РїРѕРєСЂР°С‰РµРЅРЅСЏ СЂРѕР±РѕС‚Рё СЃР°Р№С‚Сѓ С‚Р° Р°РЅР°Р»С–С‚РёРєРё.
                  Р’Рё РјРѕР¶РµС‚Рµ РЅР°Р»Р°С€С‚СѓРІР°С‚Рё РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ cookie Сѓ РІР°С€РѕРјСѓ Р±СЂР°СѓР·РµСЂС–.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">7. РљРѕРЅС‚Р°РєС‚Рё</h2>
                <p>
                  Р— РїРёС‚Р°РЅСЊ С‰РѕРґРѕ РѕР±СЂРѕР±РєРё РїРµСЂСЃРѕРЅР°Р»СЊРЅРёС… РґР°РЅРёС… Р·РІРµСЂС‚Р°Р№С‚РµСЃСЏ:
                </p>
                <p className="mt-2">
                  Email: <a href={`mailto:${bi.email}`}>{bi.email}</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

