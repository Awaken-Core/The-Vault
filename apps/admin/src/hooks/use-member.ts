"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getAllMembersApi, banMembersApi } from '@/lib/clients/member-client';
import type { AxiosError } from 'axios';

type ApiError = AxiosError<{ message: string }>;

export const useBanMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => await banMembersApi({ userId: userId }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
            toast.success(data.message);
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message ?? 'Failed to ban members');
        },
    });
};

export const useGetMembers = () => {
    return useQuery({
        queryKey: ["members"],
        queryFn: getAllMembersApi,
    })
};