<template>
  <main>
    <section>
      <h1>Open <span>Shapes</span> & <span>Beats</span></h1>
      <p>
        An open, fully customizable rhythm-action experience inspired by Just Shapes & Beats, giving
        players the freedom to create, share, and play their own pulse-pounding maps.
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
        <ImageButton :url="disorderImage" class="card" @click="handlePopular()">
          <h3>Popular Beatmaps</h3>
          <p>Search through the most popular community created beatmaps for Open Shapes & Beats</p>
        </ImageButton>
        <ImageButton :url="marianneImage" class="card" @click="handleNew()">
          <h3>New Beatmaps</h3>
          <p>Search through the newest community created beatmaps for Open Shapes & Beats</p>
        </ImageButton>
      </section>
    </section>
    <section class="about-section">
      <h2>Learn More</h2>
      <Article :margin="200">
        <h3>About the game</h3>
        <p>
          Open Shapes & Beats is an open-source rhythm-action project inspired by the fast-paced
          chaos of Just Shapes & Beats, designed for players who want more than just playing
          levels—they want to create them. Built around music-driven gameplay, the project
          transforms every beat, melody, and drop into an interactive challenge where shapes dance,
          bullets explode to the rhythm, and survival becomes a matter of timing and creativity. At
          its core, Open Shapes & Beats is a toolset and sandbox that lets anyone design their own
          levels, craft unique bullet patterns, sync effects to music, and experiment with
          rhythm-based mechanics. Whether you want to recreate your favorite tracks, build intense
          boss-style sequences, or explore experimental visual designs, the editor gives you full
          control. And because the project is fully open and community-driven, players can share
          their creations, collaborate on larger map packs, and continuously expand the experience
          far beyond what a traditional rhythm game offers. The gameplay remains faithful to the
          spirit of the original inspiration—simple to understand, challenging to master. You
          control only movement; the world does everything else. But every map has its own
          personality, shaped entirely by the creator's imagination. With customizable visuals,
          dynamic audio-reactive effects, and modern modding possibilities, no two levels ever feel
          the same. Whether you're a player looking for new rhythmic challenges, a creator searching
          for a powerful mapping platform, or simply a fan of music-driven gameplay, Open Shapes &
          Beats invites you to jump in, experiment, and shape your own beat-powered world.
        </p>
        <Button
          title="Learn more"
          :fontSize="18"
          :paddingHorizontal="30"
          :paddingVertical="10"
          buttonType="secondary"
          @click="router.push('/about')"
        ></Button>
      </Article>
    </section>
    <section class="download-section">
      <h2>Download</h2>
      <Article :margin="200">
        <h3>About the download</h3>
        <p>
          Get ready to dive into the full creative power of Open Shapes & Beats. By downloading the
          latest build, you gain access to everything the project offers — from the core
          rhythm-action gameplay to the complete suite of map-creation tools designed for creators
          of all levels. Whether you're here to play custom maps, experiment with new mechanics, or
          build entire music-driven worlds from scratch, the downloadable version gives you full
          control. Each release includes the most up-to-date features, optimizations, and
          improvements contributed by the community. You can explore user-made creations, test your
          own ideas, and help shape the project by giving feedback or contributing directly. Open
          Shapes & Beats is constantly evolving, and every new version pushes the boundaries of what
          rhythm-based games can be — and you can be part of that evolution with just a single
          download. No matter if you're a player looking for fresh challenges or a creator excited
          to craft your own beat-synced experiences, this is where your journey starts. Download the
          newest build and jump into a world where creativity and rhythm collide.
        </p>
        <Button
          title="Download"
          :fontSize="18"
          :paddingHorizontal="30"
          :paddingVertical="10"
          buttonType="primary"
          @click="router.push('/about')"
        ></Button>
      </Article>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import disorderImage from '../assets/img/spr_Disorder.png'
import marianneImage from '../assets/img/spr_MariannE.jpg'
import { useSelectionStore } from '@/stores/selection'

const router = useRouter()
const selectionStore = useSelectionStore()

const handlePopular = () => {
  router.push('/beatmaps')
  selectionStore.sortSelected = 'Most Downloaded'
}
const handleNew = () => {
  router.push('/beatmaps')
  selectionStore.sortSelected = 'Newest'
}
</script>

<style lang="scss" scoped>
main {
  h2 {
    color: white;
    font-weight: 600;
    font-size: var(--large-text-size);
    text-align: center;
    margin-bottom: 30px;
  }
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
      @media (max-width: 830px) {
        font-size: 60px;
      }
      @media (max-width: 620px) {
        font-size: 45px;
      }
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
      @media (max-width: 1230px) {
        width: 800px;
      }
      @media (max-width: 830px) {
        width: 600px;
      }
      @media (max-width: 620px) {
        width: 400px;
      }
      @media (max-width: 415px) {
        width: 250px;
      }
    }
    .button-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      margin-top: 10px;
      @media (max-width: 415px) {
        flex-direction: column;
        gap: 20px;
      }
    }
  }
  .beatmap-section {
    margin: 0 var(--global-padding);
    margin-bottom: 100px;
    section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: space-between;
      gap: 70px;
      @media (max-width: 1410px) {
        gap: 40px;
      }
      @media (max-width: 830px) {
        grid-template-columns: 1fr;
      }
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
  .about-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 var(--global-padding);
    margin-bottom: 100px;
    h3 {
      font-weight: 600;
      font-size: var(--larger-text-size);
      color: var(--secondary-foreground-color);
    }
    p {
      font-size: var(--small-text-size);
      color: white;
      line-height: 1.2;
    }
  }
  .download-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 var(--global-padding);
    margin-bottom: 100px;
    h3 {
      font-weight: 600;
      font-size: var(--larger-text-size);
      color: var(--primary-foreground-color);
    }
    p {
      font-size: var(--small-text-size);
      color: white;
      line-height: 1.2;
    }
  }
}
</style>
