import React from "react";
import Image from "next/image";

const RightSideBar = () => {
  return (
    <div className="sticky right-0 top-0 z-20 h-screen w-[300px] xl:w-[350px] flex flex-col gap-12 overflow-auto pl-6 pr-10 py-6 max-lg:hidden">
      <div className="flex flex-col gap-4">
        <h3 className="text-light-1 text-heading3-bold">Sponsored</h3>
        <Image
          src="/assets/ad.png"
          alt="ad"
          width={280}
          height={200}
          className="rounded-lg"
        />
        <p className="text-body-bold text-light-1">Coco-cola</p>
        <p className="text-small-semibold text-light-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa,
          accusamus cupiditate natus pariatur qui modi suscipit et rem assumenda
          vero vitae?
        </p>
      </div>
    </div>
  );
};

export default RightSideBar;
