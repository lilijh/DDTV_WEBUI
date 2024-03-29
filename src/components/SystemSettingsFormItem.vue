<template>
  <ElFormItem :label="label">
    <div class="w-full flex justify-between space-x-4">
      <ElInput v-model="inputValue"></ElInput>
      <ElPopover :visible="popoverVisible" @before-enter="handleAction(actionData)">
        <template #reference>
          <ElButton type="primary" @click="popoverVisible = true">应用</ElButton>
        </template>
        <span>{{ popoverMsg }}</span>
        <div class="flex justify-between">
          <ElButton size="small" @click="popoverVisible = false">取消</ElButton>
          <ElButton
            size="small"
            type="primary"
            v-if="validateKey !== -1"
            @click="handleConfirm(confirmData)">
            确定
          </ElButton>
        </div>
      </ElPopover>
    </div>
  </ElFormItem>
</template>
<script lang="ts" setup>
interface SettingsParams {
  action: (data: any) => Promise<any>
  data: any
  inputDataKey: string
  successMessage: string
  errorMessage: string
}
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  mountedFunction: {
    type: Function as PropType<() => Promise<any>>,
    default: () => {}
  },
  actionData: {
    type: Object as PropType<SettingsParams>,
    default: () => {}
  },
  confirmData: {
    type: Object as PropType<SettingsParams>,
    default: () => {}
  }
})

const validateKey = ref()
const inputValue = ref()
const popoverMsg = ref()
const popoverVisible = ref(false)
const router = useRouter()

const handleAction = ({
  action,
  data,
  inputDataKey,
  successMessage,
  errorMessage
}: SettingsParams) => {
  data[inputDataKey] = inputValue.value
  action(data)
    .then((res) => {
      validateKey.value = res.data.data
      popoverMsg.value = successMessage
    })
    .catch(() => {
      validateKey.value = -1
      popoverMsg.value = errorMessage
    })
}
const handleConfirm = ({
  action,
  data,
  inputDataKey,
  successMessage,
  errorMessage
}: SettingsParams): void => {
  data[inputDataKey] = inputValue.value
  data = { check: validateKey.value, ...data }
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
