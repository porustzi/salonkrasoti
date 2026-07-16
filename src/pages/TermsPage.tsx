import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/ui';
import { useBusinessInfo } from '../lib/businessStore';

export function TermsPage() {
  const bi = useBusinessInfo()
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEO
        title="РЈРјРѕРІРё РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ"
        description="РЈРјРѕРІРё РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ СЃР°Р№С‚Сѓ СЃР°Р»РѕРЅСѓ РєСЂР°СЃРё РњР°Р№СЃС‚РµСЂРЅСЏ РљСЂР°СЃРё."
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
              РЈРјРѕРІРё РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ СЃР°Р№С‚Сѓ
            </h1>

            <p className="text-sm text-neutral-500 mb-8">
              РћСЃС‚Р°РЅРЅСЏ РѕРЅРѕРІР»РµРЅРЅСЏ: {new Date().toLocaleDateString('uk-UA')}
            </p>

            <div className="space-y-6 text-neutral-700">
              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">1. Р—Р°РіР°Р»СЊРЅС– РїРѕР»РѕР¶РµРЅРЅСЏ</h2>
                <p>
                  Р’РёРєРѕСЂРёСЃС‚РѕРІСѓСЋС‡Рё С†РµР№ СЃР°Р№С‚, РІРё РїРѕРіРѕРґР¶СѓС”С‚РµСЃСЊ Р· РґР°РЅРёРјРё СѓРјРѕРІР°РјРё. РЎР°Р№С‚ РЅР°Р»РµР¶РёС‚СЊ С‚Р°
                  СѓРїСЂР°РІР»СЏС”С‚СЊСЃСЏ СЃР°Р»РѕРЅРѕРј {bi.name}.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">2. РџРѕСЃР»СѓРіРё</h2>
                <p>
                  Р†РЅС„РѕСЂРјР°С†С–СЏ РїСЂРѕ РїРѕСЃР»СѓРіРё С‚Р° С†С–РЅРё РЅР° СЃР°Р№С‚С– С” РґРѕРІС–РґРєРѕРІРѕСЋ. РћСЃС‚Р°С‚РѕС‡РЅР° РІР°СЂС‚С–СЃС‚СЊ
                  РїРѕСЃР»СѓРі РІРёР·РЅР°С‡Р°С”С‚СЊСЃСЏ РїС–СЃР»СЏ РєРѕРЅСЃСѓР»СЊС‚Р°С†С–С— Р· РјР°Р№СЃС‚СЂРѕРј.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">3. Р—Р°РїРёСЃ РЅР° РїРѕСЃР»СѓРіРё</h2>
                <p>
                  Р—Р°РїРёСЃ РЅР° РїРѕСЃР»СѓРіРё С‡РµСЂРµР· СЃР°Р№С‚ РїРµСЂРµРЅР°РїСЂР°РІР»СЏС” РЅР° Р·РѕРІРЅС–С€РЅСЋ СЃРёСЃС‚РµРјСѓ РѕРЅР»Р°Р№РЅ Р·Р°РїРёСЃСѓ.
                  РњРё РЅРµ РЅРµСЃРµРјРѕ РІС–РґРїРѕРІС–РґР°Р»СЊРЅРѕСЃС‚С– Р·Р° СЂРѕР±РѕС‚Сѓ Р·РѕРІРЅС–С€РЅС–С… СЃРµСЂРІС–СЃС–РІ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">4. Р†РЅС‚РµР»РµРєС‚СѓР°Р»СЊРЅР° РІР»Р°СЃРЅС–СЃС‚СЊ</h2>
                <p>
                  РЈСЃС– РјР°С‚РµСЂС–Р°Р»Рё СЃР°Р№С‚Сѓ (С‚РµРєСЃС‚Рё, Р·РѕР±СЂР°Р¶РµРЅРЅСЏ, РґРёР·Р°Р№РЅ) С” РІР»Р°СЃРЅС–СЃС‚СЋ {bi.name}
                  С‚Р° Р·Р°С…РёС‰РµРЅС– Р°РІС‚РѕСЂСЃСЊРєРёРј РїСЂР°РІРѕРј. Р’РёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ РјР°С‚РµСЂС–Р°Р»С–РІ Р±РµР· Р·РіРѕРґРё РІР»Р°СЃРЅРёРєР° Р·Р°Р±РѕСЂРѕРЅРµРЅРµ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">5. РћР±РјРµР¶РµРЅРЅСЏ РІС–РґРїРѕРІС–РґР°Р»СЊРЅРѕСЃС‚С–</h2>
                <p>
                  РњРё РЅРµ РіР°СЂР°РЅС‚СѓС”РјРѕ Р±РµР·РїРµСЂervРЅСѓ СЂРѕР±РѕС‚Сѓ СЃР°Р№С‚Сѓ. РњРё РЅРµ РЅРµСЃРµРјРѕ РІС–РґРїРѕРІС–РґР°Р»СЊРЅРѕСЃС‚С– Р·Р°
                  Р±СѓРґСЊ-СЏРєС– Р·Р±РёС‚РєРё, РїРѕРІ'СЏР·Р°РЅС– Р· РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏРј СЃР°Р№С‚Сѓ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">6. Р—РјС–РЅРё СѓРјРѕРІ</h2>
                <p>
                  РњРё Р·Р°Р»РёС€Р°С”РјРѕ Р·Р° СЃРѕР±РѕСЋ РїСЂР°РІРѕ Р·РјС–РЅСЋРІР°С‚Рё С†С– СѓРјРѕРІРё Р±РµР· РїРѕРїРµСЂРµРґРЅСЊРѕРіРѕ РїРѕРІС–РґРѕРјР»РµРЅРЅСЏ.
                  РђРєС‚СѓР°Р»СЊРЅР° РІРµСЂСЃС–СЏ Р·Р°РІР¶РґРё РґРѕСЃС‚СѓРїРЅР° РЅР° С†С–Р№ СЃС‚РѕСЂС–РЅС†С–.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">7. РљРѕРЅС‚Р°РєС‚РЅР° С–РЅС„РѕСЂРјР°С†С–СЏ</h2>
                <p>
                  {bi.name}<br />
                  {bi.address}, {bi.city}<br />
                  Email: <a href={`mailto:${bi.email}`}>{bi.email}</a>
                </p>
              </section>
            </div>

            <p className="text-sm text-neutral-500 mt-12">
              В© {currentYear} {bi.name}. Р’СЃС– РїСЂР°РІР° Р·Р°С…РёС‰РµРЅС–.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

