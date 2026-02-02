<template>
  <main class="main-container">
    <h1>Your uploaded beatmaps</h1>
    <Article>
      <section>
        <section @click="openAddBeatmap = true">
          <i class="fa-solid fa-plus"></i>
          <p>Add Beatmap</p>
        </section>
        <Button
          title="Log out"
          :fontSize="20"
          :paddingHorizontal="25"
          :paddingVertical="10"
          buttonType="primary"
          @click="logout()"
        ></Button>
      </section>

      <Dialog
        v-if="openAddBeatmap"
        @close="!isSubmitting && (openAddBeatmap = false)"
        class="add-beatmap"
      >
        <form @submit.prevent="submit">
          <h3>Upload your own Beatmap</h3>
          <label for="title">Upload the file</label>
          <FileUpload @fileSelected="onFileSelected"></FileUpload>

          <section class="button-section">
            <div v-if="isSubmitting" class="loader-wrap">
              <i class="fa-solid fa-circle-notch fa-spin"></i>
              <span>Uploading to server...</span>
            </div>

            <template v-else>
              <Button
                title="Submit"
                :fontSize="18"
                :paddingHorizontal="25"
                :paddingVertical="10"
                buttonType="primary"
                type="submit"
              ></Button>
              <Button
                title="Exit"
                :fontSize="18"
                :paddingHorizontal="25"
                :paddingVertical="10"
                buttonType="secondary"
                @click="openAddBeatmap = false"
              ></Button>
            </template>
          </section>
        </form>
      </Dialog>

      <section>
        <h2>Manage your beatmaps</h2>
        <section>
          <BeatmapPreview
            v-for="beatmap in beatmaps"
            :key="beatmap.id"
            :id="beatmap.id"
            :img="beatmap.img"
            :title="beatmap.name"
            :artist="beatmap.musicAuthor || 'Unknown'"
            :creator="beatmap.creatorName"
            :dashboard="false"
            @delete="manageDeleteBeatmap"
          ></BeatmapPreview>
        </section>
      </section>
    </Article>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { postFile, deleteBeatmap } from '@/composables/api'
import { loadUserBeatmaps } from '@/composables/beatmapArray'
import router from '@/router'

const openAddBeatmap = ref(false)
const isSubmitting = ref(false)
const beatmaps = ref<any[]>([])
let selectedFile: File | null = null

const logout = () => {
  localStorage.clear()
  router.push('/')
}

const manageDeleteBeatmap = async (id: number) => {
  await deleteBeatmap(id)
  beatmaps.value = beatmaps.value.filter((b) => b.id !== id)
}

const onFileSelected = (file: File) => {
  selectedFile = file
}

const submit = async () => {
  if (!selectedFile || isSubmitting.value) return

  isSubmitting.value = true

  try {
    await postFile(selectedFile)
    window.location.reload()
  } catch (error) {
    console.error('Upload failed:', error)
    alert('Upload failed. Please check the file and try again.')
    isSubmitting.value = false
  }
}

onMounted(async () => {
  const user = localStorage.getItem('user')
  if (!user) return

  const obj = JSON.parse(user) as any
  const data = await loadUserBeatmaps(obj.id)
  beatmaps.value = data
})
</script>

<style lang="scss" scoped>
.main-container {
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 var(--global-padding);
  margin-bottom: 100px;
  @media (min-width: 2000px) {
    width: 1600px;
    margin: 0 auto;
    margin-bottom: 100px;
  }

  h1 {
    color: white;
    font-weight: 600;
    font-size: var(--large-text-size);
    text-align: center;
  }

  Article {
    display: flex;
    flex-direction: column;

    & > section:first-child {
      align-self: flex-end;
      display: flex;
      align-items: center;
      gap: 40px;

      @media(max-width: 545px){
        flex-direction: column;
        align-self: center;
      }
      section {
        display: flex;
        color: var(--terciary-foreground-color);
        font-size: var(--medium-text-size);
        gap: 10px;
        align-items: center;
        cursor: pointer;
        i {
          font-size: 30px;
        }
        &:hover {
          color: var(--primary-foreground-color);
          transition: 0.3s ease;
        }
      }
    }

    & > section:nth-child(2) {
      width: 100%;
      h2 {
        font-weight: 600;
        font-size: var(--larger-text-size);
        color: var(--primary-foreground-color);
        margin-bottom: 30px;
      }
      section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        width: 100%;
        margin-bottom: 30px;
        @media(max-width: 900px){
          grid-template-columns: 1fr;
        }
      }
    }
  }

  .add-beatmap {
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      h3 {
        color: white;
        font-size: var(--medium-text-size);
        font-weight: 600;
        margin-bottom: 10px;
      }

      label {
        color: var(--terciary-foreground-color);
        font-size: 16px;
        margin-top: 5px;
        text-align: left;
      }

      .button-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        min-height: 50px;
      }

      .loader-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        color: var(--primary-foreground-color);

        i {
          font-size: 32px;
        }

        span {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
}

.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
