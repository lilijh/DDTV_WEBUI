import FileTreeType from '@/enums/file_tree_type'
import type { Optional } from '@/types'
export interface Response<T> {
  code: number
  cmd: string
  massage: string
  data: T
}

export interface CompleteRoomInfoData {
  total: number
  completeInfoList: CompleteInfo[]
}

export interface CompleteInfo {
  uid: bigint
  roomId: number
  userInfo: UserInfo
  roomInfo: RoomInfo
  taskStatus: TaskStatus
}
export interface CompleteInfoWithCheck extends CompleteInfo {
  checked?: string | number | boolean
}

export interface UserInfo {
  name: string
  description: string
  uid: bigint
  isAutoRec: boolean
  isRemind: boolean
  isRecDanmu: boolean
  sex: string
  sign: string
  appointmentRecord: boolean
}

export interface RoomInfo {
  roomId: number
  title: string
  attention: number
  liveTime: number
  liveStatus: boolean
  shortId: number
  areaName: string
  face: string
  tags: string
  coverFromUser: string
  keyFrame: string
  url: string
}

export interface TaskStatus {
  isDownload: boolean
  downloadSize: number
  status: number
  startTime: string
  endTime: string
  title: string
}

export interface FileTreeNode {
  Name: string
  Type: FileTreeType
  Size: Optional<number>
  RelativePath: Optional<string>
  Extension: Optional<string>
  Children: FileTreeNode[]
}

export interface WsData {
  Title: {
    Value: string
  }
  description: {
    Value: string
  }
  live_time: {
    Value: number
  }
  live_status: {
    Value: number
  }
  live_status_end_event: boolean
  short_id: {
    Value: number
  }
  cover_from_user: string
  keyframe: string
  CurrentMode: number
  DownInfo: {
    IsDownload: boolean
    IsCut: boolean
    taskType: number
    DownloadSize: number
    RealTimeDownloadSpe: number
    Status: number
    StartTime: string
    EndTime: string
    DownloadFileList: {
      TranscodingCount: number
      VideoFile: unknown[]
      DanmuFile: unknown[]
      SCFile: unknown[]
      GiftFile: unknown[]
      GuardFile: unknown[]
    }
  }
  Name: string
  Description: string
  RoomId: number
  UID: number
  IsAutoRec: boolean
  IsRemind: boolean
  IsRecDanmu: boolean
  Like: boolean
  Shell: string
  AppointmentRecord: boolean
}
