import { ChefHat, Heart, Navigation, Star, Zap } from "lucide-react";
import LogoFoodid from '../logo_fodiie.svg';

export default function Header() {
    return (
        <div className="bg-gradient-to-r from-[#ff7e29] via-[#ff4d6d] to-[#ff2975] px-6 py-10 sm:p-12 text-center text-white relative overflow-hidden">
            {/* Iconos decorativos */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-6 animate-float">
                    <ChefHat className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="absolute top-10 right-8 animate-bounce delay-75">
                    <Star className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="absolute bottom-8 left-1/3 animate-pulse delay-150">
                    <Navigation className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="absolute bottom-6 right-1/4 animate-float delay-300">
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-3 sm:gap-4">
                    {/* Logo con fondo contrastante */}
                    <div className="p-3 sm:p-4 rounded-full bg-white shadow-lg">
                        <img 
                            src={LogoFoodid} 
                            alt="Logo Foodie" 
                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                        />
                    </div>
                    <h1 
                        className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none"
                        style={{ color: "#fff" }}
                    >
                        Fodiie
                    </h1>
                </div>

                <p className="text-lg sm:text-xl opacity-95 font-light max-w-md sm:max-w-2xl mx-auto leading-relaxed px-2">
                    Descubre, conecta y disfruta la mejor experiencia gastronómica de tu ciudad
                </p>

                <div className="mt-5 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 shadow-md">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-300" />
                    <span className="text-xs sm:text-sm font-medium">
                        Revolucionando la forma de encontrar comida
                    </span>
                </div>
            </div>
        </div>
    );
}
