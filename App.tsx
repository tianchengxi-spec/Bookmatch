import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppStage, Book, MatchResult } from './types';
import { BOOKS, USER_TAGS } from './data';
import { TagSelector } from './components/TagSelector';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Heart, X, BookOpen, MapPin, RefreshCw, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.ONBOARDING);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [bookIndex, setBookIndex] = useState(0);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const activeBooks = useMemo(() => BOOKS, []); 

  // 1. Handle Tag Selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  // 2. Handle Swipe
  const handleSwipe = (direction: 'left' | 'right') => {
    const book = activeBooks[bookIndex];
    setCurrentBook(book);

    if (direction === 'left') {
      // Reject: Move to next book
      setTimeout(() => {
        if (bookIndex < activeBooks.length - 1) {
          setBookIndex(prev => prev + 1);
        } else {
          // End of stack
          setBookIndex(0); // Loop for demo purposes
        }
      }, 200);
    } else {
      // Accept: Start Matching Process
      setStage(AppStage.MATCHING);
      processMatch(book);
    }
  };

  // 3. Process Match Logic
  const processMatch = (book: Book) => {
    // Calculate tag intersection
    const intersection = book.tags.filter(tag => selectedTags.includes(tag));
    const score = intersection.length;

    // Simulate "waiting for book response"
    setTimeout(() => {
      if (score >= book.matchThreshold) {
        // High Match -> Instant Success
        setMatchResult({ success: true, book });
        setStage(AppStage.RESULT);
      } else {
        // Low Match -> Quiz (Deep Dive)
        setStage(AppStage.QUIZ);
      }
    }, 2000);
  };

  // 4. Quiz Handler
  const handleQuizAnswer = (isCorrect: boolean) => {
    // Wait a beat for effect
    setTimeout(() => {
      if (isCorrect) {
        setMatchResult({ success: true, book: currentBook });
      } else {
        setMatchResult({ 
          success: false, 
          book: currentBook, 
          reason: "It seems we're on different pages, but maybe opposites attract?" 
        });
      }
      setStage(AppStage.RESULT);
    }, 500);
  };

  // Reset
  const resetApp = () => {
    setStage(AppStage.ONBOARDING);
    setSelectedTags([]);
    setBookIndex(0);
    setMatchResult(null);
    setCurrentBook(null);
  };
  
  const continueSwiping = () => {
    setStage(AppStage.SWIPING);
    setMatchResult(null);
    setCurrentBook(null);
    if (bookIndex < activeBooks.length - 1) {
        setBookIndex(prev => prev + 1);
    } else {
        setBookIndex(0);
    }
  };

  // --- RENDERERS ---

  const renderOnboarding = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto px-6 py-12 flex flex-col h-full justify-center"
    >
      <div className="text-center mb-10">
        <div className="inline-block p-3 bg-rose-100 rounded-full text-rose-500 mb-4">
            <BookOpen size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 serif">Who are you, reader?</h1>
        <p className="text-lg text-gray-600">Select up to 5 tags that describe your literary soul.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {USER_TAGS.map(tag => (
          <TagSelector 
            key={tag} 
            tag={tag} 
            selected={selectedTags.includes(tag)} 
            onClick={() => toggleTag(tag)} 
          />
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={() => setStage(AppStage.SWIPING)} 
          disabled={selectedTags.length === 0}
          className="min-w-[200px]"
        >
          Start Discovering
        </Button>
      </div>
    </motion.div>
  );

  const renderSwiping = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden px-4"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 bg-gradient-to-b from-white/80 to-transparent">
        <div className="flex gap-2">
            {selectedTags.slice(0, 3).map(t => (
                <span key={t} className="text-xs bg-white/80 backdrop-blur border px-2 py-1 rounded-full text-gray-600">{t}</span>
            ))}
            {selectedTags.length > 3 && <span className="text-xs bg-white/80 px-2 py-1 rounded-full text-gray-600">+{selectedTags.length - 3}</span>}
        </div>
        <button onClick={resetApp} className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-gray-900">
            <RefreshCw size={20} />
        </button>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md aspect-[3/4] md:aspect-[2/3]">
        {activeBooks.length > bookIndex + 1 && (
             <Card 
                key={activeBooks[bookIndex + 1].id}
                book={activeBooks[bookIndex + 1]}
                onSwipe={() => {}}
                frontCard={false}
             />
        )}
        <Card 
            key={activeBooks[bookIndex].id}
            book={activeBooks[bookIndex]}
            onSwipe={handleSwipe}
            frontCard={true}
        />
      </div>

      {/* Instructions */}
      <div className="mt-8 flex gap-8 items-center text-gray-400 text-sm font-medium uppercase tracking-widest">
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-red-200 flex items-center justify-center text-red-300">
                <X size={20} />
            </div>
            <span>Pass</span>
        </div>
        <div className="flex items-center gap-2">
             <span>Like</span>
            <div className="w-10 h-10 rounded-full border-2 border-green-200 flex items-center justify-center text-green-300">
                <Heart size={20} />
            </div>
        </div>
      </div>
    </motion.div>
  );

  const renderMatching = () => (
    <div className="flex flex-col items-center justify-center h-full">
        <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
        >
            <div className="w-32 h-48 bg-gray-200 rounded-lg shadow-2xl overflow-hidden">
                 <img src={currentBook?.coverUrl} className="w-full h-full object-cover blur-sm opacity-50" alt="" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </motion.div>
        <h2 className="mt-8 text-2xl font-bold text-gray-800 serif">Waiting for response...</h2>
        <p className="text-gray-500 mt-2">The book is checking your compatibility.</p>
    </div>
  );

  const renderQuiz = () => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto px-6 py-12 flex flex-col h-full justify-center"
    >
        <div className="flex items-center gap-4 mb-8">
             <div className="w-16 h-24 rounded-md overflow-hidden shadow-md flex-shrink-0">
                <img src={currentBook?.coverUrl} alt="" className="w-full h-full object-cover" />
             </div>
             <div className="bg-gray-100 p-4 rounded-r-xl rounded-bl-xl relative">
                <div className="absolute -left-2 top-4 w-4 h-4 bg-gray-100 transform rotate-45"></div>
                <p className="text-sm font-semibold text-rose-500 mb-1">The book asks:</p>
                <p className="text-gray-800 font-medium italic">"{currentBook?.quiz.text}"</p>
             </div>
        </div>

        <div className="space-y-3">
            {currentBook?.quiz.options.map((option, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleQuizAnswer(option.isCorrect)}
                    className="w-full p-4 text-left bg-white border border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 hover:shadow-md transition-all duration-200 group"
                >
                    <span className="inline-block w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-rose-500 mr-3 text-center leading-5 text-transparent group-hover:text-rose-500 text-xs">
                        ●
                    </span>
                    <span className="text-gray-700 group-hover:text-gray-900">{option.text}</span>
                </button>
            ))}
        </div>
    </motion.div>
  );

  const renderResult = () => {
    if (!matchResult) return null;
    const isSuccess = matchResult.success;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full px-6 text-center max-w-md mx-auto"
      >
        {isSuccess ? (
             <div className="mb-6 relative">
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-10"
                >
                    <Heart fill="white" size={24} />
                </motion.div>
                <img src={matchResult.book?.coverUrl} alt="Cover" className="w-48 h-72 object-cover rounded-xl shadow-2xl" />
             </div>
        ) : (
            <div className="mb-6 relative grayscale">
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="absolute -top-4 -right-4 bg-gray-500 text-white p-3 rounded-full shadow-lg z-10"
                >
                    <MessageCircle size={24} />
                </motion.div>
                <img src={matchResult.book?.coverUrl} alt="Cover" className="w-48 h-72 object-cover rounded-xl shadow-2xl" />
            </div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold mb-2 serif">
            {isSuccess ? "It's a Match!" : "Not quite a soulmate..."}
        </h2>
        
        <p className="text-gray-600 mb-8">
            {isSuccess 
                ? "Your literary souls are aligned. This book is waiting for you." 
                : matchResult.reason || "But every book deserves a chance to be read."}
        </p>

        <div className="bg-gray-50 w-full p-6 rounded-2xl border border-gray-200 mb-8">
            <div className="flex items-center justify-center gap-2 text-rose-600 font-bold uppercase tracking-wider mb-2">
                <MapPin size={18} />
                <span>Find it here</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{matchResult.book?.shelfLocation}</p>
        </div>

        <div className="flex gap-4 w-full">
            <Button variant="outline" fullWidth onClick={continueSwiping}>Keep Looking</Button>
        </div>

      </motion.div>
    );
  };

  // --- MAIN LAYOUT ---

  // Background image blur logic
  const bgImage = useMemo(() => {
    if (stage === AppStage.ONBOARDING) return '';
    if (stage === AppStage.RESULT) return matchResult?.book?.coverUrl || '';
    return currentBook?.coverUrl || activeBooks[bookIndex]?.coverUrl || '';
  }, [stage, currentBook, matchResult, activeBooks, bookIndex]);

  return (
    <div className="relative h-screen w-full bg-white overflow-hidden flex items-center justify-center">
        {/* Dynamic Background */}
        <AnimatePresence mode='wait'>
            {stage !== AppStage.ONBOARDING && (
                <motion.div 
                    key="bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-0 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/80 z-10 backdrop-blur-3xl"></div>
                    <img src={bgImage} alt="" className="w-full h-full object-cover opacity-40 scale-110" />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Main Content Area - iPad Aspect Ratio Safe Zone */}
        <div className="relative z-10 w-full h-full md:h-[90vh] md:w-[85vw] md:max-w-4xl bg-white/50 md:bg-white/90 md:backdrop-blur-sm md:rounded-[3rem] md:shadow-2xl md:border border-white/50 overflow-hidden shadow-black/5">
            <AnimatePresence mode='wait'>
                {stage === AppStage.ONBOARDING && <motion.div key="onboarding" className="h-full w-full">{renderOnboarding()}</motion.div>}
                {stage === AppStage.SWIPING && <motion.div key="swiping" className="h-full w-full">{renderSwiping()}</motion.div>}
                {stage === AppStage.MATCHING && <motion.div key="matching" className="h-full w-full">{renderMatching()}</motion.div>}
                {stage === AppStage.QUIZ && <motion.div key="quiz" className="h-full w-full">{renderQuiz()}</motion.div>}
                {stage === AppStage.RESULT && <motion.div key="result" className="h-full w-full">{renderResult()}</motion.div>}
            </AnimatePresence>
        </div>
    </div>
  );
};

export default App;