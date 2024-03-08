import type { Response } from '@/types'
import { instance } from './instance'

export function reloadConfig() {
  return instance.post<Response<any>>('config/reload_configuration')
}

export function setRecordingPath(data: { path?: string; check?: string }) {
  return instance.post<Response<any>>('config/set_recording_path', data)
}

export function getRecordingPath() {
  return instance.get<Response<any>>('config/get_recording_path')
}

export function setFileNameAndPath(data: { path_and_format?: string; check?: string }) {
  return instance.post<Response<any>>('config/set_default_file_path_name_format', data)
}

export function getFileNameAndPath() {
  return instance.get<Response<any>>('config/get_default_file_path_name_format')
}
