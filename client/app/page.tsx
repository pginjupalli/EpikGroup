

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F0EAD6", fontFamily: "Georgia, serif" }}>

      <nav className="flex items-center justify-between px-12 py-4 border-b" style={{ borderColor: "#D4BA80" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#C17B1A" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF3D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.86H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.86l.58-3.57a2 2 0 00-1.34-2.23z" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-wide" style={{ color: "#3D2000" }}>
            Clothing <span style={{ color: "#C17B1A" }}>Rec</span>
          </span>
        </div>
        <div className="flex items-center gap-7 text-sm" style={{ color: "#7A5C30" }}>
          <a href="/aboutus" className="hover:text-amber-900 transition-colors cursor-pointer">Features</a>
          <a href="/aboutus" className="hover:text-amber-900 transition-colors cursor-pointer">About Us</a>
          <a href="/login" className="px-4 py-1.5 rounded-lg border text-sm transition-colors hover:bg-amber-100" style={{ borderColor: "#C17B1A", color: "#C17B1A" }}>
            Sign in
          </a>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-12 gap-8 flex-wrap">

        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-5" style={{ background: "#E8C96A", border: "0.5px solid #C8A030", color: "#6B4200" }}>
            ✦ Your digital wardrobe
          </div>

          <h1 className="text-5xl font-medium leading-tight mb-4" style={{ color: "#3D2000" }}>
            Upload. Style.<br />
            <span style={{ color: "#C17B1A" }}>Share.</span>
          </h1>

          <p className="text-sm leading-relaxed mb-8" style={{ color: "#7A5C30" }}>
            Add your clothes, build outfits, track what is available, and explore what others are wearing — all in one place.
          </p>

          <div className="flex flex-wrap gap-2 mb-9">
            {["Upload your wardrobe", "Build & save outfits", "Availability tracking", "Clothing traits & tags", "Like public outfits"].map((f) => (
              <span key={f} className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs" style={{ background: "#FAF0D8", border: "0.5px solid #D4BA80", color: "#6B4A1A" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#C17B1A" }} />
                {f}
              </span>
            ))}
          </div>

          <a href="/signup" className="inline-block px-7 py-3 rounded-xl text-sm font-medium tracking-wide" style={{ background: "#C17B1A", color: "#FFF3D0" }}>
            Get started - it is free
          </a>
          <p className="text-xs mt-3" style={{ color: "#9A7840" }}>
            Already have an account?{" "}
            <a href="/login" className="font-medium border-b cursor-pointer" style={{ color: "#C17B1A", borderColor: "#C17B1A" }}>
              Sign in
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-3 flex-shrink-0">

          <div className="rounded-2xl p-4 w-60" style={{ background: "#FAF6EE", border: "0.5px solid #D4BA80" }}>
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#9A7840" }}>My closet</p>
            {[
              { name: "White Hoodie", meta: "Cotton · Available", tags: ["cozy", "winter"] },
              { name: "Plaid Brown Skirt", meta: "Wool blend · Available", tags: ["fall", "office"] },
            ].map((item) => (
              <div key={item.name} className="flex gap-2.5 mb-3 last:mb-0">
                <div className="w-14 h-16 rounded-lg flex flex-col items-center justify-center gap-1 flex-shrink-0" style={{ background: "#EDE0C4", border: "0.5px dashed #C4A870" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A7840" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9l4-4 4 4 4-4 4 4" />
                  </svg>
                  <span style={{ color: "#B09060", fontSize: "8px" }}>photo</span>
                </div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: "#3D2000" }}>{item.name}</p>
                  <p style={{ color: "#9A7840", fontSize: "11px" }}>{item.meta}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.tags.map((t) => (
                      <span key={t} className="rounded-full px-2 py-0.5" style={{ background: "#E8C96A", color: "#6B4200", fontSize: "10px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 w-60" style={{ background: "#FAF6EE", border: "0.5px solid #D4BA80" }}>
            <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#9A7840" }}>Community outfits</p>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#EDE0C4", border: "0.5px dashed #C4A870" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A7840" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: "#3D2000" }}>@pooja</p>
                  <p style={{ color: "#9A7840", fontSize: "10px" }}>Campus fit</p>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs cursor-pointer" style={{ background: "#F5E8CC", border: "0.5px solid #D4BA80", color: "#C17B1A" }}>
                ♥ 24
              </span>
            </div>
            <div className="flex gap-1.5 mb-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 h-16 rounded-lg flex flex-col items-center justify-center gap-1" style={{ background: "#EDE0C4", border: "0.5px dashed #C4A870" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A7840" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9l4-4 4 4 4-4 4 4" />
                  </svg>
                  <span style={{ color: "#B09060", fontSize: "8px" }}>photo</span>
                </div>
              ))}
            </div>
            <p style={{ color: "#7A5C30", fontSize: "11px", lineHeight: "1.5" }}>
              Varsity jacket + coffee turtleneck — perfect for fall lectures
            </p>
          </div>

        </div>
      </main>

      <footer className="flex items-center justify-between px-12 py-3 border-t text-xs" style={{ borderColor: "#D4BA80", color: "#9A7840" }}>
        <span>© 2026 Clothing Rec · Made by the Quacks</span>
        <span>Campus · Work · Weekend</span>
      </footer>

    </div>
  );
}
