import { useEffect, useState } from 'react';
import { getAllFrauds } from '../services/fraudService';
import type { Fraud } from '../services/fraudService';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { AlertCircle, Loader2, FileText, Calendar } from 'lucide-react';

const ReportsList = () => {
  const [reports, setReports] = useState<Fraud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getAllFrauds();
        setReports(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los reportes');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Reportes de fraude
            </h1>
            <p className="text-lg text-gray-600">
              Lista de reportes enviados por la comunidad
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              <span className="ml-3 text-gray-600">Cargando reportes...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && reports.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl shadow-md">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay reportes aún</p>
              <p className="text-gray-400">Sé el primero en reportar un fraude</p>
            </div>
          )}

          {!loading && !error && reports.length > 0 && (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {report.impostorDetails}
                    </h3>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(report.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Contacto:</span> {report.contactInfo}
                  </p>
                  {report.comments && (
                    <p className="text-gray-600 mt-2 pt-2 border-t border-gray-100">
                      <span className="font-medium">Comentarios:</span><br />
                      {report.comments}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportsList;