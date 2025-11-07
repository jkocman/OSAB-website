<template>
  <main>
    <section>
      <p>asdasdas</p>
      <h1>Open <span>Shapes</span> & <span>Beats</span></h1>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  section {
    background:
      linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('../assets/img/osab.jpeg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;

    h1 {
      font-size: 3rem;
    }

    span:nth-child(2) {
      color: #ff3366;
    }
  }
}
</style>
