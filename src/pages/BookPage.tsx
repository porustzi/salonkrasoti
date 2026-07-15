import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Button, PageHero } from '../components/ui';
import { useBooking } from '../context/BookingContext';
import { Calendar, ExternalLink } from 'lucide-react';

export function BookPage() {
  const { openBooking } = useBooking();

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
              Натисніть кнопку нижче, щоб записатися на послугу онлайн.
            </p>

            <Button onClick={openBooking} showArrow>
              <ExternalLink className="w-4 h-4" />
              Записатися онлайн
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
