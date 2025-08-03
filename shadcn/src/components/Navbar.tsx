import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { CiSquarePlus } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className=" max-w-[1140px] p-4 mx-auto">
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <Link to={"/"} >
          <span className="flex items-center gap-2 text-3xl">Product Store <FaShoppingCart /></span>
        </Link>

        <div className="flex">

          <Button asChild size={"icon"} >
            <Link to={"create"}><CiSquarePlus className="size-6" /> </Link>
          </Button>

        </div>
      </div>
    </div>
  )
}

export default Navbar
