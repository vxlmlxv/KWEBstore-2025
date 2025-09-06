export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                KWEBstore
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              KWEB 스터디를 위한 실습용 온라인 쇼핑몰입니다.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 KWEBstore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
