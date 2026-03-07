const Navbar = ({ onOpenAuth, user, onLogout }) => {
    return (
        <nav className="absolute top-0 left-0 w-full h-24 flex items-center justify-between px-8 z-50 pointer-events-none">
            {/* Left side: Logo + Brand Name */}
            <div className="flex items-center space-x-3 pointer-events-auto">
                <div className="w-12 h-12 bg-white border-4 border-black rounded-full flex items-center justify-center text-black font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                    M
                </div>
                <span className="text-3xl font-black tracking-tight text-black drop-shadow-md">
                    MindPop
                </span>
            </div>

            {/* Right side: Auth Buttons or User Profile */}
            <div className="flex items-center gap-4 pointer-events-auto">
                {user ? (
                    <>
                        <div className="bg-white border-[4px] border-black px-5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#EF8728] border-[3px] border-black rounded-full flex items-center justify-center text-white font-black text-sm">
                                {(user.name || user.username || '?')[0].toUpperCase()}
                            </div>
                            <span className="text-base font-extrabold">
                                {user.name || user.username}
                            </span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="bg-white border-[4px] border-black px-6 py-2 text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => onOpenAuth('login')}
                            className="bg-white border-[4px] border-black px-6 py-2 text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => onOpenAuth('signup')}
                            className="bg-[#EF8728] border-[4px] border-black px-6 py-2 text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
