import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Button, PageHero } from '../components/ui';
import { BOOKING_URL } from '../config/constants';
import { Calendar, ExternalLink } from 'lucide-react';

export function BookPage() {
  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = BOOKING_URL;
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title="Онлайн запис"
        description="Запишіться на послугу в салон краси Майстерня Краси в Чернігові онлайн."
      />

      <PageHero
        title="Онлайн запис"
        subtitle="Запишіться на послугу в зручний для вас час"
        image="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920"
        icon={Calendar}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-champagne/10 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-champagne" />
            </div>

            <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
              Запис на послугу
            </h1>

            <p className="text-neutral-600 mb-8">
              Ви будете перенаправлені на сторінку онлайн запису через кілька секунд.
              Якщо перенаправлення не відбулося, натисніть кнопку нижче.
            </p>

            <Button href={BOOKING_URL} external showArrow>
              <ExternalLink className="w-4 h-4" />
              Перейти до запису
            </Button>

            <p className="text-sm text-neutral-500 mt-6">
              Автоматичне перенаправлення через 5 секунд...
            </p>

            {/* Loading animation */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-champagne"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
