import Image from "next/image";
import { ThreeBounce } from "@binaryluke/better-react-spinkit";

function Loader() {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
          <Image
            src="https://rb.gy/y9mwtb"
            layout="fill"
            objectFit="contain"
            className="animate-pulse"
            alt=""
          />
        </span>
        <ThreeBounce size={24} color="#15883e" />
      </div>
    </div>
  );
}

export default Loader;
