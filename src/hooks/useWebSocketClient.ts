import mitt from 'mitt'
import { useWebSocket } from '@vueuse/core'
import type { WsEvent } from '@/enums'
import type { ObjEnumStringKey, ObjEnumValues } from '@/types'
import type { WsData } from '@/types/response'

type cmdString = ObjEnumStringKey<typeof WsEvent>
type WsEventCodes = ObjEnumValues<typeof WsEvent>
interface WsResponse {
  code: WsEventCodes
  cmd: cmdString
  massage: string
  data: WsData | null
}

const { emit, on } = mitt<Record<WsEventCodes, WsResponse>>()

const wsClient = useWebSocket(`ws://${location.host}/ws`, {
  onMessage(ws, event) {
    const data: WsResponse = JSON.parse(event.data as string)
    emit(data.code, data)
  },
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      console.error('WebSocket连接失败')
    }
  }
})

const useWebSocketClient = () => {
  return { wsClient, on }
}

export default useWebSocketClient
