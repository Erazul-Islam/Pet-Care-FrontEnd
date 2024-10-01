/* eslint-disable prettier/prettier */
"use client"

import React from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react';
import ReactMarkdown from "react-markdown"
import { Controller, FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useCreatePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';

const PetMarkDownEditor = () => {
    const { user } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mutate, isPending } = useCreatePost();
    const methods = useForm();
    const { handleSubmit, control, register, reset } = methods;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // Create a new FormData object
        const postData = new FormData();

        // Append data to FormData
        postData.append('userEmail', user?.email || '');
        postData.append('caption', data.caption);
        postData.append('description', data.description);
        postData.append('photo', "fdasdf"); // Add your photo handling logic here

        console.log(postData);

        // Call mutate with the FormData object
        mutate(postData);
        reset();
    };

    return (
        <>
            <Button onPress={onOpen} color='success'>Share</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Share your story or tips</ModalHeader>
                                    <ModalBody>
                                        {/* Caption Input */}
                                        <Input
                                            {...register('caption', { required: 'Caption is required' })}
                                            name='caption'
                                            label="Caption"
                                            placeholder="Please enter a caption"
                                            variant="bordered"
                                        />
                                        {/* Description Textarea with Controller */}
                                        <Controller
                                            control={control}
                                            name="description"
                                            rules={{ required: 'Description is required' }}
                                            render={({ field: { onChange, value } }) => (
                                                <>
                                                    <Textarea
                                                        value={value || ''}
                                                        onChange={(e) => onChange(e.target.value)}
                                                        placeholder="Write your description here..."
                                                        label="Description"
                                                        variant="bordered"
                                                    />
                                                    <ReactMarkdown>{value || ''}</ReactMarkdown>
                                                </>
                                            )}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" color="primary" isLoading={isPending}>
                                            {isPending ? 'Posting...' : 'Post'}
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};

export default PetMarkDownEditor;
