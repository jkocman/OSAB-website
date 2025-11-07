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
  </main>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

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

    h1 {
      font-weight: 500;
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
    }
    .button-container{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      margin-top: 10px;
    }
  }
}
</style>
