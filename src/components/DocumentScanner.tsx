import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  RefreshCw, 
  Check, 
  X, 
  Sparkles, 
  FileText, 
  Video, 
  VideoOff, 
  RotateCw, 
  Sliders, 
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";

interface DocumentScannerProps {
  currentLang: string;
  onScanConfirm: (name: string, size: string, type: string) => void;
}

export const DocumentScanner: React.FC<DocumentScannerProps> = ({ currentLang, onScanConfirm }) => {
  const isRtl = currentLang === "ar";
  
  // Translation labels
  const LABELS: Record<string, Record<string, string>> = {
    ar: {
      btnOpen: "فتح كاميرا المسح الضوئي للمستندات",
      btnClose: "إغلاق كاميرا المسح",
      cameraAccessError: "تعذر تشغيل الكاميرا الفيدرالية. يرجى تفعيل إذن الكاميرا بمتصفحك أو استخدام المحاكي التفاعلي بالأسفل لمسح الأوراق.",
      scannerTitle: "كاميرا المسح الضوئي للمستندات (معالج الأوراق الأوروبي)",
      scannerDesc: "وجه كاميرا جهازك المحمول أو الحاسوب بثبات لتصوير الأوراق الأكاديمية أو البطاقات الثبوتية ومسحها ضوئياً بدقة فائقة.",
      scanTargetId: "بطاقة الهوية والوثائق الشخصية / جواز السفر",
      scanTargetCert: "الشهادة الدراسية السابقة والمؤهل العلمي",
      shutter: "التقاط الوثيقة ضوئياً",
      retake: "إعادة التقاط الصورة",
      confirm: "تأكيد واستخدام المستند الممسوح",
      activeStream: "البث الحي للكاميرا نشط",
      simulatedNotice: "وضع المحاكاة الأكاديمي نشط (محاكي الفحص الضوئي عالي الجودة)",
      filterOriginal: "الأصل الملون",
      filterDocEnhance: "تحسين النص الفائق",
      filterGrayscale: "رمادي عالي التباين",
      frameGuide: "اضبط حدود المستند أو البطاقة داخل مربع التوجيه",
      successAdded: "تم إرفاق المستند الممسوح بالطلب بنجاح!",
      selectScanDocType: "اختر نوع المستند المراد تصويره ومسحه:",
      simBtnId: "💡 محاكاة مسح بطاقة الهوية الذكية",
      simBtnCert: "💼 محاكاة مسح شهادة التخرج",
      uploading: "جاري تشفير ورفع المستند...",
      batchMode: "وضع المسح المتعدد (Batch Scan)",
      addPage: "إضافة كصفحة جديدة للدفعة",
      pagesScanned: "الصفحات الممسوحة بالدفعة الحالية: ",
      uploadBatch: "تأكيد ورفع كشف الدرجات بالكامل (الدفعة والمستندات)",
      clearBatch: "تفريغ الدفعة الحالية",
      batchTitle: "دفعة الأوراق النشطة",
      batchTip: "يمكنك تصوير أكثر من صفحة ورفعها كملف كشف درجات موحد ومسلسل."
    },
    en: {
      btnOpen: "Launch Live Document Camera Scanner",
      btnClose: "Close Scanner",
      cameraAccessError: "Could not access video media. Please check frame permissions or use the interactive Simulator fallback below.",
      scannerTitle: "AI Document Camera Scanner & Enhancer",
      scannerDesc: "Hold your physical ID card or graduation certificate within the overlay borders. Clear lighting provides best results.",
      scanTargetId: "Identity Document (Passport / National ID Card)",
      scanTargetCert: "Academic Certification or Prior Transcript",
      shutter: "Capture & Scan Document",
      retake: "Retake Photo",
      confirm: "Confirm & Attach Scan to File",
      activeStream: "Live Camera Stream Connected",
      simulatedNotice: "Sandbox Sim Active: Generating high-definition virtual scans",
      filterOriginal: "Color Original",
      filterDocEnhance: "B&W Text Contrast",
      filterGrayscale: "Enhanced Grayscale",
      frameGuide: "Align document borders within the guiding guidelines box",
      successAdded: "Scanned document successfully attached is complete!",
      selectScanDocType: "Select document target form class:",
      simBtnId: "💡 Simulate High-Res ID Scan",
      simBtnCert: "💼 Simulate High-Res Degree Scan",
      uploading: "Encrypting & uploading document...",
      batchMode: "Batch Multi-Page Mode",
      addPage: "Add Page to Batch",
      pagesScanned: "Scanned pages in current batch: ",
      uploadBatch: "Confirm & Upload Multi-Page Batch",
      clearBatch: "Clear Current Batch",
      batchTitle: "Current Scan Batch",
      batchTip: "You can scan multiple pages under one transcript session to compile them into a multi-page series."
    }
  };

  const t = LABELS[currentLang] || LABELS["en"];

  // Scanner UI States
  const [isOpen, setIsOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<"id_card" | "certificate">("id_card");
  const [selectedFilter, setSelectedFilter] = useState<"original" | "doc_enhance" | "grayscale">("original");
  const [shutterFlash, setShutterFlash] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFileInfo, setUploadFileInfo] = useState<{ name: string; size: string } | null>(null);
  const [scannedPages, setScannedPages] = useState<{ url: string; type: "id_card" | "certificate" }[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uploadIntervalRef = useRef<any>(null);

  // Stop camera tracks helper
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Start Camera Function
  const startCamera = async (mode: "user" | "environment") => {
    stopCamera();
    setCapturedImage(null);
    setSuccessMsg("");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => console.log("Video play failed:", err));
      }
      setHasCameraAccess(true);
    } catch (err) {
      console.warn("Camera streaming turned down or not permitted:", err);
      setHasCameraAccess(false);
    }
  };

  // Toggle open
  const toggleScanner = () => {
    if (isOpen) {
      stopCamera();
      setIsOpen(false);
    } else {
      setIsOpen(true);
      startCamera(facingMode);
    }
  };

  // Toggle Camera direction
  const switchCameraDirection = () => {
    const nextMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Trigger Flash and Snapshot Capture
  const handleCaptureSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      // Shutter flashing effect
      setShutterFlash(true);
      setTimeout(() => setShutterFlash(false), 200);

      const videoEl = videoRef.current;
      const canvasEl = canvasRef.current;
      const ctx = canvasEl.getContext("2d");

      if (ctx) {
        // Set canvas dimensions equal to the video feed size
        canvasEl.width = videoEl.videoWidth || 640;
        canvasEl.height = videoEl.videoHeight || 480;

        // Apply selected filter to canvas context draw if using custom effects
        ctx.filter = "none";
        if (selectedFilter === "grayscale") {
          ctx.filter = "grayscale(100%) contrast(120%)";
        } else if (selectedFilter === "doc_enhance") {
          ctx.filter = "contrast(180%) brightness(110%) Grayscale(100%)";
        }

        // Draw the current video frame onto canvas
        ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);

        // Retrieve data URL source
        const imgUrl = canvasEl.toDataURL("image/jpeg", 0.9);
        setCapturedImage(imgUrl);
      }
    }
  };

  // Simulated Scanning Engine Fallback (Sandbox sandbox actions!)
  const handleSimulateScan = (docType: "id_card" | "certificate") => {
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 200);

    // Mock elegant simulated high contrast scanned records 
    const mockImageURL = docType === "id_card"
      ? "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80" // High Quality Card template representation
      : "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80"; // Academic degree cert template representation
    
    setTimeout(() => {
      setCapturedImage(mockImageURL);
      setSelectedDocType(docType);
    }, 250);
  };

  // Confirm image scan addition
  const handleConfirmScan = () => {
    if (capturedImage && !isUploading) {
      const parsedType = selectedDocType === "id_card" ? "Passport_ID_Scan.png" : "Degree_Certificate_Scan.png";
      const randomSize = `${(Math.random() * (1.8 - 0.7) + 0.7).toFixed(2)} MB`;
      
      setUploadFileInfo({ name: parsedType, size: randomSize });
      setIsUploading(true);
      setUploadProgress(0);

      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
      
      let currentProgress = 0;
      uploadIntervalRef.current = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 12) + 6;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(uploadIntervalRef.current);
          
          setTimeout(() => {
            // Call parent dispatch attachment
            onScanConfirm(parsedType, randomSize, "image/png");
            setSuccessMsg(t.successAdded);
            setIsUploading(false);
            setUploadProgress(0);
            setUploadFileInfo(null);
            
            setTimeout(() => {
              setSuccessMsg("");
              setCapturedImage(null);
              toggleScanner();
            }, 1000);
          }, 350);
        }
        setUploadProgress(Math.min(currentProgress, 100));
      }, 100);
    }
  };

  // Batch scanning support helpers
  const handleAddPageToBatch = () => {
    if (capturedImage) {
      setScannedPages(prev => [...prev, { url: capturedImage, type: selectedDocType }]);
      setCapturedImage(null); // Clear preview to scan next page
      if (hasCameraAccess) {
        startCamera(facingMode);
      }
    }
  };

  const handleRemovePageFromBatch = (index: number) => {
    setScannedPages(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleClearBatch = () => {
    setScannedPages([]);
  };

  const handleConfirmBatch = () => {
    if (scannedPages.length > 0 && !isUploading) {
      const parsedType = selectedDocType === "id_card" 
        ? `ID_Documents_Batch_${scannedPages.length}_Pages.pdf` 
        : `Academic_Transcript_Batch_${scannedPages.length}_Pages.pdf`;
      const randomSize = `${(scannedPages.length * (Math.random() * (1.1 - 0.5) + 0.5)).toFixed(2)} MB`;
      
      setUploadFileInfo({ name: parsedType, size: randomSize });
      setIsUploading(true);
      setUploadProgress(0);

      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
      
      let currentProgress = 0;
      uploadIntervalRef.current = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 12) + 6;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(uploadIntervalRef.current);
          
          setTimeout(() => {
            // Call parent dispatch attachment
            onScanConfirm(parsedType, randomSize, "application/pdf");
            setSuccessMsg(t.successAdded);
            setIsUploading(false);
            setUploadProgress(0);
            setUploadFileInfo(null);
            setScannedPages([]); // Reset batch scans
            
            setTimeout(() => {
              setSuccessMsg("");
              setCapturedImage(null);
              toggleScanner();
            }, 1000);
          }, 350);
        }
        setUploadProgress(Math.min(currentProgress, 100));
      }, 100);
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      stopCamera();
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    };
  }, [isOpen]);

  return (
    <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
      
      {/* Outer Open-Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h5 className="text-xs font-black text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-450" />
            <span>{t.scannerTitle}</span>
          </h5>
          <p className="text-[10px] text-slate-450 mt-1 font-semibold leading-relaxed max-w-md">
            {t.scannerDesc}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleScanner}
          className={`w-full sm:w-auto px-4.5 py-2.5 rounded-xl text-[11px] font-black cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
            isOpen ? "bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30" : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/10"
          }`}
        >
          {isOpen ? <VideoOff className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
          <span>{isOpen ? t.btnClose : t.btnOpen}</span>
        </button>
      </div>

      {/* Main Expander Scanner Sandbox Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden border border-slate-800 rounded-xl bg-slate-950 p-4 space-y-4"
          >
            {/* Shutter Camera Flash light animation indicator */}
            {shutterFlash && (
              <div className="absolute inset-x-0 top-0 bottom-0 bg-white z-50 pointer-events-none animate-ping"></div>
            )}

            {/* Document scanning type selection banner */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-850 pb-3 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <span className="text-[10px] text-slate-400 font-bold block">
                {t.selectScanDocType}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDocType("id_card")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition cursor-pointer ${selectedDocType === "id_card" ? 'bg-primary text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {t.scanTargetId}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDocType("certificate")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition cursor-pointer ${selectedDocType === "certificate" ? 'bg-primary text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {t.scanTargetCert}
                </button>
              </div>
            </div>

            {/* Two Column Layout: Feed Stage/Controls & Sandbox Simulators */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Left stage (8/12): Live feed screen view */}
              <div className="md:col-span-8 relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800/80 group min-h-[280px] flex flex-col justify-between p-3">
                
                {/* 1. Status Tag badges */}
                <div className="flex justify-between items-center z-10 p-0.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold ${hasCameraAccess ? 'bg-emerald-500/25 text-emerald-400' : 'bg-amber-500/20 text-amber-500'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    <span>{hasCameraAccess ? t.activeStream : t.simulatedNotice}</span>
                  </span>

                  {hasCameraAccess && (
                    <button
                      type="button"
                      onClick={switchCameraDirection}
                      className="p-1 px-2 bg-slate-950 text-slate-300 hover:text-white text-[9px] rounded-lg font-bold border border-slate-800 hover:border-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3 text-emerald-400" />
                      <span>{facingMode === "user" ? "Front" : "Back/Env"}</span>
                    </button>
                  )}
                </div>

                {/* 2. Primary Media viewer frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  
                  {/* Real Camera markup rendering */}
                  {hasCameraAccess && !capturedImage && (
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Captured Static Preview markup */}
                  {capturedImage && (
                    <div className="w-full h-full relative bg-slate-900 flex items-center justify-center pointer-events-auto">
                      <img
                        src={capturedImage}
                        alt="Captured scanned doc"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Visual Upload Progress Overlay on image */}
                      {isUploading && (
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-30 pointer-events-auto">
                          <div className="relative flex items-center justify-center mb-4">
                            {/* Animated scanning/uploading circles */}
                            <div className="absolute w-16 h-16 rounded-full border-2 border-emerald-500/20 animate-ping"></div>
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                              <RefreshCw className="w-6 h-6 animate-spin" />
                            </div>
                          </div>

                          <span className="text-white font-extrabold text-xs tracking-wide block uppercase mb-1 text-center">
                            {t.uploading}
                          </span>
                          
                          {uploadFileInfo && (
                            <span className="text-[10px] font-mono text-slate-400 block mb-3 text-center">
                              {uploadFileInfo.name} ({uploadFileInfo.size})
                            </span>
                          )}

                          <div className="w-full max-w-[240px] bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/50 mb-2">
                            <motion.div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-450 h-full rounded-full"
                              style={{ width: `${uploadProgress}%` }}
                              initial={{ width: "0%" }}
                              animate={{ width: `${uploadProgress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>

                          <div className="flex items-center gap-2.5 text-[10px] font-mono text-emerald-400 justify-center">
                            <span className="font-bold">{uploadProgress}%</span>
                            <span className="text-slate-600">|</span>
                            <span>
                              {uploadFileInfo && (
                                <>
                                  {(parseFloat(uploadFileInfo.size) * uploadProgress / 100).toFixed(2)} MB / {uploadFileInfo.size}
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                     {/* Live document overlay positioning target box */}
                  {!capturedImage && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-[85%] h-[65%] border-2 border-dashed border-emerald-400/40 rounded-xl relative">
                        {/* Target border corner brackets */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 -mt-0.5 -ml-0.5 rounded-lt-md"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 -mt-0.5 -mr-0.5 rounded-rt-md"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 -mb-0.5 -ml-0.5 rounded-lb-md"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 -mb-0.5 -mr-0.5 rounded-rb-md"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/2 flex-col">
                          <span className="text-[8px] tracking-widest text-[#a7f3d0] font-black uppercase text-center px-2 bg-slate-950/70 p-1.5 rounded-md">
                            {t.frameGuide}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Dummy placeholder buffer to enforce responsive height ratio dimensions */}
                <div className="h-44 pointer-events-none"></div>

                {/* 3. Action controls footer over the video */}
                <div className="w-full flex justify-between items-center z-10 pt-2 bg-gradient-to-t from-slate-950 to-transparent p-2 rounded-b-xl">
                  {!capturedImage ? (
                    <div className="w-full flex justify-center">
                      <button
                        type="button"
                        onClick={hasCameraAccess ? handleCaptureSnapshot : () => handleSimulateScan(selectedDocType)}
                        className="py-2.5 px-6 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer selection-none"
                      >
                        <Camera className="w-4 h-4" />
                        <span>{t.shutter}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full flex justify-between items-center gap-2">
                      {isUploading ? (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 shadow-inner">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 text-emerald-450 animate-spin" />
                            <span className="text-[10px] font-bold text-slate-350">
                              {t.uploading} ({uploadProgress}%)
                            </span>
                          </div>
                          <div className="flex-grow max-w-xs w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
                            <div 
                              className="bg-emerald-500 h-full rounded-full transition-all duration-150"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setCapturedImage(null);
                              if (hasCameraAccess) startCamera(facingMode);
                            }}
                            className="p-2 px-3 rounded-lg text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                          >
                            {t.retake}
                          </button>
 
                          {/* Display filters available on captured images */}
                          <div className="flex gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-[9px] font-bold max-w-xs overflow-x-auto">
                            <button
                              type="button"
                              onClick={() => setSelectedFilter("original")}
                              className={`px-2 py-1 rounded transition ${selectedFilter === "original" ? 'bg-primary text-white' : 'text-slate-400'}`}
                            >
                              {t.filterOriginal}
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedFilter("doc_enhance")}
                              className={`px-2 py-1 rounded transition ${selectedFilter === "doc_enhance" ? 'bg-primary text-white' : 'text-slate-400'}`}
                            >
                              {t.filterDocEnhance}
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedFilter("grayscale")}
                              className={`px-2 py-1 rounded transition ${selectedFilter === "grayscale" ? 'bg-primary text-white' : 'text-slate-400'}`}
                            >
                              {t.filterGrayscale}
                            </button>
                          </div>
 
                          <button
                            type="button"
                            onClick={handleAddPageToBatch}
                            className="p-2 px-3 rounded-lg text-[10px] font-black bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                            <span>{t.addPage}</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleConfirmScan}
                            className="p-2 px-4 rounded-lg text-[10px] font-black bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.confirm}</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Right panel (4/12): Document scanner sandbox triggers & quick help info */}
              <div className="md:col-span-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-4 text-start">
                <div>
                  <h6 className="text-[11px] font-black text-slate-350 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-450" />
                    <span>{currentLang === "ar" ? "أكاديمية التدقيق المزدوج" : "Evaluation Standards"}</span>
                  </h6>
                  <p className="text-[9px] text-slate-450 mt-1 leading-relaxed">
                    {currentLang === "ar" 
                      ? "تقوم أنظمة الذكاء الاصطناعي الأكاديمية بالتحقق الأولي من دقة الأوراق والمسح الضوئي لتلافي أخطاء عدم تطابق الأسماء والبيانات الرسمية." 
                      : "Automatic pre-checks analyze visual resolution margins, ensuring matching legal names before human audit validation."}
                  </p>
                </div>

                {/* Active Batch List Panel */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-350 font-extrabold uppercase tracking-wider block">
                      📁 {t.batchTitle} ({scannedPages.length})
                    </span>
                    {scannedPages.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearBatch}
                        className="text-[9px] font-bold text-red-500 hover:text-red-400 underline cursor-pointer"
                      >
                        {t.clearBatch}
                      </button>
                    )}
                  </div>

                  {scannedPages.length === 0 ? (
                    <p className="text-[9px] text-slate-500 italic leading-normal">
                      {t.batchTip}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-1.5 max-h-[140px] overflow-y-auto p-1.5 bg-slate-900/50 rounded-lg border border-slate-800">
                        {scannedPages.map((page, idx) => (
                          <div key={idx} className="relative group/page aspect-[3/4] bg-slate-950 px-0.5 rounded-md overflow-hidden border border-slate-800 flex items-center justify-center">
                            <img 
                              src={page.url} 
                              alt={`Page ${idx + 1}`} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                            {/* Page counter tag */}
                            <span className="absolute bottom-1 right-1 bg-slate-950/80 text-[8px] text-emerald-400 font-extrabold px-1 rounded">
                              P.{idx + 1}
                            </span>
                            {/* Trash icon */}
                            <button
                              type="button"
                              onClick={() => handleRemovePageFromBatch(idx)}
                              className="absolute top-1 right-1 bg-red-650/90 text-white hover:bg-red-500 rounded p-0.5 text-[8px] transition cursor-pointer"
                              title="Delete Page"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleConfirmBatch}
                        className="w-full py-2 px-3 rounded-lg text-[10px] font-black bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                      >
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>{t.uploadBatch}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2">
                  <span className="text-[9px] text-slate-500 font-extrabold uppercase block tracking-wider">
                    {currentLang === "ar" ? "محاكي المسح للتجربة السريعة" : "Alternative Document Injectors"}
                  </span>
                  
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSimulateScan("id_card")}
                      className="w-full text-left p-2.5 bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-300 hover:text-white rounded-lg text-[10px] items-center gap-2 font-bold cursor-pointer transition flex"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t.simBtnId}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleSimulateScan("certificate")}
                      className="w-full text-left p-2.5 bg-slate-900 border border-slate-800 hover:border-primary/50 text-slate-300 hover:text-white rounded-lg text-[10px] items-center gap-2 font-bold cursor-pointer transition flex"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-505" />
                      <span>{t.simBtnCert}</span>
                    </button>
                  </div>
                </div>

                {successMsg && (
                  <div className="p-3 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-lg text-[10px] font-black text-center animate-bounce">
                    ✓ {successMsg}
                  </div>
                )}
              </div>

            </div>

            {/* Hidden canvas for video framing conversions */}
            <canvas ref={canvasRef} className="hidden" />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
