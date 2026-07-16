import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/ui';
import { useBusinessInfo } from '../lib/businessStore';

export function PrivacyPage() {
  const bi = useBusinessInfo();
  return (
    <>
      <SEO
        title="Політика конфіденційності"
        description="Політика конфіденційності салону краси Майстерня Краси."
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
              Політика конфіденційності
            </h1>

            <p className="text-sm text-neutral-500 mb-8">
              Остання оновлення: {new Date().toLocaleDateString('uk-UA')}
            </p>

            <div className="space-y-6 text-neutral-700">
              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">1. Загальні положення</h2>
                <p>
                  Ця Політика конфіденційності визначає порядок збирання, використання та захисту
                  персональних даних клієнтів салону {bi.name}.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">2. Збирання даних</h2>
                <p>
                  Ми збираємо тільки необхідні дані для надання послуг: ім'я, номер телефону,
                  email (за бажанням клієнта). Дані збираються при записі на послуги або
                  через форми зворотного зв'язку.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">3. Використання даних</h2>
                <p>
                  Зібрані дані використовуються виключно для:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Запису клієнтів на послуги</li>
                  <li>Повідомлення про зміни в записі</li>
                  <li>Надсилання інформації про акції (за згодою клієнта)</li>
                  <li>Покращення якості обслуговування</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">4. Захист даних</h2>
                <p>
                  Ми вживаємо всіх необхідних заходів для захисту персональних даних клієнтів.
                  Дані не передаються третім особам без згоди клієнта, за винятком випадків,
                  передбачених законодавством.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">5. Права клієнтів</h2>
                <p>
                  Клієнти мають право:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Отримати інформацію про зібрані дані</li>
                  <li>Вимагати видалення своїх даних</li>
                  <li>Відмовитися від отримання маркетингових повідомлень</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">6. Cookie</h2>
                <p>
                  Наш сайт використовує cookie для покращення роботи сайту та аналітики.
                  Ви можете налаштувати використання cookie у вашому браузері.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">7. Контакти</h2>
                <p>
                  З питань щодо обробки персональних даних звертайтеся:
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

