import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, X, Camera, Upload, CheckCircle, AlertCircle } from "lucide-react";

interface QRCodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeScanner = ({ isOpen, onClose }: QRCodeScannerProps) => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    setError(null);
    
    try {
      // Simulate QR code scanning
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate scan result
      const mockResults = [
        "https://beechir-chaieb.com/course/react-advanced",
        "https://beechir-chaieb.com/course/ai-fundamentals",
        "https://beechir-chaieb.com/course/python-masterclass",
        "DISCOUNT_CODE_2024_SPECIAL",
        "STUDENT_ID_BC2024_001"
      ];
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanResult(result);
    } catch (err) {
      setError("Erreur lors du scan. Veuillez réessayer.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      setError(null);
      
      // Simulate file processing
      setTimeout(() => {
        setScanResult("https://beechir-chaieb.com/course/uploaded-qr-content");
        setIsScanning(false);
      }, 1500);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 60%, hsl(var(--primary)/0.1) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-md"
          >
            <Card className="shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute right-0 top-0"
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <motion.div
                  animate={{ 
                    rotate: isScanning ? 360 : 0,
                    scale: scanResult ? 1.2 : 1 
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: isScanning ? Infinity : 0 },
                    scale: { duration: 0.3 }
                  }}
                  className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center"
                >
                  {scanResult ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : error ? (
                    <AlertCircle className="w-8 h-8 text-white" />
                  ) : (
                    <QrCode className="w-8 h-8 text-white" />
                  )}
                </motion.div>
                
                <CardTitle className="text-xl font-bold">
                  {scanResult ? "QR Code scanné !" : "Scanner QR Code"}
                </CardTitle>
                <CardDescription>
                  {scanResult 
                    ? "Contenu détecté avec succès" 
                    : "Scannez un QR code pour accéder au contenu"
                  }
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {!scanResult && !error ? (
                    <motion.div
                      key="scanner"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {/* Camera Scanning Area */}
                      <div className="relative">
                        <div className="aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                          {isScanning ? (
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-center"
                            >
                              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Scan en cours...</p>
                            </motion.div>
                          ) : (
                            <div className="text-center">
                              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Zone de scan</p>
                            </div>
                          )}
                        </div>
                        
                        {/* Scanning corners animation */}
                        {isScanning && (
                          <>
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-6 h-6 border-2 border-primary"
                                style={{
                                  top: i < 2 ? "10px" : "auto",
                                  bottom: i >= 2 ? "10px" : "auto",
                                  left: i % 2 === 0 ? "10px" : "auto",
                                  right: i % 2 === 1 ? "10px" : "auto",
                                  borderTop: i < 2 ? "2px solid hsl(var(--primary))" : "none",
                                  borderBottom: i >= 2 ? "2px solid hsl(var(--primary))" : "none",
                                  borderLeft: i % 2 === 0 ? "2px solid hsl(var(--primary))" : "none",
                                  borderRight: i % 2 === 1 ? "2px solid hsl(var(--primary))" : "none",
                                }}
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={handleScan}
                          disabled={isScanning}
                          className="relative overflow-hidden"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Scanner
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </Button>
                        
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Button variant="outline" className="w-full">
                            <Upload className="w-4 h-4 mr-2" />
                            Importer
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ) : scanResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <h4 className="font-medium text-success mb-2">Contenu détecté :</h4>
                        <p className="text-sm text-foreground bg-background rounded p-2 break-all">
                          {scanResult}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={() => window.open(scanResult, '_blank')}
                          disabled={!scanResult.startsWith('http')}
                        >
                          Ouvrir
                        </Button>
                        <Button variant="outline" onClick={resetScanner}>
                          Nouveau scan
                        </Button>
                      </div>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                        <p className="text-sm text-destructive">{error}</p>
                      </div>
                      
                      <Button variant="outline" onClick={resetScanner} className="w-full">
                        Réessayer
                      </Button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRCodeScanner;