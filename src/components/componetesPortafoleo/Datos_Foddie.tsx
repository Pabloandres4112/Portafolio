import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, TrendingUp, Mail, RefreshCw, AlertCircle, CheckCircle, Key } from 'lucide-react';

// Definiciones de tipos para Google API
declare global {
  interface Window {
    gapi?: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: {
          apiKey?: string;
          clientId: string;
          discoveryDocs: string[];
          scope: string;
        }) => Promise<void>;
      };
      auth2: {
        init: (config: { client_id: string }) => Promise<any>;
        getAuthInstance: () => {
          signIn: (config: { scope: string }) => Promise<{
            getAuthResponse: () => { access_token: string };
          }>;
        };
      };
    };
  }
}


interface SurveyResponse {
  id: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
  // Campos parseados
  utilidadPerdida?: string;
  appsQueUsas?: string[];
  caracteristicasAtractivas?: string[];
  descargarFoodie?: string;
  frecuenciaUsoEstimada?: string;
  desarrollarFoodie?: string;
  sugerencias?: string;
  comentariosAdicionales?: string;
}

interface GmailAuth {
  isAuthenticated: boolean;
  accessToken: string | null;
}

const Dashboard: React.FC = () => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState<GmailAuth>({ isAuthenticated: false, accessToken: null });
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // Configuración de Google OAuth - ACTUALIZADA
  const GOOGLE_CLIENT_ID = '757172654473-kid07ru5hd39fk0k6be9cmo5bg3fdh3f.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

  // Inicializar Google API
  useEffect(() => {
    const initializeGapi = async () => {
      try {
        if (window.gapi) {
          await new Promise<void>((resolve) => {
            window.gapi!.load('client:auth2', async () => {
              try {
                await window.gapi!.client.init({
                  apiKey: '', // No necesitas API key para OAuth
                  clientId: GOOGLE_CLIENT_ID,
                  discoveryDocs: [DISCOVERY_DOC],
                  scope: SCOPES
                });
                resolve();
              } catch (error) {
                console.error('Error inicializando gapi client:', error);
                setError('Error al inicializar la API de Google');
                resolve();
              }
            });
          });
        }
      } catch (error) {
        console.error('Error en initializeGapi:', error);
        setError('Error al cargar la API de Google');
      }
    };

    // Cargar Google API script
    if (!document.querySelector('script[src*="apis.google.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeGapi;
      script.onerror = () => setError('Error al cargar el script de Google API');
      document.body.appendChild(script);
    } else {
      initializeGapi();
    }
  }, []);

  // Función para autenticar con Google
  const authenticateGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!window.gapi?.client) {
        throw new Error('Google API no está cargada correctamente');
      }

      // Obtener instancia de auth
      const authInstance = window.gapi.auth2.getAuthInstance();

      if (!authInstance) {
        throw new Error('No se pudo obtener la instancia de autenticación');
      }

      // Intentar sign in
      const user = await authInstance.signIn({
        scope: SCOPES
      });

      if (!user) {
        throw new Error('No se pudo autenticar al usuario');
      }

      const accessToken = user.getAuthResponse().access_token;

      if (!accessToken) {
        throw new Error('No se pudo obtener el token de acceso');
      }

      setAuth({ isAuthenticated: true, accessToken });

      // Cargar datos automáticamente después de autenticar
      await loadGmailData(accessToken);

    } catch (error: any) {
      console.error('Auth error details:', error);
      setError(`Error al autenticar: ${error.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar emails de Formspree desde Gmail
  const loadGmailData = async (accessToken?: string) => {
    const token = accessToken || auth.accessToken;
    if (!token) {
      setError('No hay token de acceso disponible');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Buscar emails de Formspree
      const searchQuery = 'from:noreply@formspree.io OR from:forms@formspree.io subject:"New submission"';
      const searchResponse = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(searchQuery)}&maxResults=50`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!searchResponse.ok) {
        const errorText = await searchResponse.text();
        throw new Error(`Error al buscar emails: ${searchResponse.status} - ${errorText}`);
      }

      const searchData = await searchResponse.json();

      if (!searchData.messages) {
        setResponses([]);
        setLastSync(new Date());
        return;
      }

      // Obtener detalles de cada email
      const emailPromises = searchData.messages.map(async (message: any) => {
        try {
          const response = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?format=full`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            console.warn(`Error obteniendo email ${message.id}: ${response.status}`);
            return null;
          }

          return await response.json();
        } catch (error) {
          console.warn(`Error procesando email ${message.id}:`, error);
          return null;
        }
      });

      const emails = await Promise.all(emailPromises);
      const validEmails = emails.filter(email => email !== null);

      // Procesar emails y extraer datos de la encuesta
      const processedResponses = validEmails
        .map(email => parseFormspreeEmail(email))
        .filter(response => response !== null);

      setResponses(processedResponses);
      setLastSync(new Date());

    } catch (error: any) {
      setError('Error al cargar datos de Gmail: ' + error.message);
      console.error('Gmail load error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para parsear email de Formspree
  const parseFormspreeEmail = (email: any): SurveyResponse | null => {
    try {
      const headers = email.payload.headers;
      const subject = headers.find((h: any) => h.name === 'Subject')?.value || '';
      const date = headers.find((h: any) => h.name === 'Date')?.value || '';

      // Extraer el cuerpo del email
      let body = '';

      const extractBody = (part: any): string => {
        if (part.mimeType === 'text/plain' && part.body.data) {
          return atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }

        if (part.parts) {
          for (const subPart of part.parts) {
            const result = extractBody(subPart);
            if (result) return result;
          }
        }

        return '';
      };

      if (email.payload.parts) {
        body = extractBody(email.payload);
      } else if (email.payload.body.data) {
        body = atob(email.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }

      // Solo procesar si es de Formspree y contiene datos de la encuesta
      if (!body.includes('utilidad') && !body.includes('Utilidad') && !body.includes('foodie') && !body.includes('Foodie')) {
        return null;
      }

      const parsed = parseFormspreeContent(body);

      return {
        id: email.id,
        subject,
        date: new Date(date).toISOString(),
        snippet: email.snippet,
        body,
        ...parsed
      };

    } catch (error) {
      console.error('Error parsing email:', error);
      return null;
    }
  };

  // Función para extraer datos específicos de la encuesta - MEJORADA
  const parseFormspreeContent = (body: string) => {
    const lines = body.split('\n').map(line => line.trim()).filter(line => line);
    const data: any = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();

      // Buscar utilidad perdida
      if ((lowerLine.includes('utilidad') && lowerLine.includes('perdida')) ||
        (lowerLine.includes('utility') && lowerLine.includes('lost'))) {
        const match = line.match(/(\d+)/);
        if (match) {
          data.utilidadPerdida = match[1];
        }
      }

      // Buscar apps que usas
      if (lowerLine.includes('apps') && (lowerLine.includes('usas') || lowerLine.includes('use'))) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const content = line.includes(':') ? line.split(':')[1] : nextLine;
        if (content && content.trim()) {
          data.appsQueUsas = content.trim().split(/[,;]/).map(s => s.trim()).filter(s => s);
        }
      }

      // Buscar características atractivas
      if (lowerLine.includes('característica') || lowerLine.includes('feature')) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const content = line.includes(':') ? line.split(':')[1] : nextLine;
        if (content && content.trim()) {
          data.caracteristicasAtractivas = content.trim().split(/[,;]/).map(s => s.trim()).filter(s => s);
        }
      }

      // Buscar intención de descarga
      if (lowerLine.includes('descargar') && lowerLine.includes('foodie')) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const content = line.includes(':') ? line.split(':')[1] : nextLine;
        if (content && content.trim()) {
          data.descargarFoodie = content.trim();
        }
      }

      // Buscar frecuencia de uso
      if (lowerLine.includes('frecuencia') || lowerLine.includes('frequency')) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const content = line.includes(':') ? line.split(':')[1] : nextLine;
        if (content && content.trim()) {
          data.frecuenciaUsoEstimada = content.trim();
        }
      }

      // Buscar desarrollo de Foodie
      if (lowerLine.includes('desarrollar') && lowerLine.includes('foodie')) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const content = line.includes(':') ? line.split(':')[1] : nextLine;
        if (content && content.trim()) {
          data.desarrollarFoodie = content.trim();
        }
      }

      // Buscar sugerencias
      if (lowerLine.includes('sugerencia') || lowerLine.includes('suggestion')) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const content = line.includes(':') ? line.split(':')[1] : nextLine;
        if (content && content.trim()) {
          data.sugerencias = content.trim();
        }
      }

      // Buscar comentarios adicionales
      if (lowerLine.includes('comentario') && lowerLine.includes('adicional')) {
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const content = line.includes(':') ? line.split(':')[1] : nextLine;
        if (content && content.trim()) {
          data.comentariosAdicionales = content.trim();
        }
      }
    }

    return data;
  };

  // Calcular estadísticas
  const calculateStats = () => {
    const total = responses.length;
    if (total === 0) {
      return {
        totalResponses: 0,
        downloadInterest: 0,
        averageUtility: 0,
        todayResponses: 0
      };
    }

    const downloadPositive = responses.filter(r =>
      r.descargarFoodie?.toLowerCase().includes('sí') ||
      r.descargarFoodie?.toLowerCase().includes('definitivamente') ||
      r.descargarFoodie?.toLowerCase().includes('tal vez') ||
      r.descargarFoodie?.toLowerCase().includes('yes') ||
      r.descargarFoodie?.toLowerCase().includes('definitely') ||
      r.descargarFoodie?.toLowerCase().includes('maybe')
    ).length;

    const utilityValues = responses
      .map(r => parseInt(r.utilidadPerdida || '0'))
      .filter(val => val > 0);

    const avgUtility = utilityValues.length > 0
      ? utilityValues.reduce((sum, val) => sum + val, 0) / utilityValues.length
      : 0;

    const today = new Date().toDateString();
    const todayCount = responses.filter(r =>
      new Date(r.date).toDateString() === today
    ).length;

    return {
      totalResponses: total,
      downloadInterest: total > 0 ? Math.round((downloadPositive / total) * 100) : 0,
      averageUtility: parseFloat(avgUtility.toFixed(1)),
      todayResponses: todayCount
    };
  };

  const stats = calculateStats();

  // Preparar datos para gráficos
  const utilityData = responses.reduce((acc: any[], response) => {
    const utility = response.utilidadPerdida;
    if (utility && parseInt(utility) > 0) {
      const existing = acc.find(item => item.rating === `${utility} ⭐`);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ rating: `${utility} ⭐`, count: 1 });
      }
    }
    return acc;
  }, []).sort((a, b) => parseInt(a.rating) - parseInt(b.rating));

  const downloadData = responses.reduce((acc: any[], response) => {
    const download = response.descargarFoodie;
    if (download) {
      let category = 'Otros';
      const lowerDownload = download.toLowerCase();
      if (lowerDownload.includes('sí') || lowerDownload.includes('definitivamente') ||
        lowerDownload.includes('yes') || lowerDownload.includes('definitely')) {
        category = 'Definitivamente';
      } else if (lowerDownload.includes('tal vez') || lowerDownload.includes('maybe')) {
        category = 'Tal vez';
      } else if (lowerDownload.includes('no')) {
        category = 'No';
      }

      const existing = acc.find(item => item.name === category);
      if (existing) {
        existing.value++;
      } else {
        acc.push({ name: category, value: 1 });
      }
    }
    return acc;
  }, []);

  const colors = ['#10B981', '#F59E0B', '#EF4444', '#6B7280'];

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Conectar con Gmail
          </h1>

          <p className="text-gray-600 mb-6">
            Necesitas autenticarte con Google para acceder a los emails de Formspree en tu cuenta de Gmail.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">¿Qué hace esto?</h3>
            <ul className="text-sm text-blue-800 text-left space-y-1">
              <li>• Lee únicamente emails de Formspree</li>
              <li>• Extrae automáticamente los datos de la encuesta</li>
              <li>• Genera análisis en tiempo real</li>
              <li>• No modifica ni elimina emails</li>
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={authenticateGoogle}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Conectando...
              </>
            ) : (
              <>
                <Key size={20} />
                Conectar con Gmail
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Al conectar, aceptas que la aplicación acceda a tus emails de Formspree para generar análisis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Foodie App
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Conectado a Gmail - Datos de Formspree
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lastSync && (
                <div className="text-sm text-gray-500">
                  Última sync: {lastSync.toLocaleTimeString('es-ES')}
                </div>
              )}
              <button
                onClick={() => loadGmailData()}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Sincronizar
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Respuestas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalResponses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interés Descarga</p>
                <p className="text-2xl font-bold text-gray-900">{stats.downloadInterest}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilidad Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageUtility}/5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Respuestas Hoy</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayResponses}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Utility Rating Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Calificación de Utilidad Percibida
            </h3>
            {utilityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={utilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No hay datos de utilidad disponibles
              </div>
            )}
          </div>

          {/* Download Interest Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Intención de Descarga
            </h3>
            {downloadData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={downloadData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {downloadData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No hay datos de descarga disponibles
              </div>
            )}
          </div>
        </div>

        {/* Recent Responses Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Respuestas Recientes de Gmail ({responses.length} encontradas)
          </h3>
          {responses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Utilidad</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Descarga</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Apps Usadas</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Desarrollo</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.slice(0, 10).map((response) => (
                    <tr key={response.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(response.date).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {response.utilidadPerdida || 'N/A'} {response.utilidadPerdida ? '⭐' : ''}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${(response.descargarFoodie?.toLowerCase().includes('sí') ||
                            response.descargarFoodie?.toLowerCase().includes('definitivamente') ||
                            response.descargarFoodie?.toLowerCase().includes('yes') ||
                            response.descargarFoodie?.toLowerCase().includes('definitely'))
                            ? 'bg-green-100 text-green-800'
                            : (response.descargarFoodie?.toLowerCase().includes('tal vez') ||
                              response.descargarFoodie?.toLowerCase().includes('maybe'))
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                          {response.descargarFoodie || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {response.appsQueUsas?.slice(0, 2).join(', ') || 'N/A'}
                        {response.appsQueUsas && response.appsQueUsas.length > 2 && '...'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {response.desarrollarFoodie?.slice(0, 20) || 'N/A'}
                          {response.desarrollarFoodie && response.desarrollarFoodie.length > 20 && '...'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {responses.length > 10 && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Mostrando 10 de {responses.length} respuestas
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  Cargando emails...
                </div>
              ) : (
                'No se encontraron emails de Formspree con datos de la encuesta'
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;