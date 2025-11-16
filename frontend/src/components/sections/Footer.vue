<template>
  <footer>
    <section>
      <img src="../../assets/img/logo-game-text.png" alt="" />
    </section>
    <section>
      <p>&#169; Krooby & Inkking</p>
      <section>
        <a href="https://discord.gg/FFdJgJQH" target="_blank">
          <img src="../../assets/img/icons/discord.png" alt="" />
        </a>
        <a href="https://inkk-ing.itch.io/osab" target="_blank">
          <img src="../../assets/img/icons/itch.png" alt="" />
        </a>
        <a href="https://github.com/matty147/OSAB" target="_blank">
          <img src="../../assets/img/icons/github.png" alt="" />
        </a>
        <a href="https://x.com/Matty_inkk" target="_blank">
          <img src="../../assets/img/icons/twitter.png" alt="" />
        </a>
      </section>
    </section>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--global-padding);
  background-color: var(--terciary-background-color);

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
