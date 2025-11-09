<template>
  <footer>
    <section>
      <img src="../../assets/img/logo-game-text.png" alt="" />
    </section>
    <section>
      <p>&#169; Krooby & Inkking</p>
      <section>
        <a href="">
          <img src="../../assets/img/icons/discord.png" alt="" />
        </a>
        <a href="">
          <img src="../../assets/img/icons/itch.png" alt="" />
        </a>
        <a href="">
          <img src="../../assets/img/icons/github.png" alt="" />
        </a>
        <a href="">
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
  padding: 0 var(--global-padding);
  background-color: var(--terciary-background-color);

  section:first-child {
    img {
      width: 100px;
    }
  }

  section:nth-child(2) {
    section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      a {
        img:nth-child(2n - 1) {
          width: 35px;
        }
        img:nth-child(2) {
          width: 45px;
        }
        img:nth-child(4) {
          width: 40px;
        }
      }
    }
  }
}
</style>
