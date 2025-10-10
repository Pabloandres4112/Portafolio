import React from 'react';

import Header from './foodid/Header';
import Seccion_Info from './foodid/Seccion_Info';
import From_Foodid from './foodid/From_Foodid';



const FoodieSurvey: React.FC = () => {
  

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-5">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-600">
                <Header />

                <div className="p-10">
                    {/* Project Description */}
                    <Seccion_Info />

                    <From_Foodid />
                </div>
            </div>
        </div>
    );
};

export default FoodieSurvey;