import { ChefHat, Navigation, Globe, Filter, Award } from "lucide-react";

export default function Seccion_Info() {
    const features = [
        {
            icon: Navigation,
            title: 'Geolocalización Smart',
            desc: 'Encuentra opciones precisas cerca de ti con tecnología de ubicación avanzada.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Globe,
            title: 'Información Real-Time',
            desc: 'Accede a menús y disponibilidad actualizados en tiempo real.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: Filter,
            title: 'Filtros Inteligentes',
            desc: 'Personaliza tu búsqueda según presupuesto y preferencias.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Award,
            title: 'Comunidad Expert',
            desc: 'Lee reviews auténticas de amantes de la gastronomía.',
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 py-12 sm:px-10 sm:py-16 rounded-3xl mb-12 border border-indigo-100 relative overflow-hidden">
            {/* Línea superior decorativa */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Encabezado */}
                <header className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-center mb-8 sm:mb-12 text-center sm:text-left">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-5 shadow-md">
                        <ChefHat className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                        El Futuro de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Gastronomía Digital</span>
                    </h2>
                </header>

                {/* Descripción */}
                <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl mx-auto text-center">
                    <strong className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">foodie</strong> es más que una aplicación: es tu compañero inteligente para descubrir experiencias gastronómicas auténticas. 
                    Conectamos comensales apasionados con establecimientos locales a través de tecnología innovadora y datos en tiempo real.
                </p>

                {/* Características */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
