import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Grâce à LeadGen Pro Beta, nous avons augmenté notre taux de conversion de 25% en 3 mois.",
      author: "Marie D.",
      role: "Directrice Commerciale",
      company: "TechStart SAS",
    },
    {
      content: "L'analyse IA nous permet d'identifier rapidement les leads les plus prometteurs.",
      author: "Thomas L.",
      role: "Business Developer",
      company: "InnovCorp",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ils nous font confiance
          </h2>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-x-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg font-semibold leading-6 text-gray-900">
                  "{testimonial.content}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} - {testimonial.company}
                    </div>
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};