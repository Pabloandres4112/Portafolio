import React, { useState } from 'react';
import {
    Calendar,
    AlertCircle,
    Search,
    Clock,
    DollarSign,
    Utensils,
    TrendingUp,
    Users,
    Zap,
    Target,
    Award,
    Star,
    Wallet,
    Smartphone,
    Navigation,
    Globe,
    Camera,
    MessageCircle,
    Heart,
    MapPin,
    Filter,
    Bell,
    ThumbsUp,
    CheckCircle,
    Send
} from 'lucide-react';
import logoNexus from '../../isotipo-Nexus.svg';

interface FormData {
    frequency: string;
    problems: string[];
    age_range: string;
    budget: string;
    utility: string;
    current_apps: string[];
    attractive_features: string[];
    would_download: string;
    usage_frequency: string;
    should_develop: string;
    suggestions: string;
    additional_comments: string;
}

const From_Foodid: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        frequency: '',
        problems: [],
        age_range: '',
        budget: '',
        utility: '',
        current_apps: [],
        attractive_features: [],
        would_download: '',
        usage_frequency: '',
        should_develop: '',
        suggestions: '',
        additional_comments: ''
    });


    const [isSubmitted, setIsSubmitted] = useState(() => {
        // Si ya existe la marca en localStorage, mostrar pantalla de enviado
        return localStorage.getItem('foodie_survey_voted') === 'true';
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleRadioChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: 'problems' | 'current_apps' | 'attractive_features', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handleTextareaChange = (field: 'suggestions' | 'additional_comments', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Refs para scroll automático
    const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
        frequency: React.useRef<HTMLDivElement | null>(null),
        problems: React.useRef<HTMLDivElement | null>(null),
        age_range: React.useRef<HTMLDivElement | null>(null),
        budget: React.useRef<HTMLDivElement | null>(null),
        utility: React.useRef<HTMLDivElement | null>(null),
        current_apps: React.useRef<HTMLDivElement | null>(null),
        attractive_features: React.useRef<HTMLDivElement | null>(null),
        would_download: React.useRef<HTMLDivElement | null>(null),
        usage_frequency: React.useRef<HTMLDivElement | null>(null),
        should_develop: React.useRef<HTMLDivElement | null>(null)
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.frequency) errors.frequency = 'Selecciona una frecuencia.';
        if (formData.problems.length === 0) errors.problems = 'Selecciona al menos un problema.';
        if (!formData.age_range) errors.age_range = 'Selecciona tu rango de edad.';
        if (!formData.budget) errors.budget = 'Selecciona tu presupuesto.';
        if (!formData.utility) errors.utility = 'Selecciona el valor percibido.';
        if (formData.current_apps.length === 0) errors.current_apps = 'Selecciona al menos una app.';
        if (formData.attractive_features.length === 0) errors.attractive_features = 'Selecciona al menos una característica.';
        if (!formData.would_download) errors.would_download = 'Selecciona una opción.';
        if (!formData.usage_frequency) errors.usage_frequency = 'Selecciona una frecuencia de uso.';
        if (!formData.should_develop) errors.should_develop = 'Selecciona una opción.';
        // suggestions y additional_comments no son obligatorios
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Si ya votó, no permitir enviar
        if (localStorage.getItem('foodie_survey_voted') === 'true') {
            setIsSubmitted(true);
            return;
        }
        setIsSubmitting(true);

        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            // Scroll al primer campo con error
            const firstErrorKey = Object.keys(errors)[0];
            const ref = refs[firstErrorKey];
            if (ref && ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setIsSubmitting(false);
            return;
        }

        try {
            const textMessage = `
📋 NUEVO ENVÍO DE ENCUESTA FOODIE

🕒 ¿Con qué frecuencia buscas opciones de comida?
➡️ ${formData.frequency}

🚫 ¿Qué problemas enfrentas?
➡️ ${formData.problems.join(", ")}

👥 Rango de edad:
➡️ ${formData.age_range}

💰 Presupuesto promedio:
➡️ ${formData.budget}

⭐ Utilidad percibida:
➡️ ${formData.utility}

📱 Apps que usas:
➡️ ${formData.current_apps.join(", ")}

✨ Características atractivas:
➡️ ${formData.attractive_features.join(", ")}

⬇️ ¿Descargarías foodie?
➡️ ${formData.would_download}

📊 Frecuencia de uso estimada:
➡️ ${formData.usage_frequency}

💡 ¿Deberíamos desarrollar foodie?
➡️ ${formData.should_develop}

💬 Sugerencias:
➡️ ${formData.suggestions}

📝 Comentarios adicionales:
➡️ ${formData.additional_comments}
`;

            const payload = {
                message: textMessage,
                admin_email: "perdomo4112@gmail.com"
            };

            const response = await fetch('https://formspree.io/f/xrbkqrrn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setIsSubmitted(true);
                localStorage.setItem('foodie_survey_voted', 'true');
            } else {
                console.error("Error al enviar formulario:", await response.text());
            }
        } catch (error) {
            console.error("Error de red:", error);
        }

        setIsSubmitting(false);
    };

    const RadioOption: React.FC<{
        id: string;
        name: string;
        value: string;
        label: string;
        checked: boolean;
        onChange: () => void;
        icon?: React.ReactNode;
    }> = ({ id, name, value, label, checked, onChange, icon }) => (
        <div className="relative group">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            <label
                htmlFor={id}
                className={`block p-5 rounded-xl border-2 text-center cursor-pointer transition-all duration-300 font-semibold relative overflow-hidden
      ${checked
                        ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 shadow-lg scale-105 transform text-emerald-800'
                        : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 text-gray-700 group-hover:bg-gradient-to-br group-hover:from-emerald-25 group-hover:to-teal-25'
                    }`}
            >
                {icon && (
                    <div className={`flex justify-center mb-2 ${checked ? 'text-emerald-600' : 'text-emerald-500'}`}>
                        {icon}
                    </div>
                )}
                <div className="text-sm">{label}</div>
                {checked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 animate-pulse"></div>
                )}
            </label>
        </div>
    );

    const ScaleOption: React.FC<{
        value: number;
        checked: boolean;
        onChange: () => void;
    }> = ({ value, checked, onChange }) => (
        <div className="relative group">
            <input
                type="radio"
                id={`utility${value}`}
                name="utility"
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            <label
                htmlFor={`utility${value}`}
                className={`flex items-center justify-center w-14 h-14 border-2 rounded-full cursor-pointer transition-all duration-300 font-bold text-lg relative overflow-hidden
      ${checked
                        ? 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-800 border-emerald-400 transform scale-125 shadow-xl'
                        : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-lg text-gray-700 group-hover:bg-gradient-to-br group-hover:from-emerald-25 group-hover:to-teal-25'
                    }`}
            >
                {value}
                {checked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 animate-pulse rounded-full"></div>
                )}
            </label>
        </div>
    );

    const CheckboxOption: React.FC<{
        id: string;
        value: string;
        label: string;
        checked: boolean;
        onChange: () => void;
        icon?: React.ReactNode;
        description?: string;
    }> = ({ id, value, label, checked, onChange, icon, description }) => (
        <div className="relative group">
            <input
                type="checkbox"
                id={id}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            <label
                htmlFor={id}
                className={`block p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 font-medium relative overflow-hidden
          ${checked
                        ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 shadow-lg'
                        : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5 group-hover:bg-gradient-to-br group-hover:from-emerald-25 group-hover:to-teal-25'
                    }`}
            >
                <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all duration-300
            ${checked
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-500'
                            : 'border-gray-300 bg-white group-hover:border-emerald-400'
                        }`}>
                        {checked && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                        {icon && (
                            <div className={`flex items-center mb-2 ${checked ? 'text-emerald-600' : 'text-gray-500'}`}>
                                {icon}
                                <span className="ml-2 text-sm font-semibold">{label}</span>
                            </div>
                        )}
                        {!icon && <div className="text-sm font-semibold mb-1">{label}</div>}
                        {description && (
                            <div className="text-xs text-gray-600">{description}</div>
                        )}
                    </div>
                </div>
            </label>
        </div>
    );

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 p-2 sm:p-5">
                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-600">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 sm:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-pattern opacity-10"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">¡Misión Cumplida! 🎉</h2>
                            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
                                Tu valiosa opinión ha sido registrada exitosamente. Juntos estamos construyendo el futuro de la experiencia gastronómica digital.
                            </p>
                            <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-2 text-emerald-200">
                                <Heart className="w-5 h-5" />
                                <span className="text-xs sm:text-sm">Gracias por ser parte de la revolución foodie</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 px-1 sm:px-0">
            {/* Mensaje de error general */}
            {Object.keys(formErrors).length > 0 && (
                <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
                    Por favor completa los campos obligatorios marcados en rojo.
                </div>
            )}
            {/* Question 1 */}
            <div ref={refs.frequency} className={`bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border ${formErrors.frequency ? 'border-red-400' : 'border-gray-200'} hover:border-indigo-300 transition-all duration-300 hover:shadow-lg`}>
                {/* Encabezado */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                    {/* Número paso */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold shadow-lg">
                        1
                    </div>
                    {/* Título + descripción */}
                    <div>
                        <div className="flex items-center flex-wrap gap-2">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                            <span>Frecuencia de Búsqueda Gastronómica</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            ¿Con qué frecuencia exploras opciones de comida fuera de casa?
                        </p>
                    </div>
                </h3>

                {/* Mensaje de error debajo del título */}
                {formErrors.frequency && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.frequency}</div>}
                {/* Opciones de selección */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">

                    {[
                        { value: 'diario', label: 'Diariamente', icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" /> },
                        { value: 'varias-veces-semana', label: 'Varias veces/semana', icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" /> },
                        { value: 'una-vez-semana', label: 'Semanalmente', icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" /> },
                        { value: 'ocasionalmente', label: 'Ocasionalmente', icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" /> },
                        { value: 'nunca', label: 'Raramente', icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" /> }
                    ].map(option => (
                        <RadioOption
                            key={option.value}
                            id={`freq_${option.value}`}
                            name="frequency"
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            checked={formData.frequency === option.value}
                            onChange={() => handleRadioChange('frequency', option.value)}
                        />
                    ))}
                </div>
            </div>

            {/* Question 2 */}
            <div ref={refs.problems} className={`bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border ${formErrors.problems ? 'border-red-400' : 'border-gray-200'} hover:border-red-300 transition-all duration-300 hover:shadow-lg`}>
                {/* Encabezado */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                    {/* Número de pregunta */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold shadow-lg">
                        2
                    </div>
                    {/* Título + descripción */}
                    <div>
                        <div className="flex items-center flex-wrap gap-2">
                            {/* <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" /> */}
                            <span>Desafíos en la Búsqueda de Comida</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            ¿Qué obstáculos encuentras al explorar opciones gastronómicas?
                        </p>
                    </div>
                </h3>

                {/* Mensaje de error debajo del título */}
                {formErrors.problems && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.problems}</div>}
                {/* Opciones */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {[
                        {
                            value: 'no-se-que-opciones-hay',
                            label: 'Opciones Desconocidas',
                            icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />,
                            description: 'No conozco qué establecimientos están cerca'
                        },
                        {
                            value: 'info-desactualizada',
                            label: 'Información Obsoleta',
                            icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
                            description: 'Los datos que encuentro están desactualizados'
                        },
                        {
                            value: 'no-se-precios',
                            label: 'Precios Ocultos',
                            icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
                            description: 'No puedo conocer precios sin visitar el lugar'
                        },
                        {
                            value: 'menu-no-disponible',
                            label: 'Menús Inaccesibles',
                            icon: <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />,
                            description: 'Es difícil ver qué platos ofrecen'
                        },
                        {
                            value: 'tiempo-perdido',
                            label: 'Proceso Lento',
                            icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
                            description: 'Demoro mucho tiempo tomando decisiones'
                        },
                        {
                            value: 'horarios-desconocidos',
                            label: 'Horarios Inciertos',
                            icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
                            description: 'No sé cuándo están abiertos'
                        }
                    ].map(option => (
                        <CheckboxOption
                            key={option.value}
                            id={`prob_${option.value}`}
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            description={option.description}
                            checked={formData.problems.includes(option.value)}
                            onChange={() => handleCheckboxChange('problems', option.value)}
                        />
                    ))}
                </div>
            </div>


            {/* Question 3 */}
            <div ref={refs.age_range} className={`bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border ${formErrors.age_range ? 'border-red-400' : 'border-gray-100'} hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]`}>
                {formErrors.age_range && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.age_range}</div>}

                {/* Encabezado */}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    {/* Número de pregunta */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold shadow-md">
                        3
                    </div>

                    {/* Título + subtítulo */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            <span className="text-lg sm:text-2xl font-bold text-gray-800">Perfil Demográfico</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            Ayúdanos a entender mejor a nuestros usuarios
                        </p>
                    </div>
                </h3>

                {/* Opciones */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
                    {[
                        { value: '18-25', label: '18-25 años', icon: <Zap className="w-5 h-5" /> },
                        { value: '26-35', label: '26-35 años', icon: <TrendingUp className="w-5 h-5" /> },
                        { value: '36-45', label: '36-45 años', icon: <Target className="w-5 h-5" /> },
                        { value: '46-55', label: '46-55 años', icon: <Award className="w-5 h-5" /> },
                        { value: '55+', label: '55+ años', icon: <Star className="w-5 h-5" /> }
                    ].map(option => (
                        <RadioOption
                            key={option.value}
                            id={`age_${option.value}`}
                            name="age_range"
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            checked={formData.age_range === option.value}
                            onChange={() => handleRadioChange('age_range', option.value)}
                        />
                    ))}
                </div>
            </div>


            {/* Question 4 */}
            {/* Pregunta 4 */}
            <div ref={refs.budget} className={`bg-gradient-to-br from-gray-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border ${formErrors.budget ? 'border-red-400' : 'border-gray-100'} hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]`}>
                {formErrors.budget && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.budget}</div>}

                {/* Encabezado */}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    {/* Número */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-600 to-orange-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold shadow-md">
                        4
                    </div>

                    {/* Título */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                            <span className="text-lg sm:text-2xl font-bold text-gray-800">Rango de Inversión Gastronómica</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            ¿Cuál es tu presupuesto promedio por experiencia culinaria?
                        </p>
                    </div>
                </h3>

                {/* Opciones */}
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
                    {[
                        { value: 'menos-10000', label: '< $10K', icon: <DollarSign className="w-5 h-5" /> },
                        { value: '10000-20000', label: '$10K - $20K', icon: <DollarSign className="w-5 h-5" /> },
                        { value: '20000-35000', label: '$20K - $35K', icon: <DollarSign className="w-5 h-5" /> },
                        { value: '35000-50000', label: '$35K - $50K', icon: <DollarSign className="w-5 h-5" /> },
                        { value: 'mas-50000', label: '> $50K', icon: <DollarSign className="w-5 h-5" /> }
                    ].map(option => (
                        <RadioOption
                            key={option.value}
                            id={`budget_${option.value}`}
                            name="budget"
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            checked={formData.budget === option.value}
                            onChange={() => handleRadioChange('budget', option.value)}
                        />
                    ))}
                </div>
            </div>

            {/* Pregunta 5 */}
            <div ref={refs.utility} className={`bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border ${formErrors.utility ? 'border-red-400' : 'border-gray-100'} hover:border-orange-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] mt-6`}>
                {formErrors.utility && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.utility}</div>}

                {/* Encabezado */}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    {/* Número */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold shadow-md">
                        5
                    </div>

                    {/* Título */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                            <span className="text-lg sm:text-2xl font-bold text-gray-800">Evaluación de Valor Percibido</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            ¿Qué tan revolucionario sería foodie en tu vida diaria?
                        </p>
                    </div>
                </h3>

                {/* Escala */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Etiquetas escala */}
                    <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 px-2 sm:px-4">
                        <span className="flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Nada útil
                        </span>
                        <span className="flex items-center">
                            Extremadamente útil
                            <Award className="w-4 h-4 ml-2" />
                        </span>
                    </div>

                    {/* Opciones numéricas */}
                    <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                            <ScaleOption
                                key={value}
                                value={value}
                                checked={formData.utility === value.toString()}
                                onChange={() => handleRadioChange('utility', value.toString())}
                            />
                        ))}
                    </div>
                </div>
            </div>


            {/* Question 6 */}
            <div ref={refs.current_apps} className={`bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${formErrors.current_apps ? 'border-red-400' : 'border-gray-100'} hover:border-purple-300 transition-all duration-300 hover:shadow-lg`}>
                {formErrors.current_apps && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.current_apps}</div>}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-4 sm:mr-6 shadow-lg">6</div>
                    <div>
                        <div className="flex items-center">
                            <Smartphone className="w-6 h-6 mr-3 text-purple-600" />
                            Ecosistema Digital Actual
                        </div>
                        <p className="text-sm text-gray-600 font-normal mt-1">¿Qué herramientas utilizas actualmente para descubrir comida?</p>
                    </div>
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4">
                    {[
                        {
                            value: 'google-maps',
                            label: 'Google Maps',
                            icon: <Navigation className="w-5 h-5" />,
                            description: 'Búsqueda geográfica de restaurantes'
                        },
                        {
                            value: 'rappi',
                            label: 'Rappi',
                            icon: <Zap className="w-5 h-5" />,
                            description: 'Plataforma de delivery y descubrimiento'
                        },
                        {
                            value: 'uber-eats',
                            label: 'Uber Eats',
                            icon: <TrendingUp className="w-5 h-5" />,
                            description: 'Servicio de entrega de comida'
                        },
                        {
                            value: 'domicilios',
                            label: 'Domicilios.com',
                            icon: <Globe className="w-5 h-5" />,
                            description: 'Portal colombiano de pedidos'
                        },
                        {
                            value: 'facebook-instagram',
                            label: 'Redes Sociales',
                            icon: <Camera className="w-5 h-5" />,
                            description: 'Facebook e Instagram para recomendaciones'
                        },
                        {
                            value: 'whatsapp',
                            label: 'WhatsApp Business',
                            icon: <MessageCircle className="w-5 h-5" />,
                            description: 'Comunicación directa con restaurantes'
                        },
                        {
                            value: 'ninguna',
                            label: 'Ninguna App',
                            icon: <AlertCircle className="w-5 h-5" />,
                            description: 'No utilizo aplicaciones digitales'
                        },
                        {
                            value: 'pregunto-amigos',
                            label: 'Red Personal',
                            icon: <Users className="w-5 h-5" />,
                            description: 'Recomendaciones de amigos y familia'
                        }
                    ].map(option => (
                        <CheckboxOption
                            key={option.value}
                            id={`app_${option.value}`}
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            description={option.description}
                            checked={formData.current_apps.includes(option.value)}
                            onChange={() => handleCheckboxChange('current_apps', option.value)}
                        />
                    ))}
                </div>
            </div>

            {/* Question 7 */}
            <div ref={refs.attractive_features} className={`bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${formErrors.attractive_features ? 'border-red-400' : 'border-gray-100'} hover:border-pink-300 transition-all duration-300 hover:shadow-lg`}>
                {formErrors.attractive_features && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.attractive_features}</div>}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-600 to-rose-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-4 sm:mr-6 shadow-lg">7</div>
                    <div>
                        <div className="flex items-center">
                            <Heart className="w-6 h-6 mr-3 text-pink-600" />
                            Características Más Atractivas
                        </div>
                        <p className="text-sm text-gray-600 font-normal mt-1">¿Qué funcionalidades de foodie te emocionan más?</p>
                    </div>
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4">
                    {[
                        {
                            value: 'busqueda-ubicacion',
                            label: 'Geolocalización Inteligente',
                            icon: <MapPin className="w-5 h-5" />,
                            description: 'Encuentra opciones precisas según tu ubicación'
                        },
                        {
                            value: 'menus-tiempo-real',
                            label: 'Menús Dinámicos',
                            icon: <Globe className="w-5 h-5" />,
                            description: 'Información actualizada al instante'
                        },
                        {
                            value: 'filtros-precio',
                            label: 'Filtros Presupuestarios',
                            icon: <Filter className="w-5 h-5" />,
                            description: 'Personaliza según tu capacidad de gasto'
                        },
                        {
                            value: 'resenas-fotos',
                            label: 'Reviews Auténticas',
                            icon: <Camera className="w-5 h-5" />,
                            description: 'Experiencias reales de otros foodie lovers'
                        },
                        {
                            value: 'disponibilidad-real',
                            label: 'Stock en Vivo',
                            icon: <Clock className="w-5 h-5" />,
                            description: 'Sabe qué platos están disponibles ahora'
                        },
                        {
                            value: 'notificaciones',
                            label: 'Alertas Personalizadas',
                            icon: <Bell className="w-5 h-5" />,
                            description: 'Recibe notificaciones relevantes para ti'
                        }
                    ].map(option => (
                        <CheckboxOption
                            key={option.value}
                            id={`feat_${option.value}`}
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            description={option.description}
                            checked={formData.attractive_features.includes(option.value)}
                            onChange={() => handleCheckboxChange('attractive_features', option.value)}
                        />
                    ))}
                </div>
            </div>

            {/* Question 8 */}
            <div ref={refs.would_download} className={`bg-gradient-to-br from-gray-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${formErrors.would_download ? 'border-red-400' : 'border-gray-100'} hover:border-cyan-300 transition-all duration-300 hover:shadow-lg`}>
                {formErrors.would_download && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.would_download}</div>}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-4 sm:mr-6 shadow-lg">8</div>
                    <div>
                        <div className="flex items-center">
                            <ThumbsUp className="w-6 h-6 mr-3 text-cyan-600" />
                            Intención de Adopción
                        </div>
                        <p className="text-sm text-gray-600 font-normal mt-1">¿Qué probabilidad hay de que te unas a la revolución foodie?</p>
                    </div>
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                    {[
                        { value: 'definitivamente-si', label: '¡Absolutamente!', icon: <Award className="w-5 h-5" /> },
                        { value: 'probablemente-si', label: 'Muy probable', icon: <ThumbsUp className="w-5 h-5" /> },
                        { value: 'tal-vez', label: 'Quizás', icon: <Target className="w-5 h-5" /> },
                        { value: 'probablemente-no', label: 'Poco probable', icon: <AlertCircle className="w-5 h-5" /> },
                        { value: 'definitivamente-no', label: 'Definitivamente no', icon: <AlertCircle className="w-5 h-5" /> }
                    ].map(option => (
                        <RadioOption
                            key={option.value}
                            id={`download_${option.value}`}
                            name="would_download"
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            checked={formData.would_download === option.value}
                            onChange={() => handleRadioChange('would_download', option.value)}
                        />
                    ))}
                </div>
            </div>

            {/* Question 9 */}
            <div ref={refs.usage_frequency} className={`bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${formErrors.usage_frequency ? 'border-red-400' : 'border-gray-100'} hover:border-emerald-300 transition-all duration-300 hover:shadow-lg`}>
                {formErrors.usage_frequency && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.usage_frequency}</div>}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-4 sm:mr-6 shadow-lg">9</div>
                    <div>
                        <div className="flex items-center">
                            <TrendingUp className="w-6 h-6 mr-3 text-emerald-600" />
                            Frecuencia de Uso Proyectada
                        </div>
                        <p className="text-sm text-gray-600 font-normal mt-1">¿Con qué frecuencia imaginas usando foodie en tu rutina?</p>
                    </div>
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                    {[
                        { value: 'varias-veces-dia', label: 'Power User', icon: <Zap className="w-5 h-5" /> },
                        { value: 'una-vez-dia', label: 'Usuario Diario', icon: <TrendingUp className="w-5 h-5" /> },
                        { value: 'varias-veces-semana', label: 'Usuario Regular', icon: <Calendar className="w-5 h-5" /> },
                        { value: 'una-vez-semana', label: 'Usuario Semanal', icon: <Clock className="w-5 h-5" /> },
                        { value: 'ocasionalmente', label: 'Usuario Ocasional', icon: <Target className="w-5 h-5" /> }
                    ].map(option => (
                        <RadioOption
                            key={option.value}
                            id={`usage_${option.value}`}
                            name="usage_frequency"
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            checked={formData.usage_frequency === option.value}
                            onChange={() => handleRadioChange('usage_frequency', option.value)}
                        />
                    ))}
                </div>
            </div>

            {/* Question 10 */}
            <div ref={refs.should_develop} className={`bg-gradient-to-br from-gray-50 to-violet-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 ${formErrors.should_develop ? 'border-red-400' : 'border-gray-100'} hover:border-violet-300 transition-all duration-300 hover:shadow-lg`}>
                {formErrors.should_develop && <div className="text-red-500 text-xs mb-2 font-semibold">{formErrors.should_develop}</div>}
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-4 sm:mr-6 shadow-lg">10</div>
                    <div>
                        <div className="flex items-center">
                            <Award className="w-6 h-6 mr-3 text-violet-600" />
                            Veredicto Final del Proyecto
                        </div>
                        <p className="text-sm text-gray-600 font-normal mt-1">¿Crees que deberíamos materializar esta visión gastronómica?</p>
                    </div>
                </h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                    {[
                        { value: 'si-excelente-idea', label: '¡Idea Genial!', icon: <Award className="w-5 h-5" /> },
                        { value: 'si-con-mejoras', label: 'Sí, con ajustes', icon: <TrendingUp className="w-5 h-5" /> },
                        { value: 'no-estoy-seguro', label: 'Necesito más info', icon: <Search className="w-5 h-5" /> },
                        { value: 'no-necesario', label: 'No es necesario', icon: <AlertCircle className="w-5 h-5" /> }
                    ].map(option => (
                        <RadioOption
                            key={option.value}
                            id={`develop_${option.value}`}
                            name="should_develop"
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            checked={formData.should_develop === option.value}
                            onChange={() => handleRadioChange('should_develop', option.value)}
                        />
                    ))}
                </div>
            </div>

            {/* Question 11 */}
            <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-gray-100 hover:border-amber-300 transition-all duration-300 hover:shadow-lg">
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-yellow-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-4 sm:mr-6 shadow-lg">11</div>
                    <div>
                        <div className="flex items-center">
                            <MessageCircle className="w-6 h-6 mr-3 text-amber-600" />
                            Ideas y Sugerencias Innovadoras
                        </div>
                        <p className="text-sm text-gray-600 font-normal mt-1">¿Qué funcionalidades adicionales harían de foodie la app perfecta?</p>
                    </div>
                </h3>
                <div className="relative">
                    <textarea
                        value={formData.suggestions}
                        onChange={(e) => handleTextareaChange('suggestions', e.target.value)}
                        placeholder=" Compártenos tus ideas revolucionarias, características deseadas o cualquier funcionalidad que transformaría tu experiencia gastronómica..."
                        className="w-full p-4 sm:p-6 border-2 border-gray-200 rounded-2xl focus:border-amber-400 focus:outline-none transition-all duration-300 min-h-[100px] sm:min-h-[120px] resize-y text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm shadow-inner text-sm sm:text-base"
                    />
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-amber-500">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Question 12 */}
            <div className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-gray-100 hover:border-teal-300 transition-all duration-300 hover:shadow-lg">
                <h3 className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-base sm:text-lg font-bold mr-4 sm:mr-6 shadow-lg">12</div>
                    <div>
                        <div className="flex items-center">
                            <Heart className="w-6 h-6 mr-3 text-teal-600" />
                            Reflexiones Finales
                        </div>
                        <p className="text-sm text-gray-600 font-normal mt-1">¿Algún pensamiento adicional sobre foodie o tus hábitos gastronómicos?</p>
                    </div>
                </h3>
                <div className="relative">
                    <textarea
                        value={formData.additional_comments}
                        onChange={(e) => handleTextareaChange('additional_comments', e.target.value)}
                        placeholder="💭 Cualquier reflexión, anécdota o comentario adicional que enriquezca nuestra comprensión será inmensamente valioso..."
                        className="w-full p-4 sm:p-6 border-2 border-gray-200 rounded-2xl focus:border-teal-400 focus:outline-none transition-all duration-300 min-h-[100px] sm:min-h-[120px] resize-y text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm shadow-inner text-sm sm:text-base"
                    />
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-teal-500">
                        <Heart className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Submit Section con Nexus */}
            <div className="text-center p-6 sm:p-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl border-2 border-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-pink-500/5"></div>

                <div className="relative z-10">

                    {/* Sección principal */}
                    <div className="flex flex-col xs:flex-row items-center justify-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-0 xs:mr-4 shadow-lg">
                            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div className="text-center xs:text-left">
                            <h4 className="text-lg sm:text-2xl font-bold text-gray-800">Tu Voz Importa</h4>
                            <p className="text-gray-600 text-xs sm:text-base">Cada opinión construye el futuro de foodie</p>
                        </div>
                    </div>

                    {/* Texto motivacional */}
                    <p className="text-gray-700 mb-4 sm:mb-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        Estás a un clic de contribuir a una <strong className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">revolución gastronómica digital</strong>. Tu feedback será fundamental para crear la experiencia culinaria que todos merecemos.
                    </p>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group relative px-6 sm:px-12 py-3 sm:py-5 rounded-2xl text-base sm:text-xl font-bold text-white transition-all duration-500 transform hover:-translate-y-2 active:translate-y-0 shadow-2xl hover:shadow-3xl flex items-center mx-auto overflow-hidden
              ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700'
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                                <span className="text-xs sm:text-base">Procesando tu feedback...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                                Enviar mi Evaluación
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:text-yellow-300 transition-colors duration-300" />
                            </>
                        )}
                    </button>

                    {/* Información adicional */}
                    <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row items-center justify-center space-y-2 xs:space-y-0 xs:space-x-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span>100% Confidencial</span>
                        </div>
                        <div className="hidden xs:block w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            <span>Contribución Valiosa</span>
                        </div>
                    </div>

                    {/* Branding Nexus */}
                    <div className="mt-8 flex flex-col items-center space-y-3 sm:space-y-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <img
                                src={logoNexus}
                                alt="Logo Nexus"
                                className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-md"
                            />
                            <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                Nexus
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base max-w-md text-center">
                            Innovando en el desarrollo de experiencias digitales para el mundo gastronómico.
                        </p>
                        <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <p className="text-gray-400 text-xs sm:text-sm text-center">
                            © {new Date().getFullYear()} Nexus. Todos los derechos reservados.
                        </p>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default From_Foodid;