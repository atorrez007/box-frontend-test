"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { handleLogin } from "@auth0/nextjs-auth0";
import ProfileClient from "./components/Client";
import Alternate from "./components/Alternate";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [hasRun, setHasRun] = useState(false);

  const dynamicButton = user ? (
    <a
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      href="/api/auth/logout"
    >
      Logout
    </a>
  ) : (
    <a
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      href="/api/auth/login"
    >
      Login
    </a>
  );

  const queryBoxAPI = async () => {
    try {
      const res = await fetch("/api/boxes");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      console.log(data);
      // setBoxData(data);
    } catch (err) {
      console.log(`Error fetching data: ${err}`);
    }
  };

  const loadImage = async () => {
    try {
      // Body must be passed from client to server and then server to actual endpoint.
      const res = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          image: `xya1239408924u8zme.png`,
          user: `${user?.sub}`,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const queryWeatherAPI = async () => {
    try {
      const res = await fetch("/api/weather");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      console.log(data);
      // setBoxData(data);
    } catch (err) {
      console.log(`Error fetching data: ${err}`);
    }
  };

  // Upon login, user will be checked in db for account and projects.
  useEffect(() => {
    const authenticateDB = async () => {
      try {
        const res = await fetch("/api/db-auth", {
          method: "POST",
          body: JSON.stringify({
            sub: user?.sub,
            email: user?.email,
          }),
        });
        const data = await res.json();
      } catch (error) {
        console.log(error);
      }
      console.log(`Checking for user: ${user?.email} in db.`);
    };

    if (user && !hasRun) {
      authenticateDB();
      setHasRun(true);
    } else {
      console.log("User not present or effect already run.");
    }
  }, [user, hasRun]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24">
      <div className="mt-1">
        <ProfileClient />
        <Alternate />
        <div className="mt-20">{dynamicButton}</div>
      </div>
      <button
        onClick={queryBoxAPI}
        className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Get Boxes
      </button>
      <button
        onClick={queryWeatherAPI}
        className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Get Weather
      </button>
      <section className="flex flex-col">
        <h1>Boxes</h1>
        {/* {boxData ? formatObj(boxData) : null} */}
      </section>
      <button
        onClick={loadImage}
        className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Load Image
      </button>
    </main>
  );
}
