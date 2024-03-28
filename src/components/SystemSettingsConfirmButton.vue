<template>
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
</template>
<script lang="ts" setup>
interface SettingsParams {
  action: (data: any) => Promise<any>
  data: any
  successMessage: string
  errorMessage: string
}
defineProps({
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
const popoverMsg = ref()
const popoverVisible = ref(false)

const handleAction = ({ action, data, successMessage, errorMessage }: SettingsParams) => {
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
const handleConfirm = ({ action, data, successMessage, errorMessage }: SettingsParams): void => {
  action({ check: validateKey.value, ...data })
    .then(() => {
      popoverVisible.value = false
      ElMessage.success(successMessage)
    })
    .catch(() => {
      ElMessage.error(errorMessage)
    })
}
</script>
<style scoped lang="scss"></style>
