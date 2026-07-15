import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Сторінку не знайдено"
        description="Сторінку не знайдено на сайті салону краси Майстерня Краси."
      />

      <section className="min-h-screen flex items-center justify-center bg-cream pt-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-[100px] sm:text-[150px] md:text-[200px] font-heading font-bold text-champagne/20 select-none">
                404
              </span>
            </motion.div>

            <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
              Сторінку не знайдено
            </h1>

            <p className="text-neutral-600 mb-8">
              Схоже, сторінка, яку ви шукаєте, не існує або була переміщена.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/" showArrow>
                На головну
              </Button>
              <Button to="/contacts" variant="secondary">
                Контакти
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
