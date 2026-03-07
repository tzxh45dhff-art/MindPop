const Welcome = () => {
  return (
    <div className="flex h-screen w-full font-display bg-[#F1F0DE] overflow-hidden">
      {/* Left Panel */}
      <div className="relative flex-1 flex flex-col justify-center items-center z-10 w-1/2">
        {/* Background Icons (Left) - Increased Density */}
        <span className="material-symbols-outlined absolute top-[5%] left-[10%] text-5xl text-[#E3E1C5]/80 rotate-12 select-none">edit</span>
        <span className="material-symbols-outlined absolute top-[10%] left-[5%] text-6xl text-[#E3E1C5]/90 -rotate-12 select-none">menu_book</span>
        <span className="material-symbols-outlined absolute top-[25%] left-[25%] text-4xl text-[#E3E1C5]/60 rotate-45 select-none">science</span>
        <span className="material-symbols-outlined absolute top-[15%] left-[45%] text-5xl text-[#E3E1C5]/70 -rotate-45 select-none">lightbulb</span>
        
        <span className="material-symbols-outlined absolute top-[38%] left-[20%] text-5xl text-[#E3E1C5]/80 rotate-12 select-none">science</span>
        <span className="material-symbols-outlined absolute top-[30%] right-[10%] text-6xl text-[#E3E1C5]/90 rotate-45 select-none">edit</span>
        <span className="material-symbols-outlined absolute top-[45%] right-[25%] text-4xl text-[#E3E1C5]/50 -rotate-12 select-none">menu_book</span>
        <span className="material-symbols-outlined absolute top-[50%] left-[5%] text-7xl text-[#E3E1C5]/60 rotate-90 select-none">psychology</span>
        
        <span className="material-symbols-outlined absolute bottom-[35%] left-[10%] text-6xl text-[#E3E1C5]/70 rotate-45 select-none">school</span>
        <span className="material-symbols-outlined absolute bottom-[25%] right-[15%] text-5xl text-[#E3E1C5]/80 -rotate-45 select-none">auto_awesome</span>
        <span className="material-symbols-outlined absolute bottom-[20%] left-[15%] text-5xl text-[#E3E1C5]/90 -rotate-12 select-none">lightbulb</span>
        
        <span className="material-symbols-outlined absolute bottom-[10%] left-[35%] text-7xl text-[#E3E1C5]/80 select-none">psychology</span>
        <span className="material-symbols-outlined absolute bottom-[5%] left-[15%] text-4xl text-[#E3E1C5]/60 rotate-12 select-none">edit</span>
        <span className="material-symbols-outlined absolute bottom-[15%] left-[55%] text-5xl text-[#E3E1C5]/70 -rotate-12 select-none">science</span>
        <span className="material-symbols-outlined absolute bottom-[10%] left-[30%] text-5xl text-[#E3E1C5]/90 select-none">auto_awesome</span>

        {/* Central Logo Box */}
        <div className="relative z-20 flex flex-col items-center justify-center bg-white border-[6px] border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-4/5 max-w-xl">
          <h1 className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tight text-black mb-4 leading-none">
            MINDPOP
          </h1>
          <div className="w-full h-1 bg-black mb-6"></div>
          <p className="text-sm md:text-lg font-bold tracking-[0.25em] text-black text-center whitespace-nowrap">
            WHERE IDEAS BURST INTO LIFE
          </p>
        </div>

        {/* Footer Box */}
        <div className="absolute bottom-8 left-8 bg-white border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-4 text-sm font-bold z-50">
          <a href="#" className="hover:text-primary underline">Privacy</a>
          <a href="#" className="hover:text-primary underline">Terms</a>
          <span className="text-gray-500 font-medium">© 2026 MindPop</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="relative flex-1 flex flex-col justify-center items-center bg-[#EF8728] z-10 w-1/2">
        {/* Background Icons (Right) - Increased Density */}
        <span className="material-symbols-outlined absolute top-[10%] right-[25%] text-6xl text-black/10 rotate-12 select-none">edit</span>
        <span className="material-symbols-outlined absolute top-[15%] right-[10%] text-8xl text-black/15 -rotate-12 select-none">school</span>
        <span className="material-symbols-outlined absolute top-[25%] left-[15%] text-5xl text-black/5 rotate-45 select-none">science</span>
        <span className="material-symbols-outlined absolute top-[35%] right-[20%] text-7xl text-black/10 -rotate-45 select-none">lightbulb</span>
        <span className="material-symbols-outlined absolute top-[45%] left-[25%] text-6xl text-black/15 rotate-90 select-none">psychology</span>
        
        <span className="material-symbols-outlined absolute bottom-[40%] right-[30%] text-5xl text-black/5 -rotate-12 select-none">menu_book</span>
        <span className="material-symbols-outlined absolute bottom-[30%] left-[10%] text-6xl text-black/10 rotate-45 select-none">auto_awesome</span>
        <span className="material-symbols-outlined absolute bottom-[20%] right-[35%] text-5xl text-black/15 -rotate-45 select-none">edit</span>
        
        <span className="material-symbols-outlined absolute bottom-[10%] right-[15%] text-8xl text-black/10 rotate-12 select-none">lightbulb</span>
        <span className="material-symbols-outlined absolute bottom-[15%] left-[30%] text-4xl text-black/5 -rotate-12 select-none">science</span>
        <span className="material-symbols-outlined absolute bottom-[5%] left-[20%] text-7xl text-black/15 rotate-45 select-none">menu_book</span>
        <span className="material-symbols-outlined absolute bottom-[5%] right-[45%] text-6xl text-black/10 select-none">psychology</span>

        {/* Top Right Action Buttons removed to global Navbar */}

        {/* Word Search Grid */}
        <div className="relative z-20 bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-3">
          <div className="grid grid-cols-8 gap-[2px] bg-black border-2 border-black w-full max-w-lg aspect-square">
            {/* Row 1 */}
            <Cell text="S" tone="gray" />
            <Cell text="T" tone="gray" />
            <Cell text="U" tone="gray" />
            <Cell text="D" tone="gray" />
            <Cell text="Y" tone="gray" />
            <Cell text="X" tone="gray" />
            <Cell text="Q" tone="gray" />
            <Cell text="W" tone="gray" />
            {/* Row 2 - LEARN (Blue) */}
            <Cell text="F" tone="gray" />
            <Cell text="L" bg="#A4C2F4" />
            <Cell text="E" bg="#A4C2F4" />
            <Cell text="A" bg="#A4C2F4" />
            <Cell text="R" bg="#A4C2F4" />
            <Cell text="N" bg="#A4C2F4" />
            <Cell text="G" tone="gray" />
            <Cell text="H" tone="gray" />
            {/* Row 3 - BRAIN (Yellow) */}
            <Cell text="J" tone="gray" />
            <Cell text="B" bg="#FDE293" />
            <Cell text="R" bg="#FDE293" />
            <Cell text="A" bg="#FDE293" />
            <Cell text="I" bg="#FDE293" />
            <Cell text="N" bg="#FDE293" />
            <Cell text="K" tone="gray" />
            <Cell text="L" tone="gray" />
            {/* Row 4 - GROW (Orange) */}
            <Cell text="G" bg="#F9CB9C" />
            <Cell text="R" bg="#F9CB9C" />
            <Cell text="O" bg="#F9CB9C" />
            <Cell text="W" bg="#F9CB9C" />
            <Cell text="M" tone="gray" />
            <Cell text="N" tone="gray" />
            <Cell text="O" tone="gray" />
            <Cell text="P" tone="gray" />
            {/* Row 5 - POP (Purple) */}
            <Cell text="Q" tone="gray" />
            <Cell text="R" tone="gray" />
            <Cell text="P" bg="#D9D2E9" />
            <Cell text="O" bg="#D9D2E9" />
            <Cell text="P" bg="#D9D2E9" />
            <Cell text="S" tone="gray" />
            <Cell text="T" tone="gray" />
            <Cell text="U" tone="gray" />
            {/* Row 6 - THINK (Pink) */}
            <Cell text="T" bg="#F4CCCC" />
            <Cell text="H" bg="#F4CCCC" />
            <Cell text="I" bg="#F4CCCC" />
            <Cell text="N" bg="#F4CCCC" />
            <Cell text="K" bg="#F4CCCC" />
            <Cell text="V" tone="gray" />
            <Cell text="W" tone="gray" />
            <Cell text="X" tone="gray" />
            {/* Row 7 */}
            <Cell text="Y" tone="gray" />
            <Cell text="Z" tone="gray" />
            <Cell text="A" tone="gray" />
            <Cell text="S" tone="gray" />
            <Cell text="M" tone="gray" />
            <Cell text="A" tone="gray" />
            <Cell text="R" tone="gray" />
            <Cell text="T" tone="gray" />
            {/* Row 8 */}
            <Cell text="I" tone="gray" />
            <Cell text="D" tone="gray" />
            <Cell text="E" tone="gray" />
            <Cell text="A" tone="gray" />
            <Cell text="Q" tone="gray" />
            <Cell text="W" tone="gray" />
            <Cell text="E" tone="gray" />
            <Cell text="R" tone="gray" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the grid cells
const Cell = ({ text, bg, tone }) => {
  const isGray = tone === "gray";
  return (
    <div
      className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[3.5rem] lg:h-[3.5rem] font-bold text-sm sm:text-lg md:text-xl lg:text-2xl`}
      style={{
        backgroundColor: bg || "white",
        color: isGray ? "#B0B0B0" : "black"
      }}
    >
      {text}
    </div>
  );
};

export default Welcome;
