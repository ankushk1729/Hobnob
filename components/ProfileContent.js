import React from "react";
import Image from "next/image";

function ProfileHeader({ user }) {
  return (
    <div className="w-full px-5 py-5 bg-white rounded-lg ">
      <section className="w-full  relative h-[300px]">
        <Image
          src={user.coverPhoto}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
        <div className="absolute left-6 -bottom-8 md:-bottom-12 lg:-bottom-16 rounded-full border-4 border-white bg-white">
          <div className="w-16  h-16 md:w-24 md:h-24 lg:w-28 relative lg:h-28">
            <Image
              src={user.profilePhoto}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </section>
      <section className="mt-6 flex justify-start mb-2">
        <div className="w-1/5"></div>
          <div className="w-3/5">
              <p className="text-2xl">{user.username}</p>
              <p className="text-sm font-light">{user.followersCount} Followers</p>
              <p className="text-sm font-light">{user.followingCount} Following</p>
          </div>
          <div className="w-1/5 flex justify-end items-start">
            <button className="bg-blue text-white rounded-md px-2 py-1">Follow</button>
          </div>
      </section>
      <hr/>
      <section className="mt-2">
        <p className="text-xl font-medium">About Me</p>
        <p className=" font-light">{user.bio}</p>
      </section>
      </div>
  );
}

export default ProfileHeader;
