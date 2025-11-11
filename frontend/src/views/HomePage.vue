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
    <section class="about-section">
      <h2>Learn More</h2>
      <Article>
        <h3>About the game</h3>
        <p>
          Irure mollit culpa laboris nostrud mollit. Sint dolore amet pariatur fugiat. Laborum ea ex
          veniam proident adipisicing anim. Proident laboris dolor qui tempor Lorem esse officia
          ullamco ea exercitation labore. Aute anim voluptate proident dolore velit fugiat voluptate
          minim esse velit minim laborum. Magna fugiat cupidatat adipisicing aliquip sunt qui minim
          commodo et et sunt. Qui culpa excepteur est officia duis nostrud cillum enim consequat.
          Dolor in adipisicing veniam ipsum tempor excepteur aliquip. Nisi duis ut nulla non aliquip
          laboris nulla fugiat irure ipsum magna. Proident ad nostrud veniam exercitation fugiat ut
          incididunt ullamco officia reprehenderit deserunt nisi dolore. Reprehenderit esse do enim
          pariatur cupidatat deserunt sunt consequat est sit voluptate dolore minim. Aliqua ut elit
          aute et ut voluptate cupidatat non Lorem aliqua qui aliquip nulla pariatur. Enim quis sint
          dolor esse culpa excepteur duis ex occaecat fugiat commodo. Et esse eu pariatur ullamco
          excepteur magna et esse sunt sit. Laborum ea dolor do enim fugiat aute quis commodo minim
          occaecat esse laboris pariatur. Enim id ipsum ut dolore cupidatat. Qui sit sit deserunt
          culpa laboris commodo dolor ex in ullamco id sint occaecat. Veniam exercitation quis ea
          officia irure aute excepteur aliqua incididunt eiusmod.Minim ea est labore ea laborum
          dolor veniam. Veniam cupidatat enim culpa amet cillum non consectetur labore et pariatur
          fugiat cupidatat. Elit et tempor officia culpa proident fugiat aliqua aliqua ullamco aute
          ut. Ipsum officia fugiat cupidatat qui sint sunt quis dolore. Lorem magna dolor dolore
          consectetur eiusmod magna quis ullamco. Minim quis reprehenderit nisi pariatur
          exercitation excepteur proident proident Lorem sint et qui exercitation. Sint cupidatat
          fugiat duis pariatur adipisicing sit.
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
      <Article>
        <h3>About the download</h3>
        <p>
          Irure mollit culpa laboris nostrud mollit. Sint dolore amet pariatur fugiat. Laborum ea ex
          veniam proident adipisicing anim. Proident laboris dolor qui tempor Lorem esse officia
          ullamco ea exercitation labore. Aute anim voluptate proident dolore velit fugiat voluptate
          minim esse velit minim laborum. Magna fugiat cupidatat adipisicing aliquip sunt qui minim
          commodo et et sunt. Qui culpa excepteur est officia duis nostrud cillum enim consequat.
          Dolor in adipisicing veniam ipsum tempor excepteur aliquip. Nisi duis ut nulla non aliquip
          laboris nulla fugiat irure ipsum magna. Proident ad nostrud veniam exercitation fugiat ut
          incididunt ullamco officia reprehenderit deserunt nisi dolore. Reprehenderit esse do enim
          pariatur cupidatat deserunt sunt consequat est sit voluptate dolore minim. Aliqua ut elit
          aute et ut voluptate cupidatat non Lorem aliqua qui aliquip nulla pariatur. Enim quis sint
          dolor esse culpa excepteur duis ex occaecat fugiat commodo. Et esse eu pariatur ullamco
          excepteur magna et esse sunt sit. Laborum ea dolor do enim fugiat aute quis commodo minim
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
import { useRoute, useRouter } from 'vue-router'
import disorderImage from '../assets/img/spr_Disorder.png'
import marianneImage from '../assets/img/spr_MariannE.jpg'

const router = useRouter()
</script>

<style lang="scss" scoped>
main {
  h2 {
    color: white;
    font-weight: 600;
    font-size: var(--large-text-size);
    text-align: center;
    margin-bottom: 40px;
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
      gap: 70px;
      @media (max-width: 1410px) {
        gap: 40px;
      }
      @media (max-width: 830px) {
        flex-direction: column;
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
