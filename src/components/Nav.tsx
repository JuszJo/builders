import { gsap } from "gsap";
// gsap.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(ScrollToPlugin)

type NavItemProps = {
  value: string,
  link?: string,
  onClick: any
}

function NavItem(props: NavItemProps) {
  return (
    <div
      className={`
        cursor-pointer hover:bg-white/10 px-3 py-3 rounded-[24px]
      `}
      onClick={() => props.onClick()}
    >
      <a>
        <span className="font-semibold lg:text-lg leading-[8px] text-[12px]">{props.value}</span>
      </a>
    </div>
  )
}

const selectables = [
  {
    value: "Home",
    link: "#",
    onClick: () => { }
  },
  {
    value: "Services",
    link: "#services",
    onClick: () => gsap.to(window, { scrollTo: "#services", ease: "power1.inOut" })
  },
  {
    value: "Pricing",
    link: "#",
    onClick: () => { }
  },
  {
    value: "Contact",
    link: "#",
    onClick: () => { }
  }
]

export default function Nav() {
  return (
    <div
      className={`
      flex w-min rounded-[30px] lg:h-[60px] h-[50px]
      items-center px-2 justify-between border
      border-neutral-600 backdrop-blur-[2px] z-1
      relative mx-auto bg-white/2.5 gap-4
    `}
    >
      {selectables.map((ni, i) => (
        <NavItem key={i} value={ni.value} link={ni.link} onClick={ni.onClick} />
      ))}
    </div>
  )
}