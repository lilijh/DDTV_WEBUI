<template>
  <ElFormItem :label="label">
    <div class="w-full flex justify-between space-x-4">
      <ElInput v-if="type == inputTypes.TEXT" v-model="inputValue"></ElInput>
      <ElSwitch v-if="type == inputTypes.BOOLEAN" v-model="inputValue"></ElSwitch>
      <ElPopover :visible="popoverVisible" @before-enter="handleAction()">
        <template #reference>
          <ElButton type="primary" @click="popoverVisible = true">应用</ElButton>
        </template>
        <span>{{ popoverMsg }}</span>
        <div class="flex justify-between">
          <ElButton size="small" @click="popoverVisible = false">取消</ElButton>
          <ElButton size="small" type="primary" v-if="validateKey !== -1" @click="handleConfirm()">
            确定
          </ElButton>
        </div>
      </ElPopover>
    </div>
  </ElFormItem>
</template>
<script lang="ts" setup>
import inputTypes from '@/enums/form_item_input_types'

interface ActionParams {
  action?: (data: any) => Promise<any>
  data?: any
  inputDataKey?: string
  successMessage: string
  errorMessage: string
}
type ConfirmParams = Required<ActionParams>

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<inputTypes>,
    required: true
  },
  mountedFunction: {
    type: Function as PropType<() => Promise<any>>,
    required: true
  },
  actionData: {
    type: Object as PropType<ActionParams>,
    required: true
  },
  confirmData: {
    type: Object as PropType<ConfirmParams>,
    required: true
  }
})

const validateKey = ref()
const inputValue = ref()
const popoverMsg = ref()
const popoverVisible = ref(false)
const router = useRouter()

const handleAction = () => {
  const { action, data, inputDataKey, successMessage, errorMessage } = props.actionData
  popoverMsg.value = successMessage
  if (!action || !inputDataKey) return
  data[inputDataKey] = inputValue.value

  action(data)
    .then((res) => {
      validateKey.value = res.data.data
    })
    .catch(() => {
      validateKey.value = -1
      popoverMsg.value = errorMessage
    })
}
const handleConfirm = (): void => {
  const { action, data, inputDataKey, successMessage, errorMessage } = props.confirmData
  data[inputDataKey] = inputValue.value
  data['check'] = validateKey.value
  action(data)
    .then(() => {
      popoverVisible.value = false
      ElMessage.success(successMessage)
      router.go(0)
    })
    .catch(() => {
      ElMessage.error(errorMessage)
    })
}
onMounted(() => {
  props.mountedFunction().then((res) => {
    inputValue.value = res.data.data
  })
})
</script>
<style scoped lang="scss"></style>
