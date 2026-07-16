import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Button, PageHero } from '../components/ui';
import { useBooking } from '../context/BookingContext';
import { useData } from '../context/DataContext';
import { Calendar, ExternalLink } from 'lucide-react';

export function BookPage() {
  const { openBooking } = useBooking();
  const { data } = useData();
  const pb = data.content.pages.book;

  return (
    <>
      <SEO
        title="Онлайн запис у салон краси Майстерня Краси — Чернігів"
        description="Запишіться на стрижку, фарбування, манікюр чи масаж у салоні краси Майстерня Краси в Чернігові (ЦУМ) онлайн. Швидко та зручно."
      />

      <PageHero
        title={pb.title || "Онлайн запис"}
        subtitle={pb.subtitle || "Запишіться на послугу в зручний для вас час"}
        image={pb.image}
        eyebrow={pb.eyebrow}
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
