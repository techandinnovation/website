import { Capsule } from "@/components/Capsule";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="bg-[#0e0e0e] min-h-screen overflow-hidden">
            <div className="text-white flex justify-center items-center flex-col mt-30">
                <span className="tracking-tighter text-xl sm:text-2xl md:text-3xl text-center font-medium text-primary/80">
                    Welcome to
                </span>
                <h1 className="tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center font-bold my-2">
                    <span className="font-bold bg-blue-500 from-blue-400 to-blue-700 bg-clip-text text-transparent">
                        Tech
                    </span>{" "}
                    <span className="text-gray-400"> & </span>{" "}
                    <span className="font-bold bg-blue-500 from-blue-400 to-blue-700 bg-clip-text text-transparent">
                        Innovation
                    </span>
                </h1>
                <div className="text-2xl">
                    <span className="font-bold bg-gray-400 from-blue-400 to-blue-700 bg-clip-text text-transparent">
                        Club
                    </span>{" "}
                    <span className="text-gray-400"> , </span>{" "}
                    <span className="font-bold bg-gray-400 from-blue-400 to-blue-700 bg-clip-text text-transparent">
                        GGITS
                    </span>
                </div>
            </div>

            <div className="mt-20 text-center">
                <div className="text-white flex justify-center items-center">
                    Click here to Apply for the Tech & Innovation Club Recruitment! 👇🏻
                </div>
                <div className="flex mt-5 justify-center animate-bounce items-center">
                    <Link href="/recruitment-application">
                        <Capsule variant="cap2" text="Tech & Innovation Recruitment Form!" />
                    </Link>
                </div>
            </div>

        </div>
    )
}