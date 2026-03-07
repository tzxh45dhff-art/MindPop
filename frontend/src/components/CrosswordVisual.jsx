const CrosswordVisual = () => {
    // A simple grid to represent a crossword puzzle
    // S T U D Y
    //   L
    //   E
    //   A
    //   R
    //   N

    const Cell = ({ letter, active = false, extraClass = "" }) => (
        <div className={`
      w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
      text-2xl sm:text-3xl font-bold rounded-lg shadow-sm border-2 
      ${active ? 'bg-brand-accent text-white border-brand-accent shadow-brand-accent/30' : 'bg-white text-brand-dark border-gray-200'}
      transform transition-transform hover:scale-105 duration-200 cursor-default
      ${extraClass}
    `}>
            {letter}
        </div>
    );

    return (
        <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Decorative background blob */}
            <div className="absolute w-72 h-72 bg-yellow-200/50 rounded-full blur-3xl -z-10 mix-blend-multiply top-1/4 right-1/4 animate-pulse"></div>
            <div className="absolute w-64 h-64 bg-pink-200/50 rounded-full blur-3xl -z-10 mix-blend-multiply bottom-1/4 left-1/4 animation-delay-2000"></div>

            <div className="relative">
                {/* Horizontal word: STUDY */}
                <div className="flex gap-2 mb-2 relative z-10">
                    <Cell letter="S" />
                    <Cell letter="T" active />
                    <Cell letter="U" />
                    <Cell letter="D" />
                    <Cell letter="Y" />
                </div>

                {/* Vertical word extending from T: LEARN */}
                <div className="flex flex-col gap-2 ml-[56px] sm:ml-[72px] relative z-0 -mt-2">
                    {/* Skip the 'T' as it's part of STUDY */}
                    <Cell letter="L" extraClass="mt-2" />
                    <Cell letter="E" />
                    <Cell letter="A" />
                    <Cell letter="R" />
                    <Cell letter="N" active />
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-12 -right-8 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
                <div className="absolute bottom-8 -left-12 text-3xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>💡</div>
                <div className="absolute -bottom-16 right-12 text-4xl rotate-12 transition-transform hover:rotate-45 duration-300">🎯</div>
            </div>
        </div>
    );
};

export default CrosswordVisual;
