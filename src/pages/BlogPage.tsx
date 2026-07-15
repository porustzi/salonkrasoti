import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { BlogCard, PageHero } from '../components/ui';
import { blogPosts } from '../data/services';
import { BookOpen } from 'lucide-react';

export function BlogPage() {
  return (
    <>
      <SEO
        title="Блог"
        description="Блог салону краси Майстерня Краси в Чернігові. Поради щодо догляду за волоссям, трендові стрижки та фарбування."
      />

      <PageHero
        title="Краса та стиль"
        subtitle="Корисні статті про догляд за волоссям та трендові рішення"
        image="https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=1920"
        icon={BookOpen}
      />

      {/* Featured Post */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <div className="bg-cream rounded-3xl overflow-hidden grid lg:grid-cols-2">
              <div className="aspect-[16/10] lg:aspect-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-champagne text-sm font-medium mb-3">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-neutral-600 mb-6">{blogPosts[0].excerpt}</p>
                <a
                  href={`/blog/${blogPosts[0].slug}`}
                  className="inline-flex items-center gap-2 text-champagne font-medium hover:underline"
                >
                  Читати статтю
                </a>
              </div>
            </div>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                category={post.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center shadow-soft"
          >
            <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
              Підпишіться на новини
            </h3>
            <p className="text-neutral-600 mb-6">
              Отримуйте поради щодо догляду та інформацію про акції
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-grow px-5 py-3 rounded-full border border-neutral-200 focus:outline-none focus:border-champagne"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
              >
                Підписатися
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
