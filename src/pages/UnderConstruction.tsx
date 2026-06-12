import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFraud } from '../services/fraudService';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

console.log('🟣 ===== UnderConstruction.tsx cargado =====');

const UnderConstruction = () => {
  const navigate = useNavigate();
  console.log('🟣 Componente UnderConstruction montado/rendering');
  
  const [formData, setFormData] = useState({
    impostorDetails: '',
    contactInfo: '',
    comments: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('🟣 handleChange:', e.target.name, '=', e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🟣 ===== handleSubmit ejecutado =====');
    console.log('🟣 FormData actual:', formData);
    
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.impostorDetails.trim()) {
      console.warn('🟡 Validación falló: impostorDetails vacío');
      setError('Los detalles del impostor son obligatorios');
      setLoading(false);
      return;
    }
    if (!formData.contactInfo.trim()) {
      console.warn('🟡 Validación falló: contactInfo vacío');
      setError('El número, correo o usuario es obligatorio');
      setLoading(false);
      return;
    }

    try {
      console.log('🟣 Llamando a createFraud...');
      const result = await createFraud(formData);
      console.log('🟣 createFraud exitoso, resultado:', result);
      setSuccess(true);
      setFormData({ impostorDetails: '', contactInfo: '', comments: '' });
      
      console.log('🟣 Esperando 2 segundos antes de redirigir...');
      setTimeout(() => {
        console.log('🟣 Redirigiendo a /reportes');
        navigate('/reportes');
      }, 2000);
    } catch (err) {
      console.error('🔴 Error capturado en handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'Error al guardar el reporte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Reportar fraude
            </h1>
            <p className="text-lg text-gray-600">
              Ayude a la comunidad informando sobre intentos de fraude o suplantación de identidad.
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-700">¡Reporte guardado exitosamente! Redirigiendo...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="mb-6">
              <label htmlFor="impostorDetails" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de la persona, empresa o entidad que decía ser el impostor *
              </label>
              <input
                type="text"
                id="impostorDetails"
                name="impostorDetails"
                value={formData.impostorDetails}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ej: Juan Pérez, Banco Nacional, etc."
                disabled={loading || success}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="contactInfo" className="block text-sm font-semibold text-gray-700 mb-2">
                Número, correo o usuario desde el que contactó *
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ej: 8888-8888, estafa@ejemplo.com, @usuario_falso"
                disabled={loading || success}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
                Comentarios del caso
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describa lo que ocurrió con el mayor detalle posible. Mencione URLs, números, montos o fechas si las recuerda."
                disabled={loading || success}
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Reportar fraude'
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnderConstruction;