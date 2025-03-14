/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useUser } from '@/src/context/user.provider';
import { useGetProfile, useGetUser } from '@/src/hooks/auth.hook';
import { useFriendRequest } from '@/src/hooks/friend.request.hook';
import React from 'react';
import { toast } from 'sonner';
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { BsSaveFill } from "react-icons/bs";
import { SiHomepage } from "react-icons/si";
import { MdOutlineGroups2 } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { SiCoinmarketcap } from "react-icons/si";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { FaMemory } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import { SiEventstore } from "react-icons/si";
import Link from 'next/link';

const People = () => {

    const { data } = useGetProfile() || {};
    // const [pendingRequests, setPendingRequests] = useState<string[]>([]);

    const people = Array.isArray(data?.data) ? data?.data : [];

    const { user } = useUser()

    const senderId = user?._id

    const { mutate: sendFriendRequest } = useFriendRequest()
    const { data: authUser } = useGetUser()

    const handleAddFriend = async (receiverId: string) => {

        if (!senderId || !receiverId) {
            return;
        }

        const targetUser = people.find((user: { _id: string; }) => user._id === receiverId);

        const friendRequest = targetUser.friendRequest

        const exisitingUser = friendRequest.some((one: any) => one.sender === senderId)

        if (exisitingUser === true) {
            toast.warning('Already request sent')

            return
        }

        await sendFriendRequest({ senderId, receiverId });
    };

    return (
        <div className='lg:ml-8 mt-4'>
            <div>
                <Link href={'/profile'}>
                    <div className='flex gap-4'>
                        <CgProfile size="30" color="purple" />
                        <h1 className='font-semibold mt-1'>Erazul Islam Taosif</h1>
                    </div>
                </Link>
                <div className='flex mt-6 gap-4'>
                    <FaUserFriends size='30' color='green' />
                    <h1 className='font-semibold mt-1'>Friends ({authUser?.data?.friend?.length})</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <FaPeopleRoof size='30' color='yellow' />
                    <h1 className='font-semibold mt-1'>People you may know</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <MdDashboardCustomize size='30' />
                    <h1 className='font-semibold mt-1'>Professional Dashboard</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <FaBirthdayCake size='25' />
                    <h1 className='font-semibold mt-1 ml-1'>Friends Birthdays</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <BsSaveFill size='25' />
                    <h1 className='font-semibold mt-1 ml-1'>Saved</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <SiHomepage size='30' />
                    <h1 className='font-semibold mt-1'>Pages</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <MdOutlineGroups2 size='30' />
                    <h1 className='font-semibold mt-1 '>Groups</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <FaVideo size='30' />
                    <h1 className='font-semibold mt-1'>Videos</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <SiCoinmarketcap size='30' />
                    <h1 className='font-semibold mt-1'>Marketplace</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <BsFillCameraReelsFill size='25' />
                    <h1 className='font-semibold mt-1 ml-1'>Reels</h1>
                </div>
                <div className='flex mt-6 gap-4'>
                    <FaMemory size='30' />
                    <h1 className='font-semibold mt-1'>Memory</h1>
                </div>
                <Link href={'/event'}>
                    <div className='flex mt-6 gap-4'>
                        <SiEventstore size='30' />
                        <h1 className='font-semibold mt-1'>Events</h1>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default People;
