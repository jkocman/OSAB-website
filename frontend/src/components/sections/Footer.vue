<template>
  <footer>
    <section>
      <img src="../../assets/img/logo-game-text.png" alt="" />
    </section>
    <section>
      <p>&#169; Krooby & Inkking</p>
      <section>
        <a href="" target="_blank">
          <img src="../../assets/img/icons/discord.png" alt="" />
        </a>
        <a href="" target="_blank">
          <img src="../../assets/img/icons/itch.png" alt="" />
        </a>
        <a href="" target="_blank">
          <img src="../../assets/img/icons/github.png" alt="" />
        </a>
        <a href="" target="_blank">
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
    }
  }

  section:nth-child(2) {
    p {
      color: white;
      font-size: var(--medium-text-size);
      margin-bottom: 10px;
    }
    section {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      a {
        img {
          width: 35px;
        }
      }
    }
  }
}
</style>
