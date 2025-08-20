import { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

import CanvasIntro from "../components/CanvasIntro";
import Nav from "../components/Nav";
import { RoundedButton } from "../components/Button";

import services1 from "../assets/web.png";
import services2 from "../assets/mobile.png";
import services3 from "../assets/cloud.png";
import services4 from "../assets/map.png";

import microsoft from "../assets/microsoft.png";
import google from "../assets/google.png";

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

const services = [
  {
    header: "Web Development",
    sub: "Build powerful websites tailored to your business needs. From modern designs to complex functionality, we create web experiences that drive conversions.",
    image: services1
  },
  {
    header: "Mobile Development",
    sub: "Transform your ideas into powerful mobile applications that reach customers wherever they are. We develop intuitive, feature-rich apps for iOS and Android.",
    image: services2
  },
  {
    header: "Hosting / Deployment",
    sub: "Keep your applications running smoothly with our robust cloud solutions. We provide secure cloud infrastructure to keep you business running smoothly.",
    image: services3
  },
  {
    header: "Business Email Setup",
    sub: "Establish credibility with custom business email addresses that match your domain. We configure professional email systems and handle seamless integration across all your devices and platforms.",
    image: services4
  },
]

type ServiceCardProps = {
  header: string,
  sub: string,
  image: any,
}

function ServiceCard(props: ServiceCardProps) {
  return (
    <div className={`
      h-[500px] relative border border-[#36414A] overflow-hidden p-4 rounded-[8px]
      bg-[linear-gradient(to_bottom,#1E2429_0%,#14181B_100%)]
      hover:shadow-[0px_0px_32px_10px_#4aa4b920] transition-shadow duration-300
      service-box
    `}>
      <div className="z-2 relative">
        <div>
          <h5 className="md:text-[24px] text-[20px] font-medium">{props.header}</h5>
        </div>
        <div className="pt-8">
          <p className="text-[var(--sub-text)] md:text-[16px] text-[14px] leading-[30px]">{props.sub}</p>
        </div>
      </div>
      <div className="absolute top-[250px] left-0 w-full h-full">
        <div className="absolute top-0 w-full h-full px-4">
          <img
            src={props.image}
            alt="web development service"
            className="m-auto"
          />

        </div>
      </div>
      <div className={`
        absolute top-0 left-0 w-full h-[500px]
        bg-[linear-gradient(to_bottom,#1E232800_20%,#14181B_100%)]
      `}>
      </div>
    </div>
  )
}

function ServiceCardLarge(props: ServiceCardProps) {
  return (
    <div className={`
      h-[500px] relative border border-[#36414A] overflow-hidden p-4 rounded-[8px]
      bg-[linear-gradient(to_bottom,#1E2429_0%,#14181B_100%)]
      hover:shadow-[0px_0px_32px_10px_#4aa4b920] transition-shadow duration-300
      service-box-large
    `}>
      <div className="flex h-full">
        <div className="z-2 relative flex flex-col justify-between">
          <div>
            <div>
              <h5 className="text-[24px] font-medium">{props.header}</h5>
            </div>
            <div className="pt-8">
              <p className="text-[var(--sub-text)] text-[16px] max-w-[620px] leading-[30px]">{props.sub}</p>
            </div>
          </div>
          <div className="pb-4">
            <div className="flex items-center gap-3">
              <img src={microsoft} width={20} height={20} />
              <p className="text-[16px] text-[var(--sub-text)]">Microsoft 365</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <img src={google} width={20} height={20} />
              <p className="text-[16px] text-[var(--sub-text)]">Google Workspace</p>
            </div>
          </div>
        </div>
        <div>
          <div className="absolute right-0 top-0 w-full h-full">
            <div className="absolute top-0 w-full h-full">
              <img
                src={props.image}
                alt="web development service"
                className="ml-auto h-full object-cover"
              />
            </div>
          </div>
          <div className={`
            absolute top-0 left-0 w-full h-[500px]
            md:bg-[linear-gradient(to_right,#1E2429_40%,#14181B80_50%,#14181B32_70%)]
            bg-[linear-gradient(to_right,#1E2429_60%,#14181B80_80%,#14181B32_100%)]
          `}>
          </div>
        </div>
      </div>
    </div>
  )
}

function Services() {
  useLayoutEffect(() => {
    gsap.from(".service-box", {
      scrollTrigger: {
        trigger: ".service-box",
        // markers: true,
      },
      y: 600,
      opacity: 0,
      stagger: 0.1,
    })

    gsap.from(".service-box-large", {
      scrollTrigger: {
        trigger: ".service-box-large",
        // markers: true,
      },
      y: 300,
      opacity: 0,
    })
  }, []);

  return (
    <div className="lg:max-w-[1400px] m-auto px-4">
      <div className="text-center">
        <h2 className="!leading-[50px]">Everything We Offer</h2>
        <div className="pt-4 lg:text-[18px] text-[var(--sub-text)] max-w-[520px] m-auto text-[14px]">
          <p>See how we give value to companies and accelerate their growth using modern solutions.</p>
        </div>
      </div>
      <div className="pt-[100px]" id="services">
        <div>
          <div className="flex flex-col lg:flex-row gap-8">
            {
              services.slice(0, 3).map((service, i) => (
                <ServiceCard {...service} key={i} />
              ))
            }
          </div>
          <div className="pt-8">
            <ServiceCardLarge {...services[services.length - 1]} />
          </div>
        </div>
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
      <div className="absolute inset-0 
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
      <div className="pt-[200px] pb-[80px]">
        <Services />
      </div>
    </div>
  )
}