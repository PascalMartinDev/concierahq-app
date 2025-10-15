import React, { useState, useEffect } from 'react';
import AuthenticationAPIClient from '../../services/api/AuthenticationAPIClient';

interface TestResult {
  test: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  data?: unknown;
  timestamp: string;
}

interface FormData {
  customerName: string;
  email: string;
  phoneNumber: string;
  orderDetails: string;
  preferences?: string;
}

const ApiTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    customerName: 'Test Customer',
    email: 'test@example.com',
    phoneNumber: '+1-555-1234',
    orderDetails: 'Test order from React component',
    preferences: 'Extra cheese, no onions'
  });

  const addTestResult = (test: string, status: TestResult['status'], message: string, data?: unknown) => {
    const result: TestResult = {
      test,
      status,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    setTestResults(prev => [...prev, result]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Environment check on component mount
  useEffect(() => {
    const checkEnvironment = () => {
      console.log('🔍 Environment Variables:');
      console.log('VITE_COGNITO_IDENTITY_POOL_ID:', import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID);
      console.log('VITE_AWS_REGION:', import.meta.env.VITE_AWS_REGION);
      
      if (!import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID) {
        addTestResult(
          'Environment Check',
          'error',
          'VITE_COGNITO_IDENTITY_POOL_ID is not set in environment variables'
        );
      } else if (!import.meta.env.VITE_AWS_REGION) {
        addTestResult(
          'Environment Check',
          'error',
          'VITE_AWS_REGION is not set in environment variables'
        );
      } else {
        addTestResult(
          'Environment Check',
          'success',
          'Environment variables are configured',
          {
            identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
            region: import.meta.env.VITE_AWS_REGION
          }
        );
      }
    };

    checkEnvironment();
  }, []);

  const runAllTests = async () => {
    setIsRunning(true);
    clearResults();

    try {
      // Test 1: Client Initialization
      addTestResult('Client Initialization', 'pending', 'Initializing API client...');
      
      let client: AuthenticationAPIClient;
      try {
        client = AuthenticationAPIClient.getInstance();
        addTestResult('Client Initialization', 'success', 'API client initialized successfully');
      } catch (error) {
        addTestResult('Client Initialization', 'error', `Failed to initialize client: ${error}`);
        setIsRunning(false);
        return;
      }

      // Test 2: Authentication Test
      addTestResult('Authentication Test', 'pending', 'Testing Cognito Identity Pool authentication...');
      
      try {
        const authResult = await client.testAuthentication();
        if (authResult.success) {
          addTestResult('Authentication Test', 'success', 'Authentication successful', authResult.data);
        } else {
          addTestResult('Authentication Test', 'error', authResult.error || 'Authentication failed', authResult);
        }
      } catch (error) {
        addTestResult('Authentication Test', 'error', `Authentication error: ${error}`);
      }

      // Test 3: Health Check
      addTestResult('Health Check', 'pending', 'Testing /health endpoint...');
      
      try {
        const healthResult = await client.healthCheck();
        if (healthResult.success) {
          addTestResult('Health Check', 'success', 'Health check passed', healthResult.data);
        } else {
          addTestResult('Health Check', 'error', healthResult.error || 'Health check failed', healthResult);
        }
      } catch (error) {
        addTestResult('Health Check', 'error', `Health check error: ${error}`);
      }

      // Test 4: Webex Form Submission
      addTestResult('Webex Form Submission', 'pending', 'Testing /webex/contactform endpoint...');
      
      try {
        const formResult = await client.submitWebexForm(formData);
        if (formResult.success) {
          addTestResult('Webex Form Submission', 'success', 'Form submitted successfully', formResult.data);
        } else {
          addTestResult('Webex Form Submission', 'error', formResult.error || 'Form submission failed', formResult);
        }
      } catch (error) {
        addTestResult('Webex Form Submission', 'error', `Form submission error: ${error}`);
      }

    } catch (error) {
      addTestResult('Test Suite', 'error', `Unexpected error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const testSingleEndpoint = async (endpoint: 'auth' | 'health' | 'form') => {
    setIsRunning(true);

    try {
      const client = AuthenticationAPIClient.getInstance();

      switch (endpoint) {
        case 'auth': {
          addTestResult('Single Auth Test', 'pending', 'Testing authentication...');
          const authResult = await client.testAuthentication();
          addTestResult('Single Auth Test', authResult.success ? 'success' : 'error', 
            authResult.success ? 'Authentication successful' : authResult.error || 'Authentication failed', 
            authResult);
          break;
        }

        case 'health': {
          addTestResult('Single Health Test', 'pending', 'Testing health endpoint...');
          const healthResult = await client.healthCheck();
          addTestResult('Single Health Test', healthResult.success ? 'success' : 'error',
            healthResult.success ? 'Health check passed' : healthResult.error || 'Health check failed',
            healthResult);
          break;
        }

        case 'form': {
          addTestResult('Single Form Test', 'pending', 'Testing form submission...');
          const formResult = await client.submitWebexForm(formData);
          addTestResult('Single Form Test', formResult.success ? 'success' : 'error',
            formResult.success ? 'Form submitted successfully' : formResult.error || 'Form submission failed',
            formResult);
          break;
        }
      }
    } catch (error) {
      addTestResult(`Single ${endpoint} Test`, 'error', `Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '⚪';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">API Test Suite</h1>
      
      {/* Environment Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Environment Configuration</h2>
        <div className="text-sm text-gray-600">
          <p><strong>Identity Pool ID:</strong> {import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID || 'Not set'}</p>
          <p><strong>AWS Region:</strong> {import.meta.env.VITE_AWS_REGION || 'Not set'}</p>
          <p><strong>API Base URL:</strong> https://fmi5zd0pyg.execute-api.us-east-1.amazonaws.com/prod</p>
        </div>
      </div>

      {/* Test Form Data */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Test Form Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Order Details"
            value={formData.orderDetails}
            onChange={(e) => setFormData({...formData, orderDetails: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Preferences (optional)"
            value={formData.preferences}
            onChange={(e) => setFormData({...formData, preferences: e.target.value})}
            className="p-2 border rounded md:col-span-2"
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isRunning ? '🔄 Running Tests...' : '🚀 Run All Tests'}
        </button>
        
        <button
          onClick={() => testSingleEndpoint('auth')}
          disabled={isRunning}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          🔐 Test Auth Only
        </button>
        
        <button
          onClick={() => testSingleEndpoint('health')}
          disabled={isRunning}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
        >
          💓 Test Health Only
        </button>
        
        <button
          onClick={() => testSingleEndpoint('form')}
          disabled={isRunning}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:bg-gray-400"
        >
          📝 Test Form Only
        </button>
        
        <button
          onClick={clearResults}
          disabled={isRunning}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400"
        >
          🗑️ Clear Results
        </button>
      </div>

      {/* Test Results */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test Results</h2>
        
        {testResults.length === 0 ? (
          <p className="text-gray-500 italic">No tests run yet. Click "Run All Tests" to start.</p>
        ) : (
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>{getStatusIcon(result.status)}</span>
                    {result.test}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <p className={`mb-2 ${getStatusColor(result.status)}`}>
                  {result.message}
                </p>
                
                {typeof result.data !== 'undefined' && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                      View Response Data
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CORS Status Indicator */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">✅ CORS Configuration Status</h3>
        <p className="text-sm text-green-700">
          Based on your curl test results, CORS is properly configured with these headers:
        </p>
        <ul className="text-xs text-green-600 mt-2 space-y-1">
          <li>• Access-Control-Allow-Origin: *</li>
          <li>• Access-Control-Allow-Headers: Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Amz-Content-Sha256</li>
          <li>• Access-Control-Allow-Methods: OPTIONS,POST</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;
