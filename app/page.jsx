'use client'
import Image from "next/image";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Home() {

  const [user] = useAuthState(auth);
  const router = useRouter();
  // const userSession = sessionStorage.getItem('user');

  if(!user){
    return router.push('/sign-in');
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {user && (
          <h1>Welcome, {user.displayName || user.email}!</h1>
        )}
        
        <button 
          onClick={() => {
            signOut(auth);
            sessionStorage.removeItem('user');
          }}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Log out
        </button>
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

      </main>
      
    </div>
  );
}
