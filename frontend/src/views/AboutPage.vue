<template>
  <main>
    <h1>Learn more about this project</h1>
    <section class="article-container">
      <Article class="article" :margin="200">
        <img src="../assets/img/ilustration/level.png" alt="Illustration image" />
        <h2>About the game</h2>
        <p>
          This game is a rhythm-based project currently being developed by two junior developers,
          Krooby and Inkking. It is inspired by the gameplay and audiovisual style of Just Shapes &
          Beats and focuses on dodging obstacles in sync with music. The project includes two main
          community-oriented features: a multiplayer mode and a map editor. Players can also upload
          their created beatmaps to the platform, where they can be viewed shared and played by
          others. The game aims to provide a rhythm experience with tools for both playing together
          and creating content.
        </p>
      </Article>
      <Article class="article" :margin="200">
        <img src="../assets/img/ilustration/story.png" alt="Illustration image" />
        <h2>About the creators</h2>
        <p>
          The game and its web platform are developed by two Czech students studying at SSPŠ in the
          Czech Republic. Krooby has mainly worked on the design of the game and is also responsible
          for developing the community-focused web platform, which allows players to upload, share,
          and rate beatmaps. Inkking focuses on programming and implementing most of the game's
          features, including the level editor and other gameplay mechanics. Together, they combine
          their skills in design, programming, and development to create both the rhythm game and
          the web platform, providing a space where players can engage with the game and contribute
          content to the community.
        </p>
      </Article>
      <Article class="article" :margin="200">
        <img src="../assets/img/ilustration/menu.png" alt="Illustration image" />
        <h2>Why was this project created</h2>
        <p>
          The game was originally created as part of a student project at our school. Currently, as
          part of a graduation project, Krooby is developing the web platform while Inkking is
          improving the game and adding new features such as multiplayer. The main motivation behind
          this project is that the original game is very enjoyable, but it lacks community-driven
          features like level creation. This inspired us to build both the game and the platform to
          allow players to create, share, and interact with custom content.
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
  @media (min-width: 2000px) {
    width: 1600px;
    margin: 0 auto;
    padding: 150px 0;
  }

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
        color: var(--terciary-foreground-color);
        line-height: 1.5;
        font-size: var(--small-text-size);
      }

      img {
        object-fit: cover;
        height: 400px;
        width: 1200px;
      }
    }
  }
}
</style>
