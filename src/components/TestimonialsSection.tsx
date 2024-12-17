import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Grâce à LeadGen Pro Beta, nous avons augmenté notre taux de conversion de 25% en 3 mois. L'outil est devenu indispensable pour notre équipe commerciale.",
      author: "Marie D.",
      role: "Directrice Commerciale",
      company: "TechStart SAS",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100"
    },
    {
      content: "L'analyse IA nous permet d'identifier rapidement les leads les plus prometteurs. Un gain de temps considérable dans notre processus de prospection.",
      author: "Thomas L.",
      role: "Business Developer",
      company: "InnovCorp",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&h=100"
    },
    {
      content: "Interface intuitive et résultats pertinents. LeadGen Pro Beta a transformé notre approche de la prospection commerciale.",
      author: "Sophie M.",
      role: "Sales Manager",
      company: "DigitalFirst",
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <div className="relative py-24 sm:py-32">
      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark via-black to-secondary-dark opacity-90" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ils l'ont déjà testé en avant-première
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Découvrez les retours de nos premiers utilisateurs
          </p>
        </motion.div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-black/40 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary/10 hover:border-primary/30">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                  <div>
                    <div className="flex items-center gap-x-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-lg font-medium leading-6 text-gray-300">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-12 w-12 rounded-full bg-gray-100"
                      src={testimonial.avatar}
                      alt={testimonial.author}
                    />
                    <div>
                      <div className="font-semibold text-gray-200">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role} - {testimonial.company}
                      </div>
                    </div>
                  </figcaption>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};