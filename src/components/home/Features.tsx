import { FaHome, FaUser, FaHeart, FaStar } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      icon: <FaHome className="text-4xl text-luxury-gold" />,
      title: "Villas d'Exception",
      description: "Propriétés méticuleusement choisies, minutieusement préparées pour votre séjour"
    },
    {
      icon: <FaUser className="text-4xl text-luxury-gold" />,
      title: "Service Conciergerie",
      description: "À votre disposition 24h/24 et 7j/7 pour répondre à toutes vos demandes"
    },
    {
      icon: <FaHeart className="text-4xl text-luxury-gold" />,
      title: "Expériences Uniques",
      description: "Des moments inoubliables avec nos activités et services sur-mesure"
    },
    {
      icon: <FaStar className="text-4xl text-luxury-gold" />,
      title: "Garantie Qualité",
      description: "Des standards élevés pour vous garantir un séjour d'exception"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">
          Une Expérience de Location Unique
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
