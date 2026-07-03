import { motion } from 'framer-motion';
import { Button } from './Button';
import { BOOKING_URL } from '../../config/constants';

interface PriceItem {
  service: string;
  duration?: string;
  price: string;
  note?: string;
}

interface PricingCategoryProps {
  title: string;
  description?: string;
  items: PriceItem[];
}

export function PricingTable({ title, description, items }: PricingCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-heading font-semibold text-neutral-900">{title}</h3>
        {description && (
          <p className="text-neutral-600 mt-2">{description}</p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-cream">
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                Послуга
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 hidden sm:table-cell">
                Тривалість
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">
                Ціна
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-cream/50 transition-colors"
              >
                <td className="px-6 py-5">
                  <div>
                    <span className="text-neutral-900 font-medium">{item.service}</span>
                    {item.note && (
                      <p className="text-xs text-neutral-500 mt-1">{item.note}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 text-neutral-500 hidden sm:table-cell">
                  {item.duration || ''}
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="text-champagne font-semibold text-lg">
                    {item.price}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <Button href={BOOKING_URL} external showArrow>
          Записатися онлайн
        </Button>
      </div>
    </motion.div>
  );
}
