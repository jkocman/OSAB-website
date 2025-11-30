<template>
  <footer :style="responsive()">
    <section class="content">
      <section>
        <img src="../../assets/img/logo-game-text.png" alt="Logo" />
      </section>
      <section>
        <p>&#169; Krooby & Inkking</p>
        <section>
          <a href="https://discord.gg/FFdJgJQH" target="_blank">
            <img src="../../assets/img/icons/discord.png" alt="Discord icon" />
          </a>
          <a href="https://inkk-ing.itch.io/osab" target="_blank">
            <img src="../../assets/img/icons/itch.png" alt="Itch icon" />
          </a>
          <a href="https://github.com/matty147/OSAB" target="_blank">
            <img src="../../assets/img/icons/github.png" alt="Github icon" />
          </a>
          <a href="https://x.com/Matty_inkk" target="_blank">
            <img src="../../assets/img/icons/twitter.png" alt="Tiwtter icon" />
          </a>
        </section>
      </section>
    </section>
  </footer>
</template>

<script lang="ts" setup>

const responsive = () => {
  const pageHeight = document.documentElement.scrollHeight
  const viewportHeight = window.innerHeight

  if (pageHeight <= viewportHeight) {
    return {
      position: 'absolute' as const,
      bottom: '0',
      left: '0',
      width: '100%',
    }
  }

  return {
    position: 'static' as const,
  }
}

</script>

<style lang="scss" scoped>
footer {
  background-color: var(--terciary-background-color);
  padding: 10px var(--global-padding);
  .content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (min-width: 2000px) {
      width: 1600px;
      margin: 0 auto;
    }
  }
  section:first-child {
    img {
      width: 100px;
      @media (max-width: 1400px) {
        width: 75px;
      }
    }
  }

  section:nth-child(2) {
    p {
      color: white;
      font-size: var(--footer-text-size);
      margin-bottom: 10px;
      @media (max-width: 1400px) {
        font-size: 18px;
      }
    }
    section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      a {
        img {
          width: 35px;
          @media (max-width: 1400px) {
            width: 25px;
          }
        }
      }
    }
  }
}
</style>
