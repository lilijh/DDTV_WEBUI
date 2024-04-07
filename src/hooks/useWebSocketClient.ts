import mitt from 'mitt'
import { useWebSocket } from '@vueuse/core'
import type { WsEvent } from '@/enums'
import type { InnerObjectKeysOfType, InnerObjectValuesOfType } from '@/types'

type CmdString = InnerObjectKeysOfType<typeof WsEvent>
type WsEventCodes = InnerObjectValuesOfType<typeof WsEvent>
interface WsResponse<T> {
  code: WsEventCodes
  cmd: CmdString
  massage: string
  data: T
}

const { emit, on } = mitt<Record<WsEventCodes, WsResponse<any | null>>>()

const wsClient = useWebSocket(`ws://${location.host}/ws`, {
  onMessage(ws, event) {
    const data: WsResponse<any | null> = JSON.parse(event.data as string)
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
