<template>
  <div class="h-full p-4">
    <ElCard shadow="never" class="h-full" body-class="h-full">
      <div class="h-full w-full" ref="bodyEl">
        <ElButton ref="buttonEl" class="mb-2" @click="handleReloadConfig">
          重新加载配置文件
        </ElButton>
        <ElForm class="max-w-550px">
          <SystemSettingsFormItem
            v-for="(item, index) in formItemList"
            :key="index"
            :label="item.label"
            :action-data="item.actionData"
            :confirm-data="item.confirmData"
            :mounted-function="item.mountedFunction"></SystemSettingsFormItem>

          <ElCollapse class="max-w-550px">
            <ElCollapseItem title="模板变量说明">
              <ElTable
                :height="
                  bodySize.height.value -
                  (buttonSize.height.value + 8) -
                  50 * formItemList.length -
                  50
                "
                :data="templateTableData"
                stripe>
                <ElTableColumn prop="template" label="变量" width="150" />
                <ElTableColumn prop="explain" label="说明" width="250" />
                <ElTableColumn prop="result" label="效果" width="150" />
              </ElTable>
            </ElCollapseItem>
          </ElCollapse>
        </ElForm>
      </div>
    </ElCard>
  </div>
</template>
<script lang="ts" setup>
import moment from 'moment'
import { useElementSize } from '@vueuse/core'
import {
  getFileNameAndPath,
  getRecordingPath,
  setFileNameAndPath,
  setRecordingPath,
  reloadConfig
} from '@/api/config'
import SystemSettingsFormItem from '@/components/SystemSettingsFormItem.vue'

const router = useRouter()

const date = moment()

const bodyEl = ref()
const buttonEl = ref()

const bodySize = useElementSize(bodyEl)
const buttonSize = useElementSize(buttonEl)

const formItemList = ref([
  {
    label: '存放目录',
    mountedFunction: getRecordingPath,
    actionData: {
      action: setRecordingPath,
      data: {},
      inputDataKey: 'path',
      successMessage: '你确定要修改存放目录吗？',
      errorMessage: '存放目录错误，请重新校验'
    },
    confirmData: {
      action: setRecordingPath,
      data: {},
      inputDataKey: 'path',
      successMessage: '修改成功',
      errorMessage: '修改失败，未知错误'
    }
  },
  {
    label: '路径模板',
    mountedFunction: getFileNameAndPath,
    actionData: {
      action: setFileNameAndPath,
      data: {},
      inputDataKey: 'path_and_format',
      successMessage: '你确定要修改路径模板吗？',
      errorMessage: '路径模板错误，请重新校验'
    },
    confirmData: {
      action: setFileNameAndPath,
      data: {},
      inputDataKey: 'path_and_format',
      successMessage: '修改成功',
      errorMessage: '修改失败，未知错误'
    }
  }
])

const templateTableData = [
  {
    template: '{ROOMID}',
    explain: '房间号',
    result: '123456'
  },
  {
    template: '{NAME}',
    explain: '主播用户名',
    result: '小明'
  },
  {
    template: '{TITLE}',
    explain: '直播间标题',
    result: '我是标题'
  },
  {
    template: '{DATE}',
    explain: '文件创建日期时间',
    result: date.format('YYYY_MM_DD')
  },
  {
    template: '{YYYY}/{yyyy}',
    explain: '文件创建日期时间之年份',
    result: date.format('YYYY')
  },
  {
    template: '{YY}/{yy}',
    explain: '文件创建日期时间之年份后两位',
    result: date.format('YY')
  },
  {
    template: '{MM}',
    explain: '文件创建日期时间之月份',
    result: date.format('MM')
  },
  {
    template: '{DD}/{dd}',
    explain: '文件创建日期时间之天数',
    result: date.format('DD')
  },
  {
    template: '{HH}',
    explain: '文件创建日期时间之小时',
    result: date.format('HH')
  },
  {
    template: '{hh}',
    explain: '文件创建日期时间之小时(12小时制)',
    result: date.format('hh')
  },
  {
    template: '{mm}',
    explain: '文件创建日期时间之分钟',
    result: date.format('mm')
  },
  {
    template: '{ss}',
    explain: '文件创建日期时间之秒钟',
    result: date.format('ss')
  },
  {
    template: '{FFF}',
    explain: '文件创建日期时间之毫秒',
    result: date.format('SSS')
  },
  {
    template: '{R}',
    explain: '随机字符串',
    result: 'abc123456'
  },
  {
    template: '/',
    explain: '文件夹分隔符',
    result: '/'
  }
]

const handleReloadConfig = () => {
  reloadConfig()
    .then(() => {
      ElMessage.success('刷新成功')
      router.go(0)
    })
    .catch(() => {
      ElMessage.error('刷新失败，未知错误')
    })
}
</script>
<style scoped></style>
