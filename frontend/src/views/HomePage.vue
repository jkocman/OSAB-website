<template>
  <main>
    <section>
      <h1>Open <span>Shapes</span> & <span>Beats</span></h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit officia perferendis maiores
        facere perspiciatis asperiores, vero inventore consequuntur omnis, voluptate.
      </p>
      <section class="button-container">
        <Button
          title="Download"
          :fontSize="22"
          :paddingHorizontal="35"
          :paddingVertical="10"
          buttonType="primary"
          @click="router.push('/download')"
        ></Button>
        <Button
          title="Learn more"
          :fontSize="22"
          :paddingHorizontal="35"
          :paddingVertical="10"
          buttonType="reverse"
          @click="router.push('/about')"
        ></Button>
      </section>
    </section>
    <section class="beatmap-section">
      <h2>Search Comunity Beatmaps</h2>
      <section>
        <ImageButton :url="disorderImage" class="card" @click="router.push('/beatmaps')">
          <h3>Popular Beatmaps</h3>
          <p>
            Occaecat commodo magna enim mollit pariatur commodo consectetur tempor. Commodo eu do
            incididunt ipsum non.
          </p>
        </ImageButton>
        <ImageButton :url="marianneImage" class="card" @click="router.push('/beatmaps')">
          <h3>New Beatmaps</h3>
          <p>
            Occaecat commodo magna enim mollit pariatur commodo consectetur tempor. Commodo eu do
            incididunt ipsum non.
          </p>
        </ImageButton>
      </section>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import disorderImage from '../assets/img/spr_Disorder.png'
import marianneImage from '../assets/img/spr_MariannE.jpg'

const router = useRouter()
</script>

<style lang="scss" scoped>
main {
  section:first-child {
    background:
      linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('../assets/img/osab.jpeg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    height: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    text-align: center;
    color: white;
    margin-bottom: 100px;

    h1 {
      font-weight: 600;
      font-size: var(--xl-text-size);
    }
    span:first-child {
      color: var(--secondary-foreground-color);
    }
    span:nth-child(2) {
      color: var(--primary-foreground-color);
    }
    p {
      width: 1200px;
      font-size: var(--medium-text-size);
      line-height: 1.2;
      color: var(--terciary-foreground-color);
    }
    .button-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      margin-top: 10px;
    }
  }
  .beatmap-section {
    margin: 0 var(--global-padding);
    margin-bottom: 100px;
    section {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h2 {
      color: white;
      font-weight: 600;
      font-size: var(--large-text-size);
      text-align: center;
      margin-bottom: 40px;
    }

    .card {
      text-align: center;
      h3 {
        font-weight: 600;
        font-size: var(--larger-text-size);
      }

      &:first-child h3 {
        color: var(--primary-foreground-color);
      }

      &:nth-child(2) h3 {
        color: var(--secondary-foreground-color);
      }

      p {
        color: var(--terciary-foreground-color);
        font-size: var(--small-text-size);
      }
    }
  }
}
</style>
