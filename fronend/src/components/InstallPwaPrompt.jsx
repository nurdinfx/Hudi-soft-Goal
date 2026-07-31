import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share, PlusSquare, X, Check, Droplets, ShieldCheck, Zap } from 'lucide-react';

export default function InstallPwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const isInStandaloneMode = () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://');

    if (isInStandaloneMode()) {
      setIsStandalone(true);
      return;
    }

    // Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Handle Android/Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if user dismissed recently in this session
      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        // Show modal after 1.5 seconds delay
        setTimeout(() => setShowPrompt(true), 1500);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Custom event listener so Sidebar or Header button can trigger modal anytime
    const handleManualTrigger = () => {
      setShowPrompt(true);
    };
    window.addEventListener('openPwaInstallModal', handleManualTrigger);

    // For iOS devices, show prompt if not in standalone and not dismissed
    if (isIosDevice) {
      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 1500);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('openPwaInstallModal', handleManualTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true);
      } else {
        alert('To install, tap your browser menu (⋮) and select "Add to Home screen" or "Install App".');
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install prompt outcome: ${outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-blue-100 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700"></div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center space-x-3 mb-4 pt-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
            <Droplets className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">DUR-DUR CLEAN WATER</h3>
            <p className="text-xs font-semibold text-blue-600 tracking-wide uppercase">Official Mobile App</p>
          </div>
        </div>

        {!showIOSInstructions ? (
          <>
            <div className="my-4 p-4 bg-blue-50/80 rounded-xl border border-blue-100 text-sm text-gray-700 space-y-2">
              <p className="font-semibold text-blue-900 flex items-center">
                <Smartphone className="w-4 h-4 mr-1.5 text-blue-600" />
                Install on your iPhone or Android phone!
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add DUR-DUR CLEAN WATER to your home screen to manage water deliveries, customers, and car revenue seamlessly with offline access and full phone compatibility.
              </p>
              
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-100 text-xs text-gray-600">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  <span>Full Screen App</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Super Fast Access</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col space-y-2.5">
              <button
                onClick={isIOS ? () => setShowIOSInstructions(true) : handleInstallClick}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Download className="w-5 h-5" />
                <span>{isIOS ? 'Install on iPhone / iPad' : 'Install App Now'}</span>
              </button>

              <button
                onClick={handleDismiss}
                className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors text-center"
              >
                Continue in Browser
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 text-base flex items-center">
              <Share className="w-4 h-4 mr-2 text-blue-600" />
              How to Install on iPhone / iPad:
            </h4>

            <ol className="space-y-3 text-xs text-gray-700">
              <li className="flex items-start space-x-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="bg-blue-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[11px]">1</span>
                <div>
                  Tap the <strong className="text-blue-700">Share button</strong> <Share className="w-3.5 h-3.5 inline text-blue-600" /> in Safari's bottom menu bar.
                </div>
              </li>
              <li className="flex items-start space-x-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="bg-blue-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[11px]">2</span>
                <div>
                  Scroll down and tap <strong className="text-blue-700 flex items-center inline-flex"><PlusSquare className="w-3.5 h-3.5 mx-1" /> Add to Home Screen</strong>.
                </div>
              </li>
              <li className="flex items-start space-x-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="bg-blue-600 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[11px]">3</span>
                <div>
                  Tap <strong className="text-blue-700">Add</strong> in the top right corner. App icon will appear on your iPhone!
                </div>
              </li>
            </ol>

            <div className="pt-2 flex space-x-2">
              <button
                onClick={() => setShowIOSInstructions(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-3 rounded-xl text-xs shadow-md transition-colors"
              >
                Got It!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
