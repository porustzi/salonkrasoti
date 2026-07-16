import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/ui';
import { useBusinessInfo } from '../lib/businessStore';

export function TermsPage() {
  const bi = useBusinessInfo();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEO
        title="Умови використання"
        description="Умови використання сайту салону краси Майстерня Краси."
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
              Умови використання сайту
            </h1>

            <p className="text-sm text-neutral-500 mb-8">
              Остання оновлення: {new Date().toLocaleDateString('uk-UA')}
            </p>

            <div className="space-y-6 text-neutral-700">
              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">1. Загальні положення</h2>
                <p>
                  Використовуючи цей сайт, ви погоджуєтесь з даними умовами. Сайт належить та
                  управляється салоном {bi.name}.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">2. Послуги</h2>
                <p>
                  Інформація про послуги та ціни на сайті є довідковою. Остаточна вартість
                  послуг визначається після консультації з майстром.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">3. Запис на послуги</h2>
                <p>
                  Запис на послуги через сайт перенаправляє на зовнішню систему онлайн запису.
                  Ми не несемо відповідальності за роботу зовнішніх сервісів.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">4. Інтелектуальна власність</h2>
                <p>
                  Усі матеріали сайту (тексти, зображення, дизайн) є власністю {bi.name}
                  та захищені авторським правом. Використання матеріалів без згоди власника заборонене.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">5. Обмеження відповідальності</h2>
                <p>
                  Ми не гарантуємо безперervну роботу сайту. Ми не несемо відповідальності за
                  будь-які збитки, пов'язані з використанням сайту.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">6. Зміни умов</h2>
                <p>
                  Ми залишаємо за собою право змінювати ці умови без попереднього повідомлення.
                  Актуальна версія завжди доступна на цій сторінці.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">7. Контактна інформація</h2>
                <p>
                  {bi.name}<br />
                  {bi.address}, {bi.city}<br />
                  Email: <a href={`mailto:${bi.email}`}>{bi.email}</a>
                </p>
              </section>
            </div>

            <p className="text-sm text-neutral-500 mt-12">
              © {currentYear} {bi.name}. Всі права захищені.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

