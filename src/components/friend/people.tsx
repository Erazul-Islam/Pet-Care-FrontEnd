/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { useUser } from '@/src/context/user.provider';
import { useGetProfile } from '@/src/hooks/auth.hook';
import { useFriendRequest } from '@/src/hooks/friend.request.hook';
import React from 'react';
import { toast } from 'sonner';

const People = () => {

    const { data } = useGetProfile() || []
    // const [pendingRequests, setPendingRequests] = useState<string[]>([]);

    const people = data?.data

    const { user } = useUser()

    const senderId = user?._id

    const { mutate: sendFriendRequest } = useFriendRequest()

    // const requestSent = people.includes(senderId)
    // console.log(requestSent)

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
        <div className='mt-20'>
            {
                people?.map((man: any) => {

                    const person = man.friendRequest.filter((x: any) => x.sender === senderId)

                    const pending = person.some((one: any) => one.status === 'pending')

                    if (person.status === 'pending') {
                        console.log('request pending')
                    } else if (person.status === 'accepted') {
                        console.log('friend')
                    } else {
                        console.log('Add friend')
                    }


                    return (<div key={man._id}>
                        <div>
                            <div className='flex border justify-between gap-4 h-16'>
                                <img className='rounded-full ml-2 mt-2 w-12 h-12' src={man?.profilePhoto} alt="" />
                                <div className='pt-4'>{man?.name}</div>

                                {/* {
                                    pending === true ? "pending" : "Friend"
                                }
                                   <button onClick={() => handleAddFriend(man._id)} className='ml-4 mr-4'>{'Add friend'}</button> */}

                                {
                                    !person
                                        ? person.status === 'pending'
                                            ? 'request pending'
                                            : person.status === 'accepted'
                                                ? 'friend'
                                                : 'Add friend'
                                        : 'Add friend'
                                }

                            </div>
                        </div>
                    </div>)
                })
            }
        </div>
    );
};

export default People;