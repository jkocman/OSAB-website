<template>
  <main>
    <h1>Learn more about this project</h1>
    <section class="article-container">
      <Article class="article" :margin="200">
        <img src="../assets/img/ilustration/level.png" alt="Illustration image" />
        <h2>About the game</h2>
        <p>
          Cillum id minim laboris deserunt consectetur nulla. Et est sunt sint incididunt id labore
          duis eu est in esse laboris. Magna incididunt anim Lorem non deserunt Lorem sunt ullamco
          labore non esse officia consequat. Ea officia esse consequat commodo. Deserunt magna
          voluptate consectetur sit enim mollit ex id ipsum anim tempor consequat. Non excepteur in
          enim reprehenderit dolor consequat. Mollit Lorem excepteur veniam deserunt id pariatur
          exercitation commodo mollit occaecat reprehenderit veniam esse. Sunt id consectetur ut
          cupidatat cillum quis esse. Dolore non esse ullamco sunt tempor do laborum mollit ex
          magna. Sint minim laboris Lorem sunt incididunt dolore enim eu. Id commodo consectetur ex
          est. Ut eiusmod duis qui mollit veniam ad commodo pariatur. Veniam sit laborum veniam
          pariatur sint labore ex nulla. Labore in veniam enim aute culpa fugiat.
        </p>
      </Article>
      <Article class="article" :margin="200">
        <img src="../assets/img/ilustration/story.png" alt="Illustration image" />
        <h2>About the creators</h2>
        <p>
          Cillum id minim laboris deserunt consectetur nulla. Et est sunt sint incididunt id labore
          duis eu est in esse laboris. Magna incididunt anim Lorem non deserunt Lorem sunt ullamco
          labore non esse officia consequat. Ea officia esse consequat commodo. Deserunt magna
          voluptate consectetur sit enim mollit ex id ipsum anim tempor consequat. Non excepteur in
          enim reprehenderit dolor consequat. Mollit Lorem excepteur veniam deserunt id pariatur
          exercitation commodo mollit occaecat reprehenderit veniam esse. Sunt id consectetur ut
          cupidatat cillum quis esse. Dolore non esse ullamco sunt tempor do laborum mollit ex
          magna. Sint minim laboris Lorem sunt incididunt dolore enim eu. Id commodo consectetur ex
          est. Ut eiusmod duis qui mollit veniam ad commodo pariatur. Veniam sit laborum veniam
          pariatur sint labore ex nulla. Labore in veniam enim aute culpa fugiat.
        </p>
      </Article>
      <Article class="article" :margin="200">
        <img src="../assets/img/ilustration/menu.png" alt="Illustration image" />
        <h2>Why was this project created</h2>
        <p>
          Cillum id minim laboris deserunt consectetur nulla. Et est sunt sint incididunt id labore
          duis eu est in esse laboris. Magna incididunt anim Lorem non deserunt Lorem sunt ullamco
          labore non esse officia consequat. Ea officia esse consequat commodo. Deserunt magna
          voluptate consectetur sit enim mollit ex id ipsum anim tempor consequat. Non excepteur in
          enim reprehenderit dolor consequat. Mollit Lorem excepteur veniam deserunt id pariatur
          exercitation commodo mollit occaecat reprehenderit veniam esse. Sunt id consectetur ut
          cupidatat cillum quis esse. Dolore non esse ullamco sunt tempor do laborum mollit ex
          magna. Sint minim laboris Lorem sunt incididunt dolore enim eu. Id commodo consectetur ex
          est. Ut eiusmod duis qui mollit veniam ad commodo pariatur. Veniam sit laborum veniam
          pariatur sint labore ex nulla. Labore in veniam enim aute culpa fugiat.
        </p>
      </Article>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 var(--global-padding);
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin-bottom: 100px;

  h1 {
    color: white;
    font-weight: 600;
    font-size: var(--large-text-size);
    text-align: center;
  }

  .article-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 100px;
    .article {
      padding-top: 0;
      overflow: hidden;
      h2 {
        font-weight: 600;
        font-size: var(--larger-text-size);
      }

      &:nth-child(2n - 1) h2 {
        color: var(--primary-foreground-color);
      }

      &:nth-child(2n) h2 {
        color: var(--secondary-foreground-color);
      }

      p {
        color: white;
        font-size: var(--small-text-size);
      }

      img {
        object-fit: cover;
        height: 400px;
        width: 1200px;
      }
    }
  }

  .article {
    padding-top: 0;
    overflow: hidden;
    h2 {
      font-weight: 600;
      font-size: var(--larger-text-size);
    }

    &:nth-child(2n - 1) h2 {
      color: var(--primary-foreground-color);
    }

    &:nth-child(2n) h2 {
      color: var(--secondary-foreground-color);
    }

    p {
      color: white;
      font-size: var(--small-text-size);
    }

    img {
      object-fit: cover;
      height: 400px;
      width: 1200px;
    }
  }
}
</style>
