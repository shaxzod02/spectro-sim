import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [showSimMenu, setShowSimMenu] = useState(false);

  const toggleSimMenu = () => {
    setShowSimMenu(prev => !prev);
  };

  return (
    <>
      <nav className="flex flex-col md:flex-row md:justify-between gap-10 items-center">

        {/* SITE LOGO */}
        <div>
          <Link to="/">
            <h1 className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent text-6xl font-[oxanium]">
              SpectroSim
            </h1>
          </Link>
        </div>

        {/* PAGE NAVIGATION */}
        <div className="flex gap-10 text-2xl">

          <Link to="/" className="lg:hover:text-slate-400">Home</Link>
          <Link to="/about" className="lg:hover:text-slate-400">About</Link>

          <div className="relative">
            <button
              className="inline-block cursor-pointer lg:hover:text-slate-400"
              onClick={toggleSimMenu}
            >
              Simulators
            </button>

            {showSimMenu && (
              <div className="absolute top-full mt-1 flex flex-col lg:text-wrap">
                <Link to="/absorbsim" className="text-cyan-500">AbsorbSim</Link>
              </div>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}

export default Nav;