import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    // console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Đã xảy ra lỗi khi hiển thị trang</h2>
            <p className="text-sm text-gray-600 mb-4">Vui lòng thử tải lại trang hoặc quay lại trang chủ.</p>
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => window.location.reload()} className="px-4 py-2 rounded bg-blue-600 text-white text-sm">Tải lại</button>
              <button onClick={this.handleReset} className="px-4 py-2 rounded bg-gray-100 text-gray-800 text-sm">Thử lại</button>
            </div>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <pre className="text-left text-xs text-red-600 mt-4 whitespace-pre-wrap overflow-auto max-h-48">{String(this.state.error?.message || this.state.error)}</pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
