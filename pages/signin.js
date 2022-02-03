import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from '../components/Loader';

export default function SignIn({ providers }) {
  const { data: session } = useSession();
  const route = useRouter();
  useEffect(() => {
    if (!session) return;
    route.push("/");
  }, [session, route]);
  if(session) return<Loader/>
  return (
    <>
      <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
        <Head>
          <title>SignUp - Spotify</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image
          src="https://rb.gy/y9mwtb"
          height={250}
          width={600}
          objectFit="contain"
          className="animate-pulse"
          alt=""
        />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props: { providers, session },
  };
}
