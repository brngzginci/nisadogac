
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Star, MapPin, Sparkles, ChevronRight, Volume2, VolumeX, Quote, Camera } from 'lucide-react';

// Uygulama Adımları
enum Step {
  INTRO = 'INTRO',
  GREETING = 'GREETING',
  SENTIMENTAL = 'SENTIMENTAL',
  LOVE_YOU = 'LOVE_YOU',
  COMPLIMENTS = 'COMPLIMENTS',
  CHILDHOOD = 'CHILDHOOD',
  QUESTION_ONE = 'QUESTION_ONE',
  QUESTION_TWO = 'QUESTION_TWO',
  SUCCESS = 'SUCCESS'
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [childhoodIndex, setChildhoodIndex] = useState(0);
  
  // Müzik Dosyaları (Aynı klasörde olmalı)
  const music1 = "music1.mp3"; 
  const music2 = "music2.mp3"; 
  
  const [currentAudioSrc, setCurrentAudioSrc] = useState(music1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const compliments = [
    "Sanki bu dünyanın tüm güzelliği sende toplanmış gibi, o tertemiz kalbin...",
    "Gülünce kısılan ve benim karanlık dünyamı aydınlatan o eşsiz gözlerin...",
    "En soğuk gecelerde bile, kilometrelerce öteden içimi ısıtan o güzel sözlerin...",
    "Aramızdaki yollar ne kadar uzun olursa olsun, her nefesimde yanımda hissettiğim o asil ruhun...",
    "Sesindeki o huzur... Sanki ömrüm boyunca dinlemek istediğim en güzel şarkı gibi...",
    "Sadece yüzün değil, hayallerin ve duruşunla beni büyüleyen o amansız güzelliğin...",
    "Uzaklığın sadece tenimizde olduğunu, kalplerimizin hep yan yana attığını bana her gün kanıtlayan sadakatin...",
    "Yüzündeki o çocuksu neşe ve her düştüğümde beni ayağa kaldıran o güçlü karakterin..."
  ];

  const childhoodPhotos = [
    { src: "childhood1.png", text: "Bak bu o dünyalar tatlısı minik kalp..." },
    { src: "childhood2.png", text: "O zamanlar bile gözlerin geleceğe umutla bakıyormuş..." },
    { src: "childhood3.png", text: "Her yaşın, her anın ayrı bir mucize benim için." },
    { src: "childhood4.png", text: "Bu gülüş hiç değişmesin, hep böyle içimi ısıtsın..." },
    { src: "childhood5.png", text: "Ve şimdi o minik kız, hayatımın anlamı, kalbimin tek sahibi oldu." }
  ];

  const handleStart = () => {
    setAudioStarted(true);
    setCurrentStep(Step.GREETING);
  };

  const nextStep = () => {
    const steps = Object.values(Step);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1] as Step);
    }
  };

  const handleNextCompliment = () => {
    if (complimentIndex < compliments.length - 1) {
      setComplimentIndex(prev => prev + 1);
    } else {
      nextStep();
    }
  };

  const handleNextChildhood = () => {
    if (childhoodIndex < childhoodPhotos.length - 1) {
      setChildhoodIndex(prev => prev + 1);
    } else {
      nextStep();
    }
  };

  useEffect(() => {
    // Müzik değişikliği soru adımında gerçekleşir
    if (currentStep === Step.QUESTION_ONE) {
      setCurrentAudioSrc(music2);
    }
  }, [currentStep]);

  useEffect(() => {
    if (audioStarted && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Müzik çalma hatası:", e));
    }
  }, [audioStarted, currentAudioSrc]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handleNoClick = () => {
    alert("Yanlış cevap! Kalbinin sesini dinle ve tekrar dene... 😊");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-pink-50 to-red-100 font-sans">
      <HeartBackground />
      
      <audio 
        ref={audioRef} 
        src={currentAudioSrc} 
        loop 
        preload="auto"
      />

      {audioStarted && (
        <button 
          onClick={toggleMute}
          className="fixed top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-lg text-red-500 hover:bg-white transition-all"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-lg border border-white/60 rounded-[40px] shadow-2xl p-8 text-center flex flex-col items-center transition-all duration-700 transform min-h-[450px] justify-center">
        
        {currentStep === Step.INTRO && (
          <div className="space-y-8 animate-fadeIn">
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto shadow-red-200 shadow-2xl">
              <Heart fill="white" className="text-white animate-pulse" size={48} />
            </div>
            <h1 className="text-2xl font-semibold text-red-800">Nisa için çok özel bir sürpriz...</h1>
            <button 
              onClick={handleStart}
              className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Kalbine Dokun ❤️
            </button>
          </div>
        )}

        {currentStep === Step.GREETING && (
          <div className="animate-fadeIn">
            <h1 className="text-5xl font-romantic text-red-600 mb-6">Merhaba Nisa 🌹</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Bugün senin için çok özel bir gün olsun istedim... Kalbimden geçenleri duymaya hazır mısın?
            </p>
            <button onClick={nextStep} className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors animate-bounce">
              <ChevronRight size={32} />
            </button>
          </div>
        )}

        {currentStep === Step.SENTIMENTAL && (
          <div className="animate-fadeIn space-y-6">
            <Sparkles className="text-yellow-500 mx-auto" size={32} />
            <p className="text-xl font-medium text-gray-800 leading-relaxed italic">
              "Uzun zamandır düşünüyorum ve hayatımda olmasını isteyeceğim, sonsuza kadar güvenebileceğim, kalbimi tereddütsüz verebileceğim tek kadın sensin..."
            </p>
            <button onClick={nextStep} className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
              <ChevronRight size={32} />
            </button>
          </div>
        )}

        {currentStep === Step.LOVE_YOU && (
          <div className="animate-fadeIn space-y-8">
            <div className="relative">
              <Heart size={120} className="text-red-500/20 absolute -top-4 -left-4 animate-ping" />
              <h2 className="text-6xl font-romantic text-red-600 relative z-10">Seni Çok Seviyorum</h2>
            </div>
            <p className="text-gray-600">Her geçen gün, her kilometrede daha da fazla...</p>
            <button onClick={nextStep} className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
              <ChevronRight size={32} />
            </button>
          </div>
        )}

        {currentStep === Step.COMPLIMENTS && (
          <div key={`comp-${complimentIndex}`} className="animate-slideUp space-y-8 flex flex-col items-center">
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-inner relative">
              <Quote className="text-red-200 absolute -top-4 -left-4" size={40} />
              <p className="text-xl font-medium text-red-800 leading-relaxed">
                {compliments[complimentIndex]}
              </p>
            </div>
            <button 
              onClick={handleNextCompliment} 
              className="px-8 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all flex items-center gap-2 group"
            >
              <span>{complimentIndex === compliments.length - 1 ? "Küçük bir hatıra..." : "Devam et..."}</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {currentStep === Step.CHILDHOOD && (
          <div key={`child-${childhoodIndex}`} className="animate-fadeIn space-y-6 flex flex-col items-center w-full">
            <div className="relative w-64 h-64 group">
               <div className="absolute inset-0 bg-red-200 rounded-[30px] rotate-3 group-hover:rotate-6 transition-transform"></div>
               <img 
                 src={childhoodPhotos[childhoodIndex].src} 
                 alt="Childhood" 
                 className="relative z-10 w-full h-full object-cover rounded-[30px] border-4 border-white shadow-xl"
                 onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/child/400/400' }}
               />
               <Camera className="absolute -top-3 -right-3 z-20 text-red-500 bg-white rounded-full p-1" size={32} />
            </div>
            <p className="text-lg font-medium text-gray-700 italic px-4">
               {childhoodPhotos[childhoodIndex].text}
            </p>
            <button 
              onClick={handleNextChildhood} 
              className="px-8 py-3 bg-red-100 text-red-600 rounded-full shadow-md hover:bg-red-200 transition-all flex items-center gap-2"
            >
              <span>{childhoodIndex === childhoodPhotos.length - 1 ? "Ve bugüne gelelim..." : "Sonraki anı..."}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {currentStep === Step.QUESTION_ONE && (
          <div className="animate-fadeIn space-y-8">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 leading-tight px-2">
              Aramızdaki yolları el ele aşmaya, benimle bu yolu sonuna kadar yürümeye var mısın?
            </h3>
            <div className="grid grid-cols-2 gap-4 w-full px-4">
              <button 
                onClick={nextStep}
                className="py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:bg-green-600 transform active:scale-95 transition-all"
              >
                Evet, Varım! ❤️
              </button>
              <button 
                onClick={handleNoClick}
                className="py-4 bg-gray-200 text-gray-600 font-bold rounded-2xl shadow-md hover:bg-gray-300 transform active:scale-95 transition-all"
              >
                Hayır 🥺
              </button>
            </div>
          </div>
        )}

        {currentStep === Step.QUESTION_TWO && (
          <div className="animate-fadeIn space-y-10">
            <div className="flex justify-center space-x-2">
              <Heart fill="#ef4444" className="text-red-500" size={24} />
              <Heart fill="#ef4444" className="text-red-500" size={24} />
              <Heart fill="#ef4444" className="text-red-500" size={24} />
            </div>
            <h3 className="text-3xl font-romantic font-bold text-red-600 leading-tight">
              O zaman kalbimin tek sahibi... Benimle bir ömür beraber çıkar mısın?
            </h3>
            <div className="grid grid-cols-2 gap-4 w-full px-4">
              <button 
                onClick={nextStep}
                className="py-5 bg-red-500 text-white text-xl font-bold rounded-2xl shadow-lg shadow-red-200 hover:bg-red-600 transform hover:-translate-y-1 active:scale-95 transition-all"
              >
                EVET! ❤️🌹
              </button>
              <button 
                onClick={handleNoClick}
                className="py-5 bg-gray-100 text-gray-400 font-bold rounded-2xl border border-gray-200 transform hover:translate-x-12 opacity-50 transition-all duration-300"
              >
                Hayır
              </button>
            </div>
          </div>
        )}

        {currentStep === Step.SUCCESS && (
          <div className="animate-bounceIn space-y-6">
            <div className="relative inline-block">
              <img 
                src="nisa.png" 
                alt="Nisa" 
                className="w-56 h-56 rounded-full border-8 border-white object-cover shadow-2xl"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/love/400/400' }}
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg">
                <Heart fill="#ef4444" className="text-red-500" size={32} />
              </div>
            </div>
            <h2 className="text-4xl font-romantic text-red-600">Seni Seviyorum Nisa!</h2>
            <p className="text-lg text-gray-700 font-medium">
              Dünyanın en mutlu erkeği yaptın beni. <br/>
              İyi ki varsın, iyi ki benimlesin...
            </p>
            <div className="py-4 px-6 bg-red-50 rounded-2xl border border-red-100 text-red-500 font-semibold animate-pulse">
              Sonsuza dek el ele... ♾️
            </div>
          </div>
        )}

      </div>

      <div className="mt-8 text-red-400/60 text-sm font-medium animate-fadeIn delay-1000">
        Bu site sadece senin için tasarlandı ❤️
      </div>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounceIn { animation: bounceIn 1s cubic-bezier(0.36, 0, 0.66, -0.56) 0.2s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);
  useEffect(() => {
    setHearts(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 20 + 10}px`,
      duration: `${Math.random() * 5 + 5}s`,
      delay: `${Math.random() * 5}s`
    })));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <div key={heart.id} className="heart-particle text-red-300/30" style={{ left: heart.left, fontSize: heart.size, animationDuration: heart.duration, animationDelay: heart.delay }}>
          <Heart fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

export default App;
