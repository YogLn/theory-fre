<template>
  <div class="publish">
    <div class="add-moment">
      <a-form-item>
        <a-textarea :rows="4" v-model="mommentContent" placeholder="说说你想说的话~" allowClear />
      </a-form-item>

      <a-upload v-if="picList.length < 9" :action="uploadURL" list-type="picture-card" :headers="headerObj" :file-list="picList" @preview="handlePreview" @change="handleChange">
        <div>
          <a-icon type="plus" />
          <div class="ant-upload-text">
            上传图片
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>

      <a-form-item>
        <a-button html-type="submit" :loading="submitLoading" type="primary" @click="handleMomment">
          发表动态
        </a-button>
      </a-form-item>
    </div>
  </div>
</template>

<script>
import { getBase64 } from '../../utils/handle-img'
export default {
  data() {
    return {
      query: {},
      mommentContent: '',
      submitLoading: false,
      picList: [],
      previewImage: '',
      previewVisible: false,
      headerObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      uploadURL: 'http://121.4.100.103:5000/upload/picture',
    }
  },
  methods: {
    async handleMomment() {
      if (!this.mommentContent) {
        return this.$message.info('请输入动态内容')
      }
      this.submitLoading = true
      const result = await this.$http.post('moment', {
        content: this.mommentContent,
      })
      if (result.status !== 200) {
        return this.$message.error('发表动态失败')
      }
      const momentId = result.data.insertId
      this.handlePicture(momentId)
    },
    async handlePicture(momentId) {
      const formData = new FormData()
      this.picList.forEach((item) => {
        formData.append('picture', item.originFileObj)
      })
      const res = await this.$http.post(
        `/upload/picture?momentId=${momentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: window.sessionStorage.getItem('token'),
          },
        }
      )
      this.submitLoading = false
      if (res.status !== 200) {
        return this.$message.error('动态配图失败')
      }
      this.$message.success('发表动态成功')
      this.mommentContent = ''
    },

    /**
     *图片上传处理相关逻辑
     */
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleCancel() {
      this.previewVisible = false
    },
    handleChange({ fileList }) {
      this.picList = fileList
    },
  },
}
</script>

<style lang="less" scoped>
.publish {
  position: relative;
  margin-top: 50px;
  width: 60%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .add-moment {
    margin-top: 30px;
  }
}
</style>