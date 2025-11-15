<template>
  <main>
    <h1>Download Open Shapes & Beats</h1>
    <section class="image-container">
      <img src="../assets/img/ilustration/level.png" alt="" />
    </section>
    <section class="article-container">
      <Article>
        <h2>Download Links</h2>
        <ul class="download-links">
          <li>
            <section>
              <img src="../assets/img/icons/windows.png" alt="windows logo" />
              <p>OS&B-stable-build.zip</p>
              <p>82mb</p>
            </section>
            <Button
              title="Download"
              :fontSize="18"
              :paddingHorizontal="25"
              :paddingVertical="10"
              buttonType="primary"
              @click="downloadGame('osab_finalbuildv3.zip')"
            ></Button>
          </li>
          <li>
            <section>
              <img src="../assets/img/icons/windows.png" alt="windows logo" />
              <p>OS&B-experimental-build.zip</p>
              <p>82mb</p>
            </section>
            <Button
              title="Download"
              :fontSize="18"
              :paddingHorizontal="25"
              :paddingVertical="10"
              buttonType="primary"
              @click="downloadGame('osab_experimental.zip')"
            ></Button>
          </li>
        </ul>
      </Article>
      <Article>
        <h2>Installation instructions</h2>
        <ol class="instructions">
          <li>
            Culpa reprehenderit deserunt incididunt sunt tempor ut est enim occaecat qui minim enim
            sit anim.
          </li>
          <li>Labore tempor reprehenderit quis eiusmod culpa dolor elit nisi ea.</li>
          <li>Nulla et elit exercitation minim ad. Ullamco pariatur cillum laborum.</li>
        </ol>
      </Article>
    </section>
  </main>
</template>

<script lang="ts" setup>
// zatím jen lokálně (nepushuji na github), později na nějakém serveru.
function downloadGame(file: string) {
  const url = `/files/${file}`
  const link = document.createElement('a')
  link.href = url
  link.download = file
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style lang="scss" scoped>
main {
  padding-top: 150px;
  margin: 0 var(--global-padding);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 100px;

  h1 {
    color: white;
    font-weight: 600;
    font-size: var(--large-text-size);
    text-align: center;
  }

  .image-container {
    width: 1000px;
    border: 2px solid var(--highlight-color);
    border-radius: 20px;
    overflow: hidden;
    line-height: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .article-container {
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 40px;
    Article {
      width: 100%;
      padding: 50px;
      h2 {
        font-weight: 600;
        font-size: var(--larger-text-size);
      }
      &:first-child h2 {
        color: var(--primary-foreground-color);
      }
      &:nth-child(2) h2 {
        color: var(--secondary-foreground-color);
      }

      .download-links {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        li {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          section {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            img {
              width: 30px;
            }
            p {
              font-size: var(--small-text-size);
            }
            p:nth-child(2) {
              color: white;
            }
            p:nth-child(3) {
              color: var(--terciary-foreground-color);
            }
          }
        }
      }
      .instructions {
        list-style-type: decimal;
        display: flex;
        flex-direction: column;
        gap: 20px;
        li {
          color: white;
          text-align: left;
          font-size: var(--small-text-size);
        }
      }
    }
  }
}
</style>
