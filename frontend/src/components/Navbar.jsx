const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 w-full h-24 flex items-center justify-between px-8 z-50 pointer-events-none">
            {/* Left side: Logo + Brand Name */}
            <div className="flex items-center space-x-3 pointer-events-auto">
                <img 
                    src="/cube.jpeg" 
                    alt="MindPop Logo" 
                    className="w-16 h-16 object-contain drop-shadow-md hover:-translate-y-1 transition-transform"
                />
                <span className="text-3xl font-black tracking-tight text-black drop-shadow-md">
                    MindPop
                </span>
            </div>
            
            {/* Right side: Action Buttons */}
            <div className="flex items-center gap-4 pointer-events-auto">
                <button className="bg-white border-[4px] border-black px-6 py-2 text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                    Log In
                </button>
                <button className="bg-[#EF8728] border-[4px] border-black px-6 py-2 text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                    Sign Up
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
