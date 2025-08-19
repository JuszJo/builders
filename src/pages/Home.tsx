import { useEffect, useRef } from "react"
import CanvasIntro from "../components/CanvasIntro";
import Nav from "../components/Nav";
import { RoundedButton } from "../components/Button";

function Header() {
  return (
    <div className="text-center px-4">
      <h1>Building for <br /> <span className="">Digital</span> Businesses</h1>
      <div className="pt-4 lg:text-[18px] text-[var(--sub-text)] max-w-[500px] m-auto text-[14px]">
        <p>Empowering small business with modern solutions that increases digital reach.</p>
      </div>
      <div className="pt-8">
        <RoundedButton custom_value="Get Started" />
      </div>
    </div>
  )
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const cleanup = CanvasIntro(canvasRef.current);

    () => {
      cleanup && cleanup()
    }
  }, [])

  return (
    <div>
      <div className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.5)_80%)]">
      </div>
      <div>
        <div className="pt-4">
          <Nav />
        </div>
        <div className="h-[80vh] flex justify-center items-center relative z-[1]">
          <Header />
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-full absolute top-0 ">

      </canvas>
    </div>
  )
}