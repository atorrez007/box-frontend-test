"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useEffect } from "react";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <Image
          src={`${user.picture}`}
          alt={`${user.name}`}
          width={75}
          height={75}
        />
        <h2>{user.name}</h2>
        <p>{user.sub}</p>
      </div>
    )
  );
}
