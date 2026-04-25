import { BanMemberPayload, BanUserResponse, MemberApiResponse } from '@/types/member';
import axiosClient from '../axios';

export const getAllMembersApi = () =>
    axiosClient.get<MemberApiResponse>('/admin/all/members').then((r) => r.data);

export const banMembersApi = (payload: BanMemberPayload) => 
    axiosClient.post<BanUserResponse>(`/admin/block-user/${payload.userId}`).then((r) => r.data);