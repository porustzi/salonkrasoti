import { motion } from 'framer-motion';
import { SEO, LocalBusinessSchema } from '../components/SEO';
import { Breadcrumbs, SectionHeading, TeamCard } from '../components/ui';
import { teamMembers } from '../data/services';

export function TeamPage() {
  return (
    <>
      <SEO
        title="Наша команда"
        description="Команда професійних майстрів салонукраси Майстерня Краси в Чернігові. Досвідчені перукарі та колористи."
      />
      <LocalBusinessSchema />

      <div className="pt-28 pb-16 bg-cream">
        <div className="container-custom">
          <Breadcrumbs />
          <SectionHeading
            title="Наша команда"
            subtitle="Професійні майстри, які створюють красу кожного дня"
          />
        </div>
      </div>

      {/* Team Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                name={member.name}
                position={member.position}
                experience={member.experience}
                image={member.image}
                specializations={member.specializations}
                certificates={member.certificates}
                instagram={member.instagram}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-soft max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4">
              Хочете приєднатися до команди?
            </h2>
            <p className="text-neutral-600 mb-6">
              Ми завжди раді талановитим майстрам. Якщо ви любите свою справу
              та хочете розвиватися в premium-сегменті, напишіть нам.
            </p>
            <a
              href="mailto:info@maisternya-krasy.ua"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Зв'язатися з нами
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
