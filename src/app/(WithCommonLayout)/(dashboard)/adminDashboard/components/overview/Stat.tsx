/* eslint-disable prettier/prettier */
import React from "react";
import { Eye, Ellipsis,MoveUpRight,UserRound,MoveDownRight,Plus,Star } from "lucide-react";

const Stat = () => {
  return (
    <div className="mt-4 lg:flex lg:justify-between">
            {/* page view */}
      <div className="w-[350px] h-[120px] p-5 border border-gray-600 rounded-md bg-[#0B1739]">
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex text-[#AEB9E1] gap-2">
            <Eye /> Page Views
          </div>
          <Ellipsis className="cursor-pointer" />
        </div>
        <div className="flex gap-2 items-center mt-6">
            <h1 className="text-3xl">50.8K</h1>
            <div className="  flex items-center ml-2 bg-[#14CA74] p-1 h-6 rounded-sm text-[12px]">
                    28.4% <MoveUpRight size={18}/>
            </div>
        </div>
      </div>
            {/* Monthly user */}
      <div className="w-[350px] md:mt-0 mt-6 h-[120px] p-5 border border-gray-600 rounded-md bg-[#0B1739]">
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex text-[#AEB9E1] gap-2">
            <UserRound /> Monthly User
          </div>
          <Ellipsis className="cursor-pointer" />
        </div>
        <div className="flex gap-2 items-center mt-6">
            <h1 className="text-3xl">31.8K</h1>
            <div className="  flex items-center ml-2 bg-[#FF5A65] p-1 h-6 rounded-sm text-[12px]">
                    12.6% <MoveDownRight size={18}/>
            </div>
        </div>
      </div>
            {/* New sign up */}
      <div className="w-[350px] h-[120px]  md:mt-0 mt-6 p-5 border border-gray-600 rounded-md bg-[#0B1739]">
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex text-[#AEB9E1]  gap-2">
            <Plus /> New Sign up
          </div>
          <Ellipsis className="cursor-pointer" />
        </div>
        <div className="flex gap-2 items-center mt-6">
            <h1 className="text-3xl">756</h1>
            <div className="  flex items-center ml-2 bg-[#14CA74] p-1 h-6 rounded-sm text-[12px]">
                    3.1% <MoveUpRight size={18}/>
            </div>
        </div>
      </div>
            {/* Subscriptions */}
      <div className="w-[350px] h-[120px]  md:mt-0 mt-6 p-5 border border-gray-600 rounded-md bg-[#0B1739]">
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex text-[#AEB9E1] gap-2">
            <Star /> Subscriptions
          </div>
          <Ellipsis className="cursor-pointer" />
        </div>
        <div className="flex gap-2 items-center mt-6">
            <h1 className="text-3xl">2.3K</h1>
            <div className="  flex items-center ml-2 bg-[#14CA74] p-1 h-6 rounded-sm text-[12px]">
                    11.3% <MoveUpRight size={18}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;
