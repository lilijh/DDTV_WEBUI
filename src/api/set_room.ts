import type { Response } from '@/types'
import { instance } from './instance'

export function setRoomsRecordState(data: { uid: string[]; state: boolean }) {
  return instance.post<Response<any>>('set_rooms/modify_recording_settings', data)
}
